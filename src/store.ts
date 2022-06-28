import create from 'zustand';
import { persist } from 'zustand/middleware';

export type FeatureFlags = Record<string, string | number | boolean>;
type FeatureFlagsStore = {
  enabled: boolean;
  initialized: boolean;
  featureFlags: FeatureFlags;
  initialize: (featureFlags: FeatureFlags) => void;
  reset: () => void;
  /**
   * 切换功能总开关
   */
  toggle: () => void;
  setFeatureFlag: (key: string, value: string | number | boolean) => void;
};

/**
 * 功能开关管理
 */
export const useStore = create<FeatureFlagsStore>(
  persist(
    (set, get) => ({
      enabled: false,
      initialized: false,
      featureFlags: {},
      initialize: (featureFlags: FeatureFlags) =>
        set({ featureFlags, initialized: true }),
      reset: () => set({ featureFlags: {}, initialized: false }),
      toggle: () => set({ enabled: !get().enabled }),
      setFeatureFlag: (key: string, value: string | number | boolean) =>
        set({ featureFlags: { ...get().featureFlags, [key]: value } }),
    }),
    {
      name: 'feature-flags',
    }
  )
);

/**
 * 获取功能开关值
 */
export function getFeatureFlag(key: string) {
  const state = useStore.getState();
  return state.enabled && state.featureFlags[key];
}

/**
 * 获取功能开关值
 */
export function useFeatureFlag(key: string) {
  return useStore((state) => state.enabled && state.featureFlags[key]);
}
/**
 * 切换功能开关
 */
export function useToggleDevelopOptions() {
  return useStore((state) => state.toggle);
}
