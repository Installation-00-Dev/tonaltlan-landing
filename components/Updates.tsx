"use client";

import { useFadeIn } from "@/hooks/useFadeIn";
import Image from "next/image";

const updates = [
  {
    id: 1,
    image: "/images/update-1.jpg",
    title: "Lanzamiento del Manual Basico",
    excerpt:
      "El primer manual de Tonaltlan ya esta disponible. Descubre las reglas, la ambientacion y todo lo que necesitas para comenzar tu aventura.",
    link: "#",
  },
  {
    id: 2,
    image: "/images/update-2.jpg",
    title: "Nuevo Suplemento: Los Senores de Mictlan",
    excerpt:
      "Explora el inframundo mesoamericano con nuevas reglas, criaturas y aventuras que pondran a prueba a los mas valientes.",
    link: "#",
  },
  {
    id: 3,
    image: "/images/update-3.jpg",
    title: "Encuentro Comunitario en Linea",
    excerpt:
      "Unete a nuestra proxima sesion comunitaria donde jugaremos una aventura one-shot exclusiva y responderemos tus preguntas.",
    link: "#",
  },
  {
    id: 4,
    image: "/images/update-4.jpg",
    title: "Detras del Codice: Proceso Creativo",
    excerpt:
      "Conoce como se creo el sistema de Tonalli y la investigacion detras de la mitologia que inspira nuestro juego.",
    link: "#",
  },
];

export default function Updates() {
  const sectionRef = useFadeIn<HTMLElement>();

  return (
    <section
      id="novedades"
      ref={sectionRef}
      className="py-20 opacity-0 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-10 font-serif text-3xl font-bold text-gold md:text-4xl">
          Novedades
        </h2>

        {/* Horizontal scroll container */}
        <div className="snap-scroll -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 lg:-mx-0 lg:px-0">
          {updates.map((item) => (
            <article
              key={item.id}
              className="glass-card flex w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-xl md:w-[340px]"
            >
              {/* Image placeholder */}
              <div className="relative h-44 w-full bg-foreground/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {item.excerpt}
                </p>
                <a
                  href={item.link}
                  className="inline-flex items-center gap-1 text-sm font-medium text-teal transition-colors hover:text-teal/80"
                >
                  Leer mas
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
