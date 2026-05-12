"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(mode === "login" ? "Signing in..." : "Creating first admin...");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatus(data.message || "Request failed.");
      setIsLoading(false);
      return;
    }

    if (mode === "register") {
      setStatus("Admin created. Switch to login mode and sign in.");
      setMode("login");
      setIsLoading(false);
      return;
    }

    setStatus("Login successful. Redirecting...");
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-border/60 bg-card/35 p-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-primary">Portfolio CMS</p>
        <h1 className="mb-1 font-mono text-2xl font-semibold">
          {mode === "login" ? "Admin Login" : "Create First Admin"}
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {mode === "login"
            ? "Use your admin credentials to manage portfolio content."
            : "Run once to create your first CMS admin account."}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-md border border-border/70 bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary/50"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-border/70 bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary/50"
            required
            minLength={8}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-sm text-primary hover:bg-primary/20 disabled:opacity-60"
          >
            {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Create Admin"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((prev) => (prev === "login" ? "register" : "login"));
            setStatus("");
          }}
          className="mt-4 text-xs text-muted-foreground underline hover:text-primary"
        >
          {mode === "login" ? "Need first admin? Create account" : "Already have admin? Back to login"}
        </button>

        <p className="mt-4 min-h-5 text-xs text-muted-foreground">{status}</p>
      </div>
    </main>
  );
};

export default AdminLoginPage;
