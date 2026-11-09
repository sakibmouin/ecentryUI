import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { renderThemeCss } from "./css.js";
import { defaultTheme } from "./tokens.js";
import type { Appearance, Theme } from "./tokens.js";

export type AppearanceMode = Appearance | "system";

export interface AppearanceProviderProps {
  children: ReactNode;
  theme?: Theme;
  appearance?: AppearanceMode;
  defaultAppearance?: AppearanceMode;
  onAppearanceChange?: (appearance: AppearanceMode) => void;
  storageKey?: string;
  nonce?: string;
  direction?: "ltr" | "rtl";
}

export interface AppearanceContextValue {
  appearance: AppearanceMode;
  resolvedAppearance: Appearance;
  setAppearance: (appearance: AppearanceMode) => void;
}

interface InternalContext extends AppearanceContextValue {
  scopeId: string;
  direction: "ltr" | "rtl";
}

const AppearanceContext = createContext<InternalContext | null>(null);

function isAppearanceMode(value: string | null): value is AppearanceMode {
  return value === "light" || value === "dark" || value === "system";
}

function bootstrapScript(
  scopeId: string,
  initial: AppearanceMode,
  storageKey?: string,
): string {
  const config = JSON.stringify({ scopeId, initial, storageKey }).replaceAll(
    "<",
    "\\u003c",
  );
  return `!function(){try{var c=${config};var n=document.querySelector('[data-ec-scope="'+c.scopeId+'"]');if(!n)return;var m=c.initial;if(c.storageKey){var s=localStorage.getItem(c.storageKey);if(s==='light'||s==='dark'||s==='system')m=s}var d=m==='system'?matchMedia('(prefers-color-scheme: dark)').matches:m==='dark';n.setAttribute('data-ec-theme',d?'dark':'light')}catch(e){}}();`;
}

export function AppearanceProvider({
  children,
  theme = defaultTheme,
  appearance: controlledAppearance,
  defaultAppearance = "system",
  onAppearanceChange,
  storageKey,
  nonce,
  direction: suppliedDirection,
}: AppearanceProviderProps) {
  const parent = useContext(AppearanceContext);
  const direction = suppliedDirection ?? parent?.direction ?? "ltr";
  const scopeId = `ec${useId()
    .replaceAll(/[^a-z0-9]/gi, "")
    .toLowerCase()}`;
  const [internalAppearance, setInternalAppearance] =
    useState<AppearanceMode>(defaultAppearance);
  const [systemDark, setSystemDark] = useState(false);
  const appearance = controlledAppearance ?? internalAppearance;
  const resolvedAppearance: Appearance =
    appearance === "system" ? (systemDark ? "dark" : "light") : appearance;

  useEffect(() => {
    if (controlledAppearance !== undefined || !storageKey) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (isAppearanceMode(stored)) setInternalAppearance(stored);
    } catch {
      // Storage may be unavailable in private browsing contexts.
    }
  }, [controlledAppearance, storageKey]);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query) return;
    setSystemDark(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setSystemDark(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setAppearance = useCallback(
    (next: AppearanceMode) => {
      if (controlledAppearance === undefined) setInternalAppearance(next);
      if (storageKey && controlledAppearance === undefined) {
        try {
          localStorage.setItem(storageKey, next);
        } catch {
          // The current page can still use the selected appearance.
        }
      }
      onAppearanceChange?.(next);
    },
    [controlledAppearance, onAppearanceChange, storageKey],
  );

  const css = renderThemeCss(theme, { scope: `[data-ec-scope="${scopeId}"]` });
  return (
    <AppearanceContext.Provider
      value={{
        appearance,
        resolvedAppearance,
        setAppearance,
        scopeId,
        direction,
      }}
    >
      <style
        nonce={nonce}
        data-ec-style={scopeId}
        dangerouslySetInnerHTML={{ __html: css }}
      />
      <div
        data-ec-scope={scopeId}
        data-ec-theme={resolvedAppearance}
        dir={direction}
        suppressHydrationWarning
      >
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: bootstrapScript(
              scopeId,
              controlledAppearance ?? defaultAppearance,
              controlledAppearance === undefined ? storageKey : undefined,
            ),
          }}
        />
        {children}
      </div>
    </AppearanceContext.Provider>
  );
}

function useInternalAppearance(): InternalContext {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error("AppearanceProvider is required");
  return context;
}

export function useAppearance(): AppearanceContextValue {
  const { appearance, resolvedAppearance, setAppearance } =
    useInternalAppearance();
  return { appearance, resolvedAppearance, setAppearance };
}

export interface AppearancePortalProps {
  children: ReactNode;
  container?: Element;
}

export function AppearancePortal({
  children,
  container,
}: AppearancePortalProps) {
  const { scopeId, resolvedAppearance, direction } = useInternalAppearance();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div
      data-ec-scope={scopeId}
      data-ec-theme={resolvedAppearance}
      dir={direction}
    >
      {children}
    </div>,
    container ?? document.body,
  );
}
