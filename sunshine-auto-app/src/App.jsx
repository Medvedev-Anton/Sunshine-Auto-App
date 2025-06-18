import './App.css'
import Layout from './components/layout/Layout'
import { AssetManagerProvider } from './hooks/useAssetManager'

export default function App() {
    return (
        <AssetManagerProvider>
            <Layout />
        </AssetManagerProvider>
    );
}