import { HeroPosterSlider } from "@/components/home/HeroPosterSlider";

export function Hero() {
  return (
    <section className="mesh-dark relative isolate overflow-hidden">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -start-40 h-[42rem] w-[42rem] rounded-full bg-aqua-500/12 blur-[130px]"
      />
      <div
        aria-hidden
        className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08]"
      />

      <div className="shell relative pt-[calc(var(--nav-h)+clamp(2.5rem,6vw,5.5rem))] pb-[clamp(3.5rem,7vw,7rem)]">
        <HeroPosterSlider />
      </div>
    </section>
  );
}
