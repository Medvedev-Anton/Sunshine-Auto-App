import { useState, useEffect, useRef, useContext, createContext } from 'react';

// Context for asset manager
const AssetManagerContext = createContext(null);

// Asset priority levels
export const AssetPriority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

/**
 * Asset Manager class that handles loading and caching of assets
 */
class AssetManager {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
    this.listeners = new Map();
  }
  
  /**
   * Get an asset from cache or load it
   * @param {string} url - Asset URL
   * @param {string} type - Asset type ('container', 'texture', etc.)
   * @param {string} priority - Asset priority (high, medium, low)
   * @returns {Promise} - Promise that resolves with loaded asset
   */
  getAsset(url, type = 'container', priority = AssetPriority.MEDIUM) {
    // Return from cache if available
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }
    
    // Return existing promise if already loading
    if (this.loading.has(url)) {
      return this.loading.get(url);
    }
    
    // Start new load
    const loadPromise = this._loadAsset(url, type)
      .then(asset => {
        this.cache.set(url, asset);
        this.loading.delete(url);
        this._notifyListeners(url, { status: 'loaded', asset });
        return asset;
      })
      .catch(error => {
        this.loading.delete(url);
        this._notifyListeners(url, { status: 'error', error });
        throw error;
      });
    
    this.loading.set(url, loadPromise);
    this._notifyListeners(url, { status: 'loading', progress: 0 });
    
    return loadPromise;
  }
  
  /**
   * Preload a list of assets
   * @param {Array} items - Array of asset items to preload
   * @returns {Promise} - Promise that resolves when all assets are loaded
   */
  preload(items) {
    return Promise.all(
      items.map(item => this.getAsset(item.url, item.type, item.priority))
    );
  }
  
  /**
   * Check if an asset is cached
   * @param {string} url - Asset URL
   * @returns {boolean} - Whether the asset is in cache
   */
  isCached(url) {
    return this.cache.has(url);
  }
  
  /**
   * Get loading status of an asset
   * @param {string} url - Asset URL
   * @returns {string} - Loading status ('loading', 'loaded', 'error', 'idle')
   */
  getStatus(url) {
    if (this.cache.has(url)) return 'loaded';
    if (this.loading.has(url)) return 'loading';
    return 'idle';
  }
  
  /**
   * Clear the entire cache or assets matching a pattern
   * @param {RegExp} urlPattern - Optional pattern to match URLs to clear
   */
  clearCache(urlPattern = null) {
    if (urlPattern) {
      // Clear specific pattern
      for (const [url, asset] of this.cache.entries()) {
        if (url.match(urlPattern)) {
          this.cache.delete(url);
        }
      }
    } else {
      // Clear all
      this.cache.clear();
    }
  }
  
  /**
   * Add a listener for asset loading events
   * @param {string} url - Asset URL
   * @param {Function} callback - Callback function
   * @returns {Function} - Function to remove listener
   */
  addListener(url, callback) {
    if (!this.listeners.has(url)) {
      this.listeners.set(url, new Set());
    }
    this.listeners.get(url).add(callback);
    
    return () => {
      const urlListeners = this.listeners.get(url);
      if (urlListeners) {
        urlListeners.delete(callback);
        if (urlListeners.size === 0) {
          this.listeners.delete(url);
        }
      }
    };
  }
  
  /**
   * Load an asset
   * @private
   * @param {string} url - Asset URL
   * @param {string} type - Asset type
   * @returns {Promise} - Promise that resolves with loaded asset
   */
  _loadAsset(url, type) {
    // Simulated asset loading for development
    // This will be replaced with actual PlayCanvas asset loading
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() < 0.9) {
          resolve({
            url,
            type,
            data: `Simulated asset for ${url}`,
            // Other properties would be here for real assets
          });
        } else {
          reject(new Error(`Failed to load asset: ${url}`));
        }
      }, 1000 + Math.random() * 2000); // Random load time for simulation
    });
  }
  
  /**
   * Notify listeners of asset loading events
   * @private
   * @param {string} url - Asset URL
   * @param {Object} update - Update object
   */
  _notifyListeners(url, update) {
    const urlListeners = this.listeners.get(url);
    if (urlListeners) {
      urlListeners.forEach(callback => callback(update));
    }
  }
}

