import { useEffect, useMemo, useState } from "react";
import { BarChart3, Bot, Cloud } from "lucide-react";
import { SiFirebase, SiGoogle, SiRaycast, SiReact, SiSupabase } from "react-icons/si";

const BRANDS = [
  { name: "Raycast", icon: SiRaycast, color: "#ff6b6b" },
  { name: "Microsoft", mark: "▦", color: "#60a5fa" },
  { name: "Google", icon: SiGoogle, color: "#fbbc04" },
  { name: "Adobe", mark: "A", color: "#ff4b55" },
];

const TECHNOLOGIES = [
  { icon: BarChart3, color: "#f9a825", glow: "#ffc84e" },
  { icon: Bot, color: "#f4f4f5", glow: "#91b3ff" },
  { icon: SiSupabase, color: "#3ecf8e", glow: "#6effbe" },
  { icon: SiReact, color: "#61dafb", glow: "#85e9ff" },
  { icon: Cloud, color: "#ff9900", glow: "#ffc36a" },
  { icon: SiFirebase, color: "#ffca28", glow: "#e37400" },
];

function AnimatedMetric() {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (value >= 100) return undefined;
    const timer = window.setTimeout(() => setValue((current) => Math.min(100, current + 3)), 22);
    return () => window.clearTimeout(timer);
  }, [value]);

  return value;
}

function MetricGrid() {
  const cells = useMemo(() => Array.from({ length: 30 }), []);
  return (
    <div className="absolute inset-0 z-[1] grid grid-cols-6 grid-rows-5 opacity-70 [mask-image:radial-gradient(circle_at_70%_35%,black,transparent_76%)]">
      {cells.map((_, index) => (
        <span
          key={index}
          className="rounded-xl border border-white/[0.06] transition-all duration-300 hover:z-10 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-[inset_0_10px_22px_rgba(255,255,255,0.045),0_10px_24px_rgba(0,0,0,0.38)]"
        />
      ))}
    </div>
  );
}

function BrandRail() {
  const repeated = [...BRANDS, ...BRANDS];
  return (
    <div className="scaling-marquee-mask flex h-full items-center overflow-hidden">
      <div className="scaling-marquee-right flex w-max items-center gap-4 px-4">
        {repeated.map((brand, index) => {
          const Icon = brand.icon;
          return (
            <div key={`${brand.name}-${index}`} className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
              {Icon ? <Icon size={18} style={{ color: brand.color }} /> : <span className="text-lg font-black" style={{ color: brand.color }}>{brand.mark}</span>}
              <span className="text-sm font-semibold text-zinc-200">{brand.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TechnologyRail() {
  const repeated = [...TECHNOLOGIES, ...TECHNOLOGIES];
  return (
    <div className="flex h-full items-center gap-8 px-8">
      <span className="relative z-10 shrink-0 text-lg font-semibold text-white">Technologies we use</span>
      <div className="scaling-marquee-mask min-w-0 flex-1 overflow-hidden">
        <div className="scaling-marquee-left flex w-max items-center gap-12 px-4">
          {repeated.map((technology, index) => {
            const Icon = technology.icon;
            return (
              <div key={index} className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_28px_rgba(0,0,0,0.32)]">
                <span className="absolute inset-x-2 bottom-0 h-3 rounded-full blur-lg" style={{ background: technology.glow }} />
                <Icon size={27} className="relative z-10" style={{ color: technology.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ScalingSuccessfulCompanies() {
  const metric = AnimatedMetric();

  return (
    <section className="mx-auto mt-28 w-full max-w-7xl pb-4">
      <h2 className="mb-14 text-5xl font-semibold tracking-[-0.045em] text-white md:text-6xl">Scaling Successful Companies</h2>

      <div className="grid min-h-[560px] grid-cols-2 grid-rows-4 gap-3">
          <article className="relative row-span-3 flex overflow-hidden rounded-3xl border border-white/10 bg-[#111212] p-8">
            <MetricGrid />
            <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="text-[7rem] font-medium leading-none tracking-[-0.07em] text-white">{metric}+</div>
                <p className="mt-4 text-xl font-medium text-zinc-400">Companies served</p>
              </div>
              <p className="max-w-md text-lg leading-7 text-zinc-400">We design and build websites that drive results and help your business grow. No Calls. No BS. Just Results.</p>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#111212]">
            <BrandRail />
          </article>

          <article className="relative row-span-2 flex overflow-hidden rounded-3xl border border-white/10 bg-[#111212] p-8">
            <div className="absolute -right-8 -top-10 grid grid-cols-4 opacity-45">
              {Array.from({ length: 16 }).map((_, index) => <span key={index} className="size-20 border border-amber-200/10 bg-amber-200/[0.015]" />)}
            </div>
            <div className="relative z-10 mt-auto">
              <div className="mb-5 text-2xl font-bold tracking-tight text-zinc-300">CURSOR</div>
              <blockquote className="text-lg leading-7 text-zinc-400">“Since adding the AI assistant to our store, our support load has dropped by nearly 60%. Customers now get instant answers about supplements and dosages.”</blockquote>
              <div className="mt-7 flex gap-2 text-base"><strong className="text-white">— James Finley</strong><span className="text-zinc-500">Founder, Primer</span></div>
            </div>
          </article>

          <article className="col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-[#111212]">
            <TechnologyRail />
          </article>
      </div>
    </section>
  );
}
