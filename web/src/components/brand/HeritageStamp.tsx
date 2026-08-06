type HeritageStampProps = {
  caption?: string;
  prominent?: boolean;
};

/** Persian heritage seal for the parent brand behind Tariana Oxin. */
export function HeritageStamp({
  caption,
  prominent = false,
}: HeritageStampProps) {
  const brandName =
    "پخش یک‌بارمصرف دلاورپور — تلاشگران تاریانا اکسین";
  const rimOrnaments = Array.from({ length: 24 });

  return (
    <figure
      dir="rtl"
      className="flex flex-col items-center gap-5 text-center"
      aria-label={brandName}
    >
      <div
        className={`heritage-stamp relative grid aspect-square rotate-[-1.5deg] place-items-center text-aqua-200 drop-shadow-[0_20px_32px_rgba(0,0,0,0.24)] ${
          prominent
            ? "w-[clamp(15rem,32vw,22rem)]"
            : "w-[clamp(14rem,24vw,17rem)]"
        }`}
      >
        <svg
          viewBox="0 0 300 300"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <g fill="none" strokeLinejoin="round">
            <circle
              cx="150"
              cy="150"
              r="144"
              stroke="#6bd3e5"
              strokeWidth="2.4"
              opacity="0.9"
            />
            <circle
              cx="150"
              cy="150"
              r="138"
              stroke="#d8b96f"
              strokeWidth="0.9"
              opacity="0.72"
            />

            {rimOrnaments.map((_, index) => (
              <path
                key={index}
                d="M150 8 L154 15 L150 23 L146 15 Z"
                transform={`rotate(${index * 15} 150 150)`}
                stroke={index % 2 === 0 ? "#6bd3e5" : "#d8b96f"}
                strokeWidth="1"
                opacity={index % 2 === 0 ? "0.88" : "0.62"}
              />
            ))}

            <circle
              cx="150"
              cy="150"
              r="121"
              stroke="#6bd3e5"
              strokeWidth="1"
              strokeDasharray="2 7"
              opacity="0.62"
            />

            <path
              d="M86 214 V132 C86 94 113 64 150 43 C187 64 214 94 214 132 V214"
              stroke="#6bd3e5"
              strokeWidth="1.2"
              opacity="0.26"
            />
            <path
              d="M96 211 V136 C96 105 117 78 150 58 C183 78 204 105 204 136 V211"
              stroke="#d8b96f"
              strokeWidth="0.8"
              opacity="0.25"
            />

          </g>
        </svg>

        <span
          aria-hidden
          className="grain-layer absolute inset-2 rounded-full opacity-[0.06]"
        />

        <div
          aria-hidden
          className="relative z-10 flex max-w-[86%] flex-col items-center"
        >
          <span className="text-[0.68rem] font-bold text-aqua-100/90 sm:text-xs">
            پخش یک‌بارمصرف
          </span>
          <strong className="font-display mt-1.5 text-[3.05rem] leading-none font-normal text-white sm:text-[3.65rem]">
            دلاورپور
          </strong>

          <span className="my-2.5 flex w-32 items-center gap-2.5" aria-hidden>
            <i className="h-px flex-1 bg-aqua-300/45" />
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#d8b96f]">
              <path d="M12 0 15 8 24 12 15 16 12 24 9 16 0 12 9 8Z" />
            </svg>
            <i className="h-px flex-1 bg-aqua-300/45" />
          </span>

          <span className="text-[0.76rem] leading-relaxed font-extrabold text-white sm:text-[0.84rem]">
            تلاشگران تاریانا اکسین
          </span>
          <span className="mt-2 text-[0.58rem] font-semibold text-[#d8b96f] sm:text-[0.65rem]">
            بنیان ۱۳۷۵
          </span>
        </div>
      </div>

      {caption ? (
        <figcaption className="flex items-center gap-3 text-[0.68rem] font-semibold text-onink-300">
          <span aria-hidden className="h-px w-7 bg-aqua-400/35" />
          {caption}
          <span aria-hidden className="h-px w-7 bg-aqua-400/35" />
        </figcaption>
      ) : null}
    </figure>
  );
}
