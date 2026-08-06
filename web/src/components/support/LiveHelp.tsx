"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiOutlinePaperAirplane,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";
import { LogoMark } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";

type Message = {
  id: number;
  role: "user" | "agent";
  text: string;
};

function AgentAvatar({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center bg-ink-900 ${
        large ? "h-11 w-11 rounded-tile" : "h-8 w-8 rounded-tile"
      }`}
    >
      <LogoMark tone="light" className={large ? "h-7 w-7" : "h-5 w-5"} />
      {large ? (
        <span
          aria-hidden
          className="absolute -bottom-0.5 -end-0.5 h-3.5 w-3.5 rounded-chip border-2 border-ink-950 bg-leaf-400"
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

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendText(draft);
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
        className={`absolute bottom-[calc(100%+0.75rem)] end-0 flex h-[min(38rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-panel border border-hairline bg-page shadow-e3 transition-[transform,opacity,visibility] duration-300 ease-out-expo rtl:origin-bottom-left ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <header className="mesh-dark relative shrink-0 overflow-hidden px-5 py-4 text-white">
          <div
            aria-hidden
            className="grid-lines pointer-events-none absolute inset-0 opacity-50"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -end-12 -top-16 h-40 w-40 rounded-chip bg-aqua-500/20 blur-[50px]"
          />

          <div className="relative flex items-center gap-3.5">
            <AgentAvatar large />
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="fs-h4 font-semibold text-white">
                {copy.agentName}
              </h2>
              <p className="mt-0.5 flex items-center gap-2 fs-micro text-onink-200">
                <HiSparkles aria-hidden className="h-3.5 w-3.5 text-aqua-300" />
                {copy.agentStatus}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label={t.common.close}
              className="hover-rule -me-2 grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-onink-200 hover:bg-white/10 hover:text-white"
            >
              <HiXMark aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="scroll-pane min-h-0 flex-1 overflow-y-auto bg-sunken p-4">
          <div className="flex flex-col gap-3" aria-live="polite">
            <div className="flex items-end gap-2.5">
              <AgentAvatar />
              <p className="max-w-[17.5rem] rounded-card rounded-es-sm border border-hairline bg-page px-4 py-3 fs-caption text-ink-900 shadow-e1">
                {copy.greeting}
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="ms-10 mt-1 flex flex-wrap gap-2">
                {copy.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendText(suggestion)}
                    className="hover-rule min-h-10 rounded-chip border border-hairline-strong bg-page px-3 py-2 text-start fs-micro font-semibold text-ink-800 shadow-e1 hover:border-aqua-600 hover:text-aqua-800"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

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

            <div ref={conversationEndRef} aria-hidden />
          </div>
        </div>

        <footer className="shrink-0 border-t border-hairline bg-page px-4 pb-3 pt-4">
          <form onSubmit={submit} className="flex items-end gap-2">
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
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={1}
              placeholder={copy.messagePlaceholder}
              autoComplete="off"
              className="scroll-pane max-h-24 min-h-11 min-w-0 flex-1 resize-none rounded-ctrl border border-hairline-strong bg-page px-3.5 py-2.5 fs-caption text-ink-900 placeholder:text-mist-550 hover:border-mist-400 focus:border-aqua-600"
            />
            <button
              type="submit"
              disabled={!draft.trim() || replying}
              aria-label={copy.send}
              className="press brand-gradient grid h-11 w-11 shrink-0 place-items-center rounded-ctrl text-white shadow-e2 transition-[opacity,transform] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <HiOutlinePaperAirplane
                aria-hidden
                className="h-[1.15rem] w-[1.15rem] flip-rtl"
              />
            </button>
          </form>
          <p className="mt-2 text-center fs-micro text-mist-600">
            {copy.previewNotice}
          </p>
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
        className="press brand-gradient grid h-14 w-14 place-items-center rounded-chip text-white shadow-e3 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5"
      >
        {open ? (
          <HiXMark aria-hidden className="h-6 w-6" />
        ) : (
          <HiChatBubbleOvalLeftEllipsis aria-hidden className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
