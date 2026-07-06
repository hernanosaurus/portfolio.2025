'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

const STORAGE_KEY = 'nani:coffee-count';
const STORAGE_KEY_LAST = 'nani:coffee-last-click';
const EVENT_NAME = 'nani:coffee-update';

interface CoffeeContextValue {
  count: number;
  lastClickAt: number | null;
  increment: () => number;
}

const CoffeeContext = createContext<CoffeeContextValue | null>(null);

function subscribe(cb: () => void) {
  window.addEventListener(EVENT_NAME, cb);
  return () => window.removeEventListener(EVENT_NAME, cb);
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return '0|0';
  const c = window.sessionStorage.getItem(STORAGE_KEY) ?? '0';
  const l = window.sessionStorage.getItem(STORAGE_KEY_LAST) ?? '0';
  return `${c}|${l}`;
}

function getServerSnapshot(): string {
  return '0|0';
}

function parseSnapshot(snap: string): { count: number; lastClickAt: number | null } {
  const [c, l] = snap.split('|');
  const count = parseInt(c, 10);
  const last = parseInt(l, 10);
  return {
    count: !isNaN(count) && count > 0 ? count : 0,
    lastClickAt: !isNaN(last) && last > 0 ? last : null,
  };
}

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { count, lastClickAt } = useMemo(() => parseSnapshot(snap), [snap]);

  const increment = useCallback(() => {
    const current = parseInt(window.sessionStorage.getItem(STORAGE_KEY) ?? '0', 10);
    const next = (!isNaN(current) && current > 0 ? current : 0) + 1;
    const now = Date.now();
    window.sessionStorage.setItem(STORAGE_KEY, String(next));
    window.sessionStorage.setItem(STORAGE_KEY_LAST, String(now));
    window.dispatchEvent(new Event(EVENT_NAME));
    return next;
  }, []);

  const value = useMemo(
    () => ({ count, lastClickAt, increment }),
    [count, lastClickAt, increment],
  );

  return <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>;
}

export function useCoffee() {
  const ctx = useContext(CoffeeContext);
  if (!ctx) throw new Error('useCoffee must be used within a CoffeeProvider');
  return ctx;
}
