import Image from "next/image";

const contacts = [
  {
    role: "Arquitecto Tonal",
    email: "arquitectotonal@tonaltlan.com",
    description: "Diseno de juego y contenido creativo",
  },
  {
    role: "Guarda Codices",
    email: "guardacodices@tonaltlan.com",
    description: "Comunidad y eventos",
  },
  {
    role: "Tecnomante",
    email: "tecnomante@tonaltlan.com",
    description: "Soporte tecnico y digital",
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tonaltlan/",
    iconSrc: "/images/social/instagram.webp",
    iconAlt: "Instagram",
  },
  { label: "X / Twitter", href: "#" },
  { label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-800 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Contact cards */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-amber-300">
            Contacto
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact.email}
                className="rounded-xl bg-slate-900 p-6 ring-1 ring-slate-800"
              >
                <h3 className="mb-1 font-serif text-base font-semibold text-slate-100">
                  {contact.role}
                </h3>
                <p className="mb-3 text-sm text-slate-400">{contact.description}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all text-sm font-medium text-amber-300 underline-offset-4 transition-colors hover:text-amber-200 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-6 border-t border-slate-800 pt-8 md:flex-row md:justify-between">
          {/* Production credit */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/produccion.webp"
              alt="Cuevas y Quetzales"
              width={36}
              height={36}
              className="h-9 opacity-80"
              style={{ width: "auto" }}
            />
            <span className="text-sm text-slate-400">
              Una produccion de Cuevas & Quetzales
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-amber-300"
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {social.iconSrc ? (
                  <Image
                    src={social.iconSrc}
                    alt={social.iconAlt ?? "Instagram"}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] rounded-sm"
                  />
                ) : null}
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            {"© 2025 Tonaltlan. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
