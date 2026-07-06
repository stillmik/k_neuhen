import { cn } from "../lib/utils";

export function SimpleLoginWithGridLines() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4 dark:bg-neutral-950">
      <div className="relative w-full max-w-md">
        <GridLineHorizontal className="top-0" offset="80px" />
        <GridLineHorizontal className="top-auto bottom-0" offset="80px" />
        <GridLineVertical className="left-0" offset="80px" />
        <GridLineVertical className="right-0 left-auto" offset="80px" />

        <div className="w-full px-10 py-8">
          <div className="flex flex-col items-center gap-6">
            <Logo />

            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border-0 bg-white px-4 py-2 text-neutral-900 shadow-sm ring-1 shadow-black/10 ring-black/10 transition-all duration-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/10 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="w-full rounded-lg border-0 bg-white px-4 py-2 text-neutral-900 shadow-sm ring-1 shadow-black/10 ring-black/10 transition-all duration-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none dark:bg-neutral-900 dark:text-white dark:shadow-white/5 dark:ring-white/10 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-950 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-black/30 transition-all duration-200 hover:shadow-black/40 dark:from-neutral-600 dark:to-neutral-900"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2">
      <div className="relative flex size-10 items-center justify-center rounded-md">
        <img
          src="https://assets.aceternity.com/logo.png"
          height={40}
          width={40}
          alt="Logo"
        />
      </div>
      <span className="text-xl font-semibold text-neutral-900 dark:text-white">
        K-Neuhen
      </span>
    </a>
  );
}

function GridLineHorizontal({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        maskComposite: "exclude",
      }}
      className={cn(
        "[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)]",
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
}

function GridLineVertical({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        maskComposite: "exclude",
      }}
      className={cn(
        "[--color-dark:var(--color-neutral-800)] [--color:var(--color-neutral-400)]",
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
}
