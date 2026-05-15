import Image from "next/image";

export default function ClientLoginPage() {
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

          <form className="mt-12 max-w-md space-y-8">
            <label className="block">
              <span className="text-2xl font-light text-white sm:text-[1.7rem]">
                Username
              </span>
              <input
                type="text"
                className="mt-0 block w-full border-0 border-b-3 border-white bg-transparent px-0 py-0 text-2xl font-light text-white outline-none placeholder:text-white/50 focus:border-[#f0d4c9] sm:text-[1.7rem]"
              />
            </label>

            <label className="block">
              <span className="text-2xl font-light text-white sm:text-[1.7rem]">
                Password
              </span>
              <input
                type="password"
                className="mt-0 block w-full border-0 border-b-3 border-white bg-transparent px-0 py-0 text-2xl font-light text-white outline-none placeholder:text-white/50 focus:border-[#f0d4c9] sm:text-[1.7rem]"
              />
            </label>

            <button
              type="button"
              className="text-left text-2xl font-light text-white transition hover:text-[#f0d4c9] sm:text-[1.7rem]"
            >
              Forgot Password?
            </button>

            <button
              type="button"
              className="mt-4 w-full rounded-full bg-[#f0d4c9] px-8 py-3 text-2xl font-light text-[#48897f] transition hover:bg-white sm:text-[1.7rem]"
            >
              Login
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
