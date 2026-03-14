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
  { label: "Instagram", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Discord", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-glass-border py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Contact cards */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-gold">
            Contacto
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact.email}
                className="glass-card rounded-xl p-5"
              >
                <h3 className="mb-1 font-serif text-base font-semibold text-foreground">
                  {contact.role}
                </h3>
                <p className="mb-2 text-xs text-muted">{contact.description}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-teal transition-colors hover:text-teal/80"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-6 border-t border-glass-border pt-8 md:flex-row md:justify-between">
          {/* Production credit */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/produccion.png"
              alt="Cuevas y Quetzales"
              width={36}
              height={36}
              className="h-9 opacity-70"
              style={{ width: "auto" }}
            />
            <span className="text-sm text-muted">
              Una produccion de Cuevas & Quetzales
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60">
            {"2025 Tonaltlan. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  );
}
