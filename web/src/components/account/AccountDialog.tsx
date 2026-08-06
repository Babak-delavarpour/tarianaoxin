"use client";

import { useEffect, useRef, useState } from "react";
import {
  HiArrowLeft,
  HiArrowUpRight,
  HiCheck,
  HiEye,
  HiEyeSlash,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiXMark,
} from "react-icons/hi2";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/I18nProvider";

type Mode = "signin" | "register" | "forgot";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function Field({
  id,
  label,
  icon: Icon,
  trailing,
  className = "",
  ...props
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  trailing?: React.ReactNode;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "className">) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="fs-caption font-semibold text-ink-900">{label}</span>
      <span className="relative flex items-center">
        <Icon
          aria-hidden
          className="pointer-events-none absolute start-3.5 h-5 w-5 text-mist-600"
        />
        <input
          id={id}
          className={`h-12 w-full rounded-ctrl border border-hairline-strong bg-page ps-11 fs-body text-ink-900 placeholder:text-mist-500 hover:border-mist-400 focus:border-aqua-600 ${
            trailing ? "pe-12" : "pe-4"
          } ${className}`}
          {...props}
        />
        {trailing}
      </span>
    </label>
  );
}

export function AccountDialog({ tone }: { tone: "dark" | "light" }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (item) => item.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  useEffect(() => setShowPassword(false), [mode]);

  const onInk = tone === "light";
  const title =
    mode === "signin"
      ? t.auth.signInTitle
      : mode === "register"
        ? t.auth.registerTitle
        : t.auth.forgotTitle;
  const body =
    mode === "signin"
      ? t.auth.signInBody
      : mode === "register"
        ? t.auth.registerBody
        : t.auth.forgotBody;

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((value) => !value)}
      aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
      className="hover-rule absolute end-1.5 grid h-9 w-9 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900 focus-visible:outline-offset-[-2px]"
    >
      {showPassword ? (
        <HiEyeSlash aria-hidden className="h-4.5 w-4.5" />
      ) : (
        <HiEye aria-hidden className="h-4.5 w-4.5" />
      )}
    </button>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.auth.account}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`hover-rule relative flex h-11 w-11 items-center justify-center rounded-ctrl ${
          onInk
            ? "text-onink-100 hover:bg-white/10 hover:text-white"
            : "text-ink-800 hover:bg-mist-100 hover:text-ink-900"
        }`}
      >
        <HiOutlineUser aria-hidden className="h-[1.35rem] w-[1.35rem]" />
      </button>

      <div
        aria-hidden={!open}
        inert={!open || undefined}
        className={`fixed inset-0 flex items-end justify-center transition-[visibility] sm:items-center sm:p-5 z-[90] ${
          open ? "visible" : "invisible"
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label={t.common.close}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink-950/70 backdrop-blur-[3px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-dialog-title"
          className={`relative grid max-h-[92dvh] w-full max-w-4xl overflow-hidden rounded-t-panel bg-page shadow-e3 transition-[transform,opacity] duration-400 ease-out-expo sm:rounded-panel md:grid-cols-[0.76fr_1.24fr] ${
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0 sm:translate-y-3 sm:scale-[0.985]"
          }`}
        >
          <aside className="mesh-dark relative hidden overflow-hidden p-8 text-white md:flex md:flex-col md:justify-between lg:p-10">
            <div
              aria-hidden
              className="grid-lines pointer-events-none absolute inset-0 opacity-55"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -start-28 h-80 w-80 rounded-chip bg-aqua-500/20 blur-[90px]"
            />

            <Logo locale={locale} tone="light" compact className="relative" />

            <div className="relative flex flex-col gap-6">
              <span className="grid h-14 w-14 place-items-center rounded-tile border border-hairline-inverse bg-white/[0.07] text-aqua-300">
                <HiOutlineUser aria-hidden className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="fs-h2 max-w-[13ch] font-bold text-white">
                  {t.auth.panelTitle}
                </h2>
                <p className="fs-caption max-w-[34ch] text-onink-200">
                  {t.auth.panelBody}
                </p>
              </div>
              <ul className="flex flex-col gap-3 border-t border-hairline-inverse pt-5">
                {t.auth.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="fs-caption flex items-center gap-3 text-onink-100"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-chip bg-aqua-400/15 text-aqua-300">
                      <HiCheck aria-hidden className="h-3.5 w-3.5" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="scroll-pane min-h-0 overflow-y-auto px-5 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:px-10 lg:pb-10">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow text-aqua-700">{t.auth.eyebrow}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.common.close}
                className="hover-rule grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-mist-600 hover:bg-mist-100 hover:text-ink-900"
              >
                <HiXMark aria-hidden className="h-5 w-5" />
              </button>
            </div>

            {mode !== "forgot" ? (
              <div
                role="tablist"
                aria-label={t.auth.account}
                className="mt-5 grid grid-cols-2 rounded-ctrl bg-sunken p-1"
              >
                {(["signin", "register"] as const).map((item) => {
                  const selected = mode === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setMode(item)}
                      className={`hover-rule min-h-10 rounded-ctrl px-3 fs-caption font-semibold ${
                        selected
                          ? "bg-page text-ink-900 shadow-e1"
                          : "text-mist-600 hover:text-ink-900"
                      }`}
                    >
                      {item === "signin" ? t.auth.signIn : t.auth.register}
                    </button>
                  );
                })}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="hover-rule fs-caption mt-5 inline-flex min-h-10 items-center gap-2 rounded-ctrl font-semibold text-aqua-700 hover:text-ink-900"
              >
                <HiArrowLeft aria-hidden className="h-4 w-4 flip-rtl" />
                {t.auth.backToSignIn}
              </button>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <h2
                id="account-dialog-title"
                className="fs-h2 font-bold text-ink-900"
              >
                {title}
              </h2>
              <p className="fs-caption max-w-[50ch] text-mist-600">{body}</p>
            </div>

            {mode === "signin" ? (
              <form
                onSubmit={(event) => event.preventDefault()}
                className="mt-6 flex flex-col gap-4"
              >
                <Field
                  id="signin-email"
                  label={t.auth.email}
                  icon={HiOutlineEnvelope}
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                />
                <Field
                  id="signin-password"
                  label={t.auth.password}
                  icon={HiOutlineLockClosed}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  trailing={passwordToggle}
                  required
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="fs-caption flex min-h-10 cursor-pointer items-center gap-2.5 text-mist-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-sm accent-aqua-700"
                    />
                    {t.auth.rememberMe}
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="hover-rule fs-caption min-h-10 font-semibold text-aqua-700 hover:text-ink-900"
                  >
                    {t.auth.forgotPassword}
                  </button>
                </div>
                <Button type="submit" size="lg" className="mt-1 w-full">
                  {t.auth.signIn}
                  <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                </Button>
                <p className="fs-caption text-center text-mist-600">
                  {t.auth.noAccount}{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="hover-rule font-semibold text-aqua-700 hover:text-ink-900"
                  >
                    {t.auth.register}
                  </button>
                </p>
              </form>
            ) : mode === "register" ? (
              <form
                onSubmit={(event) => event.preventDefault()}
                className="mt-6 flex flex-col gap-4"
              >
                <Field
                  id="register-name"
                  label={t.auth.fullName}
                  icon={HiOutlineUser}
                  type="text"
                  autoComplete="name"
                  required
                />
                <Field
                  id="register-email"
                  label={t.auth.email}
                  icon={HiOutlineEnvelope}
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                />
                <Field
                  id="register-password"
                  label={t.auth.password}
                  icon={HiOutlineLockClosed}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  placeholder={t.auth.passwordHint}
                  trailing={passwordToggle}
                  required
                />
                <p className="fs-micro text-mist-600">{t.auth.terms}</p>
                <Button type="submit" size="lg" className="w-full">
                  {t.auth.register}
                  <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                </Button>
                <p className="fs-caption text-center text-mist-600">
                  {t.auth.haveAccount}{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="hover-rule font-semibold text-aqua-700 hover:text-ink-900"
                  >
                    {t.auth.signIn}
                  </button>
                </p>
              </form>
            ) : (
              <form
                onSubmit={(event) => event.preventDefault()}
                className="mt-6 flex flex-col gap-5"
              >
                <Field
                  id="forgot-email"
                  label={t.auth.email}
                  icon={HiOutlineEnvelope}
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  required
                />
                <Button type="submit" size="lg" className="w-full">
                  {t.auth.sendResetLink}
                  <HiArrowUpRight aria-hidden className="h-4 w-4 flip-rtl" />
                </Button>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
