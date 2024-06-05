

import Hero from "@blog/components/home/hero";

export default async function HomePage() {

  return <main className="m-auto pt-mobileHeader desktop:pt-0">
    <Hero />
  </main>;
}