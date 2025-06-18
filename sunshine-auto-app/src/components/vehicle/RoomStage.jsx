import { Entity } from '@playcanvas/react';
import { Light, Script } from '@playcanvas/react/components';
import { EnvAtlas } from '@playcanvas/react/components';
import { useEnvAtlas } from '@playcanvas/react/hooks';
import { Grid } from '@playcanvas/react/scripts';
import { ShadowCatcher } from 'playcanvas/scripts/esm/shadow-catcher.mjs';
import { CameraFrame } from 'playcanvas/scripts/esm/camera-frame.mjs';
import PropTypes from 'prop-types';
import { SHADOW_VSM_16F, Vec3 } from 'playcanvas';

// Эффекты постобработки (как в примере)
export const defaultPostSettings = {
  lighting: {
    exposure: 1.21,
    skyBoxIntensity: 1.02,
  },
  rendering: {
    renderFormat: 18,
    renderTargetScale: 1,
    sharpness: 0,
    samples: 4,
    toneMapping: 4,
    fog: 'none',
    renderFormatFallback0: 12,
    renderFormatFallback1: 14,
    sceneColorMap: false,
    sceneDepthMap: false,
  },
  ssao: {
    type: 'none',
    intensity: 0.5,
    radius: 30,
    samples: 12,
    power: 6,
    minAngle: 10,
    scale: 1,
    blurEnabled: true,
  },
  bloom: {
    enabled: true,
    intensity: 0.1,
    lastMipLevel: 1,
  },
  grading: {
    enabled: true,
    brightness: 0.83,
    contrast: 1.03,
    saturation: 1.01,
    tint: {
      r: 0.8,
      g: 0.6333333333333333,
      b: 0.6666666666666667,
      a: 1,
    },
  },
  vignette: {
    enabled: true,
    intensity: 1,
    inner: 0.25,
    outer: 1.52,
    curvature: 0.78,
  },
  taa: {
    enabled: false,
    jitter: 0.4,
  },
  fringing: {
    enabled: true,
    intensity: 10,
  },
};

export function StaticPostEffects(props) {
  // Простая версия: всегда используем defaultPostSettings
  return <Script script={CameraFrame} {...defaultPostSettings} {...props} />;
}

export function RoomStage() {
  // Используем правильный путь для GitHub Pages
  const { asset } = useEnvAtlas('/Sunshine-Auto-App/helipad-env-atlas.png');
  if (!asset) return null;
  return (
    <Entity>
      <EnvAtlas asset={asset} showSkybox={false} intensity={3} />
      <Light
        type="directional"
        castShadows={false}
        normalOffsetBias={0}
        shadowBias={0}
        shadowDistance={16}
        shadowResolution={512}
        shadowType={SHADOW_VSM_16F}
        vsmBlurSize={16}
        shadowIntensity={1}
        intensity={0}
      />
      <Script script={Grid} />
    </Entity>
  );
}

RoomStage.propTypes = {}; 