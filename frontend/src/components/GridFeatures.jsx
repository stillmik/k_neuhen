export function GridFeatures({ items = [] }) {
  return (
    <section className="relative mx-auto mt-20 w-full max-w-7xl overflow-hidden px-4 md:mt-24 md:px-8">
      <div className="rounded-[24px] border border-neutral-700 p-2">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group h-[348px] [perspective:1200px]"
            >
              <div className="relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 rounded-3xl bg-neutral-900 p-1 [backface-visibility:hidden]">
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-sm ring-1 shadow-black/20 ring-black/20">
                    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(255,255,255,0.3)_0.5px,transparent_0)] bg-repeat [background-size:8px_8px] [mask-image:radial-gradient(circle_at_center,white,transparent)]" />
                    <div className="relative z-10 flex h-full items-center justify-center p-7">
                    <img
                      src={item.src}
                      alt={item.title}
                      width={1024}
                      height={1020}
                      className="h-full w-full object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105"
                    />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-950 p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
                      {item.designation}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-4 text-base leading-7 text-neutral-300">
                      {item.description}
                    </p>
                    <p className="mt-8 text-3xl font-semibold text-white">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
