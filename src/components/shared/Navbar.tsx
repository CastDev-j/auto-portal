import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaCar } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos y Servicios" },
  { href: "/capacidades", label: "Capacidades" },
  { href: "/calidad", label: "Calidad y Certificaciones" },
  { href: "/sectores", label: "Sectores y Clientes" },
  { href: "/noticias", label: "Noticias y Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="container z-50">
        <section className="flex justify-between items-center gap-8 py-3">
          <a
            href="/"
            className="flex min-w-0 items-center gap-2 text-aztec-950"
          >
            <FaCar className="h-8 w-8 shrink-0 text-aztec-600" />
            <span className="truncate text-lg font-bold text-aztec-600">
              Proveedora Automotriz Laja-Bajío
            </span>
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            className="button rounded-lg p-2 text-aztec-50 transition-colors hover:bg-aztec-500/10 hover:text-aztec-800"
          >
            {isMenuOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </button>
        </section>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            isMenuOpen
              ? "max-h-128 border-t border-aztec-950/10 opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 p-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative block rounded-lg px-3 py-2 text-aztec-600 transition-colors hover:bg-aztec-500/10 hover:text-aztec-800"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-3 h-0.5 w-0 bg-aztec-500 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
