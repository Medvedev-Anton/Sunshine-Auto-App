import { Entity } from '@playcanvas/react';
import { Render } from '@playcanvas/react/components';
import { useModel } from '@playcanvas/react/hooks';
import { useRef, useEffect } from 'react';

interface ModelViewerProps {
  src: string;
  color?: [number, number, number];
}

export const ModelViewer = ({ src, color = [0.5, 0.5, 0.5] }: ModelViewerProps) => {
  const { asset, loading, error } = useModel(src);
  const entityRef = useRef<any>(null);

  useEffect(() => {
    if (!asset || !entityRef.current) return;

    const components = entityRef.current.findComponents('render');
    const meshInstances = [];
    for (const comp of components) {
      meshInstances.push(...comp.meshInstances);
    }
    
    meshInstances.forEach(({ material }) => {
      material.diffuse.set(...color);
      material.update();
    });

  }, [asset, color]);

  if (loading) {
    return <p>Загрузка модели...</p>;
  }

  if (error) {
    const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
    return <p>Ошибка загрузки модели: {errorMessage}</p>;
  }

  if (!asset) {
    return null; 
  }

  return (
    <Entity ref={entityRef} name="glb-model-viewer">
      <Render type='asset' asset={asset} />
    </Entity>
  );
}; 