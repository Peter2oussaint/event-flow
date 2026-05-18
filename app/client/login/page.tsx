"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function ClientLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/client-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof result.error === "string" ? result.error : "Login failed",
        );
      }

      router.push("/client/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="font-futura min-h-screen bg-[#48897f] px-8 py-8 text-white sm:px-12 lg:px-16">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1900px] items-center gap-10 lg:grid-cols-[430px_1fr] xl:grid-cols-[500px_1fr]">
        <div className="flex h-full flex-col justify-start pt-2 lg:pt-0">
          <div className="relative mb-10 h-40 w-40 sm:h-48 sm:w-48 lg:h-52 lg:w-52">
            <Image
              src="/client/new-pp-logo.png"
              alt="Piper logo"
              fill
              sizes="(min-width: 1024px) 208px, (min-width: 640px) 192px, 160px"
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-6xl font-light leading-none text-white sm:text-7xl">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="mt-12 max-w-md space-y-8">
            <label className="block">
              <span className="text-2xl font-light text-white sm:text-[1.7rem]">
                Username
              </span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-0 block w-full border-0 border-b-3 border-white bg-transparent px-0 py-0 text-2xl font-light text-white outline-none placeholder:text-white/50 focus:border-[#f0d4c9] sm:text-[1.7rem]"
              />
            </label>

            <label className="block">
              <span className="text-2xl font-light text-white sm:text-[1.7rem]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-0 block w-full border-0 border-b-3 border-white bg-transparent px-0 py-0 text-2xl font-light text-white outline-none placeholder:text-white/50 focus:border-[#f0d4c9] sm:text-[1.7rem]"
              />
            </label>

            {error ? (
              <p className="text-xl font-light text-[#f0d4c9] sm:text-2xl">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-full bg-[#f0d4c9] px-8 py-3 text-2xl font-light text-[#48897f] transition hover:bg-white sm:text-[1.7rem]"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="relative hidden h-[82vh] min-h-[640px] overflow-hidden rounded-2xl bg-[#1f2a26] shadow-2xl shadow-[#385f57]/30 lg:block">
          <Image
            src="/client/westhamel-1266.jpg"
            alt="Wedding guests dancing"
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
