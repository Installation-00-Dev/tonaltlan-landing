import Image from "next/image";
import Link from "next/link";
import { contacts, footerColumns, socialLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-slate-800 bg-slate-950 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Estudio + mapa del sitio */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <Image
              src="/images/produccion_footer.webp"
              alt="Cuevas y Quetzales"
              width={900}
              height={416}
              className="h-auto w-64 md:w-72"
              sizes="288px"
            />
            <p className="mt-5 text-sm text-slate-400">Una produccion de Cuevas & Quetzales</p>
          </div>

          <nav aria-label="Mapa del sitio" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-4 font-serif text-sm font-semibold uppercase tracking-[0.15em] text-amber-300">
                  {column.title}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Contact cards */}
        <div className="mt-16 border-t border-slate-800 pt-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-amber-300">Contacto</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div key={contact.email} className="rounded-xl bg-slate-900 p-6 ring-1 ring-slate-800">
                <h3 className="mb-1 font-serif text-base font-semibold text-slate-100">{contact.role}</h3>
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
        <div className="mt-12 flex flex-col items-center gap-6 border-t border-slate-800 pt-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-5">
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
          <p className="text-xs text-slate-500">{"© 2025 Tonaltlan. Todos los derechos reservados."}</p>
        </div>
      </div>
    </footer>
  );
}
