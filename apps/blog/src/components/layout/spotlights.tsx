import { Spotlight } from "@repo/ui/components/ui/spotlight";

function Spotlights() {
  return (
    <div className="absolute h-screen w-full overflow-hidden -z-10">
      <Spotlight
        className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="left-full top-10 h-[80vh] w-[50vw]"
        fill="purple"
      />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="hsla(var(--primary) / 0.5)" />
    </div>
  );
}

export default Spotlights;