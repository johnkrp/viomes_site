/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_TEST_PACKSHOTS?: string;
  readonly VITE_ALLOW_TEST_PACKSHOTS_IN_PROD?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  readonly VITE_ANALYTICS_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
