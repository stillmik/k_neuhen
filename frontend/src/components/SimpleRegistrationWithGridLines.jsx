import { useState } from "react";
import { cn } from "../lib/utils";
import { AuthPageBackground } from "./AuthPageBackground";
import { CenteredWithLogo as SiteFooter, Navbar as SiteNavbar } from "./SiteChrome";

const fields = [
  { id: "first-name", name: "first_name", label: "First name", type: "text", autoComplete: "given-name" },
  { id: "last-name", name: "last_name", label: "Last name", type: "text", autoComplete: "family-name" },
  { id: "email", name: "email", label: "Email", type: "email", autoComplete: "email" },
  { id: "phone", name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
  { id: "password", name: "password", label: "Password", type: "password", autoComplete: "new-password" },
  { id: "confirm-password", name: "confirmPassword", label: "Confirm password", type: "password", autoComplete: "new-password" },
];

export function SimpleRegistrationWithGridLines() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("password") !== data.get("confirmPassword")) {
      setError("Passwords do not match.");
      return;
    }

    data.delete("confirmPassword");
    setIsSubmitting(true);

    try {
      const response = await fetch("/register", { method: "POST", body: data });
      const result = await response.json();
      if (result.errors) {
        setError(Object.values(result.errors)[0] || "Unable to create your account.");
        return;
      }
      window.location.assign("/success");
    } catch {
      setError("Unable to create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-900 text-white">
      <AuthPageBackground />
      <SiteNavbar />
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-[40rem]">

        <div className="w-full rounded-xl bg-neutral-800/95 px-8 py-12 text-neutral-100 shadow-xl ring-1 ring-white/10 sm:px-10">
          <div className="flex flex-col items-center gap-6">
            <Logo />
            <h1 className="text-center text-xl text-white">Sign up for K-Neuhen</h1>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label htmlFor={field.id} className="text-sm font-medium text-neutral-200">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required
                      className="w-full rounded-xl border border-white/10 bg-neutral-700 px-4 py-2 text-white shadow-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 block w-full cursor-pointer rounded-2xl bg-indigo-600 px-6 py-2 text-center text-base font-medium text-white transition duration-150 hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

              <div className="mt-1 flex items-center" aria-hidden="true">
                <div className="h-px flex-1 bg-neutral-600" />
                <span className="px-4 text-xs text-neutral-400">or</span>
                <div className="h-px flex-1 bg-neutral-600" />
              </div>

              <div className="mt-1 flex flex-col gap-3">
                <a href="/auth/google" aria-label="Sign up with Google" title="Sign up with Google" className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"><GoogleIcon /><span>Continue with Google</span></a>
                <button type="button" aria-label="Sign up with Facebook" title="Sign up with Facebook" className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"><FacebookIcon /><span>Continue with Facebook</span></button>
                <button type="button" aria-label="Sign up with Mac" title="Sign up with Mac" className="flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neutral-700 px-4 py-3 text-white transition hover:bg-neutral-600 active:scale-[0.98]"><AppleIcon /><span>Continue with Mac</span></button>
              </div>
            </form>

            <p className="text-center text-xs text-neutral-400">
              Already have an account? <a href="/login" className="font-medium text-indigo-400 hover:underline">Sign in</a>
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
  return <a href="/" className="flex items-center gap-2"><span className="flex size-10 items-center justify-center rounded-md text-2xl text-indigo-400">✦</span><span className="text-xl font-semibold text-white">K-Neuhen</span></a>;
}

function MainPageBackground() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="absolute inset-0 bg-neutral-900" /><div className="absolute inset-[-25%] -rotate-45 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:180px_100%] opacity-45" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(82,82,91,0.28),transparent_55%)]" /></div>;
}

function GridLineHorizontal({ className, offset }) {
  return <div style={{ "--background": "#171717", "--height": "1px", "--width": "5px", "--fade-stop": "90%", "--offset": offset || "200px", maskComposite: "exclude" }} className={cn("[--color:var(--color-neutral-700)] absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30", className)} />;
}

function GridLineVertical({ className, offset }) {
  return <div style={{ "--background": "#171717", "--height": "5px", "--width": "1px", "--fade-stop": "90%", "--offset": offset || "150px", maskComposite: "exclude" }} className={cn("[--color:var(--color-neutral-700)] absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] bg-size-[var(--width)_var(--height)] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] mask-exclude z-30", className)} />;
}

function GoogleIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.7h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.4 3.1-7.3Z" /><path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.2-2.5c-.9.6-2.1 1-3.7 1-2.8 0-5.1-1.9-6-4.4H2.7v2.6A10.4 10.4 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6 13.6a6.3 6.3 0 0 1 0-3.9V7.1H2.7a10.4 10.4 0 0 0 0 9.1L6 13.6Z" /><path fill="#EA4335" d="M12 5.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A10.3 10.3 0 0 0 2.7 7.1L6 9.7c.9-2.5 3.2-4.4 6-4.4Z" /></svg>; }
function FacebookIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#0866FF" /><path fill="white" d="M13.3 18v-5h1.7l.3-2h-2v-1.3c0-.6.2-1 1-1h1V7a12 12 0 0 0-1.8-.2c-1.8 0-3 1.1-3 3.1V11H8.8v2h1.7v5h2.8Z" /></svg>; }
function AppleIcon() { return <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.7 12.7c0-2.2 1.8-3.3 1.9-3.4a4.1 4.1 0 0 0-3.2-1.8c-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-4ZM14.5 6.1c.6-.8 1-1.8.9-2.8-1 .1-2.1.7-2.7 1.5-.6.7-1 1.7-.9 2.7 1 .1 2.1-.5 2.7-1.4Z" /></svg>; }
