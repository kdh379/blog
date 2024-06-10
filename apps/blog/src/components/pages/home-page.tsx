

import Hero from "@blog/components/home/hero";

export default async function HomePage() {

  return (
    <main className="pt-mobileHeader desktop:pt-0 m-auto">
      <Hero />
    </main>
  );
}