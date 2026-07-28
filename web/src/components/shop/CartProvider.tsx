"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "@/lib/catalog";

export type CartLine = { id: string; qty: number };

type CartValue = {
  lines: CartLine[];
  detailed: { product: Product; qty: number; lineTotal: number }[];
  count: number;
  subtotal: number;
  discount: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const STORAGE_KEY = "tarianaoxin.cart";

/** Tiered volume pricing, applied on the running subtotal. */
function discountRate(subtotal: number) {
  if (subtotal >= 900) return 0.12;
  if (subtotal >= 450) return 0.08;
  if (subtotal >= 200) return 0.04;
  return 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l): l is CartLine =>
                !!l &&
                typeof l === "object" &&
                typeof (l as CartLine).id === "string" &&
                typeof (l as CartLine).qty === "number",
            ),
          );
        }
      }
    } catch {
      /* corrupted storage is not worth a crash */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* private mode / quota */
    }
  }, [lines, hydrated]);

  // Lock the page behind the drawer without the layout jumping.
  useEffect(() => {
    if (!isOpen) return;
    const { overflow, paddingInlineEnd } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingInlineEnd = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingInlineEnd = paddingInlineEnd;
    };
  }, [isOpen]);

  const add = useCallback((id: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) {
        return prev.map((l) =>
          l.id === id ? { ...l, qty: Math.min(l.qty + qty, 99) } : l,
        );
      }
      return [...prev, { id, qty: Math.min(qty, 99) }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  const remove = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    [],
  );

  const value = useMemo<CartValue>(() => {
    const detailed = lines.flatMap((line) => {
      const product = products.find((p) => p.id === line.id);
      if (!product) return [];
      return [{ product, qty: line.qty, lineTotal: product.price * line.qty }];
    });
    const subtotal = detailed.reduce((sum, l) => sum + l.lineTotal, 0);
    const discount = subtotal * discountRate(subtotal);

    return {
      lines,
      detailed,
      count: detailed.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      discount,
      total: subtotal - discount,
      add,
      setQty,
      remove,
      clear: () => setLines([]),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [lines, isOpen, add, setQty, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
