"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { HiSparkles, HiXMark } from "react-icons/hi2";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

type Message = {
  id: number;
  role: "user" | "agent";
  text: string;
};

export const OPEN_LIVE_HELP_EVENT = "tarianaoxin:open-live-help";

function AgentAvatar({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center ${
        large ? "h-9 w-9" : "h-7 w-7"
      }`}
    >
      <LogoMark
        tone={large ? "light" : "dark"}
        className={large ? "h-9 w-9" : "h-7 w-7"}
      />
      {large ? (
        <span
          aria-hidden
          className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-chip border-2 border-ink-950 bg-leaf-400"
        />
      ) : null}
    </span>
  );
}

export function LiveHelp() {
  const { t } = useI18n();
  const copy = t.liveHelp;
  const panelId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<number | null>(null);
  const messageIdRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const openLiveHelp = () => setOpen(true);
    window.addEventListener(OPEN_LIVE_HELP_EVENT, openLiveHelp);
    return () => window.removeEventListener(OPEN_LIVE_HELP_EVENT, openLiveHelp);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, replying]);

  const sendText = (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || replying) return;

    messageIdRef.current += 1;
    setMessages((current) => [
      ...current,
      { id: messageIdRef.current, role: "user", text: cleanText },
    ]);
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "";
    setReplying(true);

    replyTimerRef.current = window.setTimeout(() => {
      messageIdRef.current += 1;
      setMessages((current) => [
        ...current,
        {
          id: messageIdRef.current,
          role: "agent",
          text: copy.previewReply,
        },
      ]);
      setReplying(false);
      replyTimerRef.current = null;
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }, 750);
  };

  return (
    <div
      ref={rootRef}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-[55] sm:end-6"
    >
      <div
        id={panelId}
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open || undefined}
        data-open={open}
        className="live-chat-panel absolute bottom-[calc(100%+0.75rem)] end-0 flex h-[min(38rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-card border border-hairline-strong bg-page shadow-e3 ring-1 ring-ink-950/5 rtl:origin-bottom-left"
      >
        <header className="relative shrink-0 overflow-hidden border-b border-hairline-inverse bg-ink-950 px-4 py-3 text-white">
          <div
            aria-hidden
            className="brand-gradient absolute inset-x-0 top-0 h-0.5"
          />

          <div className="relative flex items-center gap-3">
            <AgentAvatar large />
            <div className="min-w-0 flex-1">
              <h2
                id={titleId}
                className="text-[0.84rem] font-semibold leading-tight text-white"
              >
                {copy.agentName}
              </h2>
              {copy.agentStatus ? (
                <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] leading-none text-onink-200">
                  <HiSparkles aria-hidden className="h-3 w-3 text-aqua-300" />
                  {copy.agentStatus}
                </p>
              ) : null}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={t.common.close}
              className="hover-rule -me-1 grid h-10 w-10 shrink-0 place-items-center rounded-ctrl text-onink-200 hover:bg-white/10 hover:text-white"
            >
              <HiXMark aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="scroll-pane min-h-0 flex-1 overflow-y-auto bg-mist-100 p-4 sm:p-5">
          <div className="flex min-h-full flex-col gap-3" aria-live="polite">
            <div className="flex items-end gap-2.5">
              <AgentAvatar />
              <p className="max-w-[17.5rem] rounded-card rounded-es-sm border border-hairline bg-page px-4 py-3 fs-caption text-ink-900 shadow-e1">
                {copy.greeting}
              </p>
            </div>

            {messages.map((message) =>
              message.role === "user" ? (
                <p
                  key={message.id}
                  className="ms-auto max-w-[17.5rem] rounded-card rounded-ee-sm bg-ink-900 px-4 py-3 fs-caption text-white"
                >
                  {message.text}
                </p>
              ) : (
                <div key={message.id} className="flex items-end gap-2.5">
                  <AgentAvatar />
                  <p className="max-w-[17.5rem] rounded-card rounded-es-sm border border-hairline bg-page px-4 py-3 fs-caption text-ink-900 shadow-e1">
                    {message.text}
                  </p>
                </div>
              ),
            )}

            {replying ? (
              <div className="flex items-end gap-2.5" aria-label={copy.typing}>
                <AgentAvatar />
                <span className="flex h-10 items-center gap-1 rounded-card rounded-es-sm border border-hairline bg-page px-4 shadow-e1">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      aria-hidden
                      className="h-1.5 w-1.5 animate-bounce rounded-chip bg-mist-500"
                      style={{ animationDelay: `${index * 120}ms` }}
                    />
                  ))}
                </span>
              </div>
            ) : null}

            {messages.length === 0 ? (
              <div className="ms-auto mt-auto flex max-w-[17.5rem] flex-col items-end gap-2 pt-6">
                {copy.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendText(suggestion)}
                    className="hover-rule min-h-10 rounded-card rounded-ee-sm border border-aqua-600 bg-page px-3.5 py-2 text-end fs-micro font-semibold text-aqua-800 shadow-e1 hover:bg-aqua-50 hover:text-ink-900"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            <div ref={conversationEndRef} aria-hidden />
          </div>
        </div>

        <footer className="shrink-0 border-t border-hairline bg-page p-3.5">
          <div>
            <label htmlFor={`${panelId}-message`} className="sr-only">
              {copy.messageLabel}
            </label>
            <textarea
              ref={inputRef}
              id={`${panelId}-message`}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                event.currentTarget.style.height = "auto";
                event.currentTarget.style.height = `${Math.min(
                  event.currentTarget.scrollHeight,
                  96,
                )}px`;
              }}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();
                  sendText(event.currentTarget.value);
                }
              }}
              rows={1}
              placeholder={copy.messagePlaceholder}
              autoComplete="off"
              className="scroll-pane max-h-24 min-h-11 w-full resize-none rounded-ctrl border border-hairline-strong bg-mist-50 px-3.5 py-2.5 fs-caption text-ink-900 shadow-inner placeholder:text-mist-550 hover:border-mist-400 focus:border-aqua-600 focus:bg-page"
            />
          </div>
        </footer>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t.common.close : copy.launcher}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        className="press relative grid h-16 w-16 place-items-center bg-transparent text-aqua-600 transition-[color,transform,filter] duration-300 ease-out-expo [filter:drop-shadow(0_5px_8px_rgb(8_36_59/0.24))] hover:-translate-y-1 hover:text-ink-900 hover:[filter:drop-shadow(0_8px_12px_rgb(8_36_59/0.28))]"
      >
        <Image
          aria-hidden
          src="/brand/live-help-24-7.png"
          alt=""
          width={512}
          height={512}
          sizes="72px"
          className={`h-[4.5rem] w-[4.5rem] max-w-none object-contain transition-[transform,opacity] duration-300 ease-out-expo ${
            open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
        <HiXMark
          aria-hidden
          className={`absolute h-7 w-7 transition-[transform,opacity] duration-300 ease-out-expo ${
            open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
          }`}
        />
      </button>
    </div>
  );
}
