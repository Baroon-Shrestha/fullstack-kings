import React from "react";
import HomeHero from "./HomeHero";
import HomeBrand from "./HomeBarnd";
import HomeLocation from "./HomeLocation";
import HomeWhy from "./HomeWhy";
import TestimonialsPage from "./TestimonialsPage";

export default function HomeMain() {
  return (
    <div>
      <HomeHero />
      <HomeBrand />
      <HomeWhy />
      <TestimonialsPage />
      <HomeLocation />
    </div>
  );
}
