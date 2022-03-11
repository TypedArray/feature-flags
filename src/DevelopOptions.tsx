import * as dat from 'dat.gui';
import React, { HTMLProps, useEffect, useRef } from 'react';
import { FeatureFlags, useStore } from './store';

interface Props extends HTMLProps<HTMLDivElement> {
  featureFlags: FeatureFlags;
}
export function DevelopOptions({
  featureFlags: initialFeatureFlags,
  ...remainingProps
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const store = useStore();
  const enabled = useStore((state) => state.enabled);
  const featureFlags = useStore((state) => state.featureFlags);
  const setFeatureFlag = useStore((state) => state.setFeatureFlag);
  const initialized = useStore((state) => state.initialized);
  const initialize = useStore((state) => state.initialize);
  const reset = useStore((state) => state.reset);
  const storeRef = useRef(store);
  storeRef.current = store;
  const initialFeatureFlagsRef = useRef(initialFeatureFlags);
  initialFeatureFlagsRef.current = initialFeatureFlags;

  useEffect(() => {
    // 如果没有初始化，尝试初始化
    if (!initialized) {
      initialize(initialFeatureFlagsRef.current);
    }
  }, [initialized]);

  useEffect(() => {
    if (enabled) {
      const gui = new dat.GUI({ autoPlace: false, closeOnTop: true });
      gui.add({ reset }, 'reset').name('还原设置');
      const featureFlagsFolder = gui.addFolder('功能开关');
      featureFlagsFolder.open();
      const target = {
        ...initialFeatureFlagsRef.current,
        ...featureFlags,
      };
      Object.keys(target).forEach((key) => {
        featureFlagsFolder
          .add(target, key)
          .onChange((value: string | number | boolean) =>
            setFeatureFlag(key, value)
          );
      });
      const container = containerRef.current;
      container?.appendChild(gui.domElement);
      return () => {
        gui.destroy();
        container?.removeChild(gui.domElement);
      };
    } else {
      return () => {};
    }
  }, [enabled, featureFlags, setFeatureFlag, reset]);
  return <div {...remainingProps} ref={containerRef} />;
}
