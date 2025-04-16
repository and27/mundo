"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Cuando estoy triste, llamo a Kuntur y vuelo alto.",
    name: "Antonia, 8 años",
  },
  {
    quote: "Ya no tengo miedo al dormir, Hatun me cuida.",
    name: "Mateo, 10 años",
  },
  {
    quote: "Antes pensaba que meditar era aburrido… ahora no quiero parar.",
    name: "Isabela, 13 años",
  },
];

const TestimonialCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { quote, name } = testimonials[index];

  return (
    <section className="my-20 max-w-xl mx-auto text-center fade-in">
      <blockquote className="italic text-xl font-light text-white/90 mb-4">
        “{quote}”
      </blockquote>
      <p className="text-sm text-white/60">— {name}</p>
    </section>
  );
};

export default TestimonialCarousel;
