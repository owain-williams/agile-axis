import Image from "next/image";
import Link from "next/link";

export function Hero({}) {
  return (
    <section className="bg-cover bg-center bg-opacity-50 bg-[url('/img/marketing/kanban-board-irl.webp')] w-full py-20 md:py-32 lg:py-40 xl:py-48">
      <div className="container px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
          Take control of your software projects.
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-10">
          ProjectMaster is your one-stop solution for seamless project
          management. Unleash your team&apos;s potential with our intuitive and
          powerful tools.
        </p>
        <div className="space-x-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-900"
            href="#"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-500"
            href="#"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}
