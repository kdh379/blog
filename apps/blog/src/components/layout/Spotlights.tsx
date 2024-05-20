import { Spotlight } from "@repo/ui/components/ui/spotlight";

function Spotlights() {
  return (
    <div>
      <Spotlight
        className="h-screen -top-40 -left-10 md:-left-32 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="purple"
      />
      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
    </div>
  );
}

export default Spotlights;