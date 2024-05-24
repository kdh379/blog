

import Hero from "@blog/components/home/Hero";

export default async function HomePage() {

  return <main className="m-auto pt-mobileHeader desktop:pt-0">
    <Hero />
  </main>;
}