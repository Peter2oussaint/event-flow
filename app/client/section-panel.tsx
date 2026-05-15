export function SectionPanel({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="mt-8 overflow-hidden rounded-[2.4rem] bg-[#48897f]">
      <div className="bg-[#f68e58] px-6 py-5 sm:px-10 lg:px-12 xl:px-16">
        <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl xl:text-4xl">
          {title}
        </h2>
      </div>
      <div className="p-6 sm:p-10 lg:p-12 xl:p-16">{children}</div>
    </section>
  );
}
