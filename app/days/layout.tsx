import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex-1 flex justify-center items-center relative">
      <Link href="/" className="absolute top-0 left-0 mt-8 text-sm opacity-50 hover:opacity-100">cd..</Link>
      <div className="size-96 flex justify-center items-center">
        {children}
      </div>
      <div></div>
    </section>
  )
}
