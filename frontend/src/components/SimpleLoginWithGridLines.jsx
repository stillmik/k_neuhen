import { useId, useState } from "react";
import { cn } from "../lib/utils";
import { AuthPageBackground } from "./AuthPageBackground";
import { CenteredWithLogo as SiteFooter, Navbar as SiteNavbar } from "./SiteChrome";

export function SimpleLoginWithGridLines() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/login", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const data = await response.json();

      if (data.errors) {
        setError(data.errors.form || data.errors.email || data.errors.password || "Unable to sign in.");
        return;
      }

      window.location.assign("/login-success");
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-900 text-white">
      <AuthPageBackground />
      <SiteNavbar />
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-[30rem]">

        <div className="w-full rounded-xl bg-neutral-800/95 px-10 py-14 text-neutral-100 shadow-xl ring-1 ring-white/10">
          <div className="flex flex-col items-center gap-6">
            <Logo />
            <h1 className="text-center text-xl text-white">Sign in to K-Neuhen</h1>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-neutral-700 px-4 py-2 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-neutral-700 px-4 py-2 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 block w-full cursor-pointer rounded-2xl bg-indigo-600 px-6 py-2 text-center text-base font-medium text-white transition duration-150 hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <div className="mt-2 flex items-center" aria-hidden="true">
                <div className="h-px flex-1 bg-neutral-600" />
                <span className="px-4 text-xs text-neutral-400">or</span>
                <div className="h-px flex-1 bg-neutral-600" />
              </div>

              <div className="mt-1 flex flex-col gap-3">
                <a
                  href="/auth/google"
                  aria-label="Sign in with Google"
                  title="Sign in with Google"
                  className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </a>
                <button
                  type="button"
                  aria-label="Sign in with Facebook"
                  title="Sign in with Facebook"
                  className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"
                >
                  <FacebookIcon />
                  <span>Continue with Facebook</span>
                </button>
                <button
                  type="button"
                  aria-label="Sign in with Mac"
                  title="Sign in with Mac"
                  className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"
                >
                  <AppleIcon />
                  <span>Continue with Mac</span>
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-neutral-400">
              New here?{" "}
              <a href="/register" className="font-medium text-indigo-400 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="relative flex size-10 items-center justify-center rounded-md">
        <img
          src="https://assets.aceternity.com/logo.png"
          height={40}
          width={40}
          alt="Logo"
        />
      </div>
      <span className="text-xl font-semibold text-white">
        K-Neuhen
      </span>
    </a>
  );
}

function GridLineHorizontal({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#171717",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        maskComposite: "exclude",
      }}
      className={cn(
        "[--color-dark:var(--color-neutral-700)] [--color:var(--color-neutral-700)]",
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
}

function GridLineVertical({ className, offset }) {
  return (
    <div
      style={{
        "--background": "#171717",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        maskComposite: "exclude",
      }}
      className={cn(
        "[--color-dark:var(--color-neutral-700)] [--color:var(--color-neutral-700)]",
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "bg-size-[var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
        "mask-exclude",
        "z-30",
        "bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.7h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.4 3.1-7.3Z" />
      <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.2-2.5c-.9.6-2.1 1-3.7 1-2.8 0-5.1-1.9-6-4.4H2.7v2.6A10.4 10.4 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6 13.6a6.3 6.3 0 0 1 0-3.9V7.1H2.7a10.4 10.4 0 0 0 0 9.1L6 13.6Z" />
      <path fill="#EA4335" d="M12 5.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A10.3 10.3 0 0 0 2.7 7.1L6 9.7c.9-2.5 3.2-4.4 6-4.4Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#0866FF" />
      <path fill="white" d="M13.3 18v-5h1.7l.3-2h-2v-1.3c0-.6.2-1 1-1h1V7a12 12 0 0 0-1.8-.2c-1.8 0-3 1.1-3 3.1V11H8.8v2h1.7v5h2.8Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.7c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.8c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-4ZM14.5 6.1c.6-.8 1-1.8.9-2.8-1 .1-2.1.7-2.7 1.5-.6.7-1 1.7-.9 2.7 1 .1 2.1-.5 2.7-1.4Z" />
    </svg>
  );
}

function FoxtrotHeroBackground() {
  const patternId = useId();
  const squares = [
    [-4, -1], [-2, 1], [0, -2], [2, 0], [4, -3], [5, 2], [-5, 3], [1, 4],
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80 [mask-image:linear-gradient(to_bottom,white,white_72%,transparent)]"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-neutral-700/15 stroke-neutral-700"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={patternId} width="120" height="120" patternUnits="userSpaceOnUse" x="50%" y="-72">
            <path d="M.5 120V.5H120" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} strokeWidth="0" />
        {squares.map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={600 + x * 120}
            y={-72 + y * 120}
            width="121"
            height="121"
            strokeWidth="0"
          />
        ))}
      </svg>
    </div>
  );
}
