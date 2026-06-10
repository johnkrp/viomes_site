type PageViewPayload = {
  session_id: string;
  path: string;
  title: string;
  url: string;
  referrer: string;
  timestamp: string;
};

const SESSION_ID_KEY = "viomes.analytics.session_id";
const DEDUPE_WINDOW_MS = 1000;
const DEBUG_EVENTS_KEY = "__VIOMES_PAGE_VIEWS__";

let lastTrackedSignature = "";
let lastTrackedAt = 0;

function normalizePath(pathname: string) {
  if (!pathname) {
    return "/";
  }

  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function getOrCreateSessionId() {
  const storage = getSessionStorage();

  if (!storage) {
    return crypto.randomUUID();
  }

  const existing = storage.getItem(SESSION_ID_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID();
  storage.setItem(SESSION_ID_KEY, sessionId);
  return sessionId;
}

export function buildPageViewPayload(pathname: string, title: string) {
  return {
    session_id: getOrCreateSessionId(),
    path: normalizePath(pathname),
    title,
    url: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  } satisfies PageViewPayload;
}

function getAnalyticsEndpoint() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  return endpoint ? endpoint : null;
}

function isDebugAnalyticsEnabled() {
  return import.meta.env.VITE_ANALYTICS_DEBUG === "true";
}

function getGoogleAnalyticsMeasurementId() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  return measurementId ? measurementId : null;
}

function getPlausibleDomain() {
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
  return plausibleDomain ? plausibleDomain : null;
}

function sendCustomAnalyticsEvent(payload: PageViewPayload) {
  const endpoint = getAnalyticsEndpoint();

  if (!endpoint) {
    return;
  }

  const body = JSON.stringify(payload);

  if (typeof navigator.sendBeacon === "function") {
    const sent = navigator.sendBeacon(
      endpoint,
      new Blob([body], { type: "application/json" }),
    );

    if (sent) {
      return;
    }
  }

  void fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    // Ignore analytics transport failures.
  });
}

function exposeDebugPageView(payload: PageViewPayload) {
  if (!isDebugAnalyticsEnabled()) {
    return;
  }

  const targetWindow = window as Window & {
    [DEBUG_EVENTS_KEY]?: PageViewPayload[];
  };

  targetWindow[DEBUG_EVENTS_KEY] ??= [];
  targetWindow[DEBUG_EVENTS_KEY]!.push(payload);

  console.info("[analytics] page_view", payload);
}

function sendGoogleAnalyticsPageView(payload: PageViewPayload) {
  const measurementId = getGoogleAnalyticsMeasurementId();

  if (!measurementId) {
    return;
  }

  const analyticsWindow = window as Window & {
    gtag?: (...args: unknown[]) => void;
  };

  if (typeof analyticsWindow.gtag !== "function") {
    return;
  }

  analyticsWindow.gtag("event", "page_view", {
    send_to: measurementId,
    page_path: payload.path,
    page_location: payload.url,
    page_title: payload.title,
  });
}

function sendPlausiblePageView() {
  if (!getPlausibleDomain()) {
    return;
  }

  const analyticsWindow = window as Window & {
    plausible?: (...args: unknown[]) => void;
  };

  if (typeof analyticsWindow.plausible !== "function") {
    return;
  }

  analyticsWindow.plausible("pageview");
}

export function trackPageView(pathname: string, title: string) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = buildPageViewPayload(pathname, title);
  const signature = `${payload.path}|${payload.title}|${payload.url}`;
  const now = Date.now();

  if (
    signature === lastTrackedSignature &&
    now - lastTrackedAt < DEDUPE_WINDOW_MS
  ) {
    return;
  }

  lastTrackedSignature = signature;
  lastTrackedAt = now;

  exposeDebugPageView(payload);
  sendGoogleAnalyticsPageView(payload);
  sendPlausiblePageView();
  sendCustomAnalyticsEvent(payload);
}
