import React from "react";
import AboutHero from "./AboutHero";
import WHyChoose from "./WHyChoose";
import Team from "./Team";
import Vision from "./Vision";
import TestimonialsPage from "../HomeComponents/TestimonialsPage";

export default function AboutMain() {
  return (
    <div>
      <AboutHero />
      <Vision />
      <WHyChoose />
      {/* <Team /> */}
      <TestimonialsPage />
    </div>
  );
}
