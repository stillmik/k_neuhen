import { cn } from "../lib/utils";

const useCases = [
  {
    title: "DevOps",
    description:
      "Visually orchestrate autonomous agents without writing boilerplate code",
    icon: DevopsIcon,
  },
  {
    title: "SalesOps",
    description:
      "Visually orchestrate autonomous agents without writing boilerplate code",
    icon: GraphIcon,
  },
  {
    title: "Supply Chain",
    description:
      "Visually orchestrate autonomous agents without writing boilerplate code",
    icon: TruckIcon,
  },
];

export function UseCasesSection() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 md:px-8">
      <div className="relative flex flex-col items-center">
        <p className="text-sm font-medium text-[#ff6b5f] md:text-base">
          Use Cases
        </p>
        <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Across various Industries
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-center text-base font-medium leading-7 text-zinc-200 md:text-xl">
          We empower developers and technical teams to create, simulate, and
          <br className="hidden md:block" />
          manage AI-driven workflows visually
        </p>

        <div className="mt-16 grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;

            return (
              <div key={useCase.title} className="relative">
                <div className="relative z-10 overflow-hidden rounded-lg bg-neutral-800 p-6 transition duration-200 before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:border before:border-white/15 before:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.14)_1px,transparent_1px,transparent_9px)] before:opacity-0 before:transition-opacity before:duration-200 hover:bg-neutral-900 hover:before:opacity-100 md:p-7">
                  <div className="relative z-10">
                  <Icon className="size-6 text-[#ff6b5f]" />
                  <h3 className="mt-6 mb-4 text-xl font-medium text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-lg leading-8 text-neutral-400">
                    {useCase.description}
                  </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DevopsIcon({ className }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <path d="M11 7.5h3.5a2 2 0 0 1 2 2V13" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  );
}

function GraphIcon({ className }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16V9" />
      <path d="M12 16v-5" />
      <path d="M16 16V7" />
    </svg>
  );
}

function TruckIcon({ className }) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7a2 2 0 0 1 2-2h8v10H3z" />
      <path d="M13 9h4l4 4v2h-8z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}