/**
 * Asset Manager Provider component
 */
export function AssetManagerProvider({ children }) {
  const [assetManager] = useState(() => new AssetManager());
  
  return (
    <AssetManagerContext.Provider value={assetManager}>
      {children}
    </AssetManagerContext.Provider>
  );
}

/**
 * Hook to access the asset manager
 * @returns {AssetManager} - Asset manager instance
 */
export function useAssetManager() {
  const assetManager = useContext(AssetManagerContext);
  
  if (!assetManager) {
    throw new Error('useAssetManager must be used within an AssetManagerProvider');
  }
  
  return assetManager;
}

/**
 * Hook to load and manage an asset
 * @param {string} url - Asset URL
 * @param {string} type - Asset type
 * @param {string} priority - Asset priority
 * @returns {Object} - Asset loading state
 */
export function useAsset(url, type = 'container', priority = AssetPriority.MEDIUM) {
  const assetManager = useAssetManager();
  const [state, setState] = useState({
    status: assetManager.isCached(url) ? 'loaded' : 'idle',
    asset: assetManager.isCached(url) ? assetManager.cache.get(url) : null,
    error: null
  });
  
  useEffect(() => {
    if (!url) return;
    
    // Reset state if URL changes
    setState({
      status: assetManager.isCached(url) ? 'loaded' : 'loading',
      asset: assetManager.isCached(url) ? assetManager.cache.get(url) : null,
      error: null
    });
    
    // If already in cache, no need to load
    if (assetManager.isCached(url)) {
      return;
    }
    
    // Load the asset
    let isMounted = true;
    
    assetManager.getAsset(url, type, priority)
      .then(asset => {
        if (isMounted) {
          setState({
            status: 'loaded',
            asset,
            error: null
          });
        }
      })
      .catch(error => {
        if (isMounted) {
          setState({
            status: 'error',
            asset: null,
            error
          });
        }
      });
    
    // Listen for updates
    const removeListener = assetManager.addListener(url, (update) => {
      if (isMounted && update.status === 'loading') {
        setState(prev => ({
          ...prev,
          status: 'loading',
          progress: update.progress
        }));
      }
    });
    
    return () => {
      isMounted = false;
      removeListener();
    };
  }, [assetManager, url, type, priority]);
  
  return state;
}

/**
 * Hook to preload multiple assets
 * @param {Array} assets - Array of asset configs to preload
 * @returns {Object} - Preloading state
 */
export function usePreloadAssets(assets = []) {
  const assetManager = useAssetManager();
  const [state, setState] = useState({
    loading: assets.length > 0,
    completed: 0,
    total: assets.length,
    errors: []
  });
  
  // Create a dependency string for assets
  const assetsKey = assets.map(a => `${a.url}:${a.type}:${a.priority}`).join('|');
  
  useEffect(() => {
    if (!assets.length) {
      setState({
        loading: false,
        completed: 0,
        total: 0,
        errors: []
      });
      return;
    }
    
    setState(prev => ({
      ...prev,
      loading: true,
      total: assets.length
    }));
    
    const errors = [];
    let completed = 0;
    
    const loadPromises = assets.map(asset => 
      assetManager.getAsset(asset.url, asset.type, asset.priority)
        .then(() => {
          completed++;
          setState(prev => ({
            ...prev,
            completed,
            loading: completed < assets.length
          }));
        })
        .catch(error => {
          errors.push({ asset, error });
          completed++;
          setState(prev => ({
            ...prev,
            completed,
            errors,
            loading: completed < assets.length
          }));
        })
    );
    
    Promise.all(loadPromises).finally(() => {
      setState(prev => ({
        ...prev,
        loading: false,
        errors
      }));
    });
  }, [assetManager, assetsKey]);
  
  return state;
}

export default useAssetManager; 