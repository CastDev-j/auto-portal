import { useCallback, useEffect, useRef, useState } from "react";
import { cn, debounce } from "@/lib/utils";

export interface CarouselItem {
  nombre: string;
  alt: string;
}

interface Props {
  items: CarouselItem[];
  interval?: number;
}

export default function Carousel({ items, interval = 4500 }: Props) {
  const count = items.length;
  const [active, setActive] = useState(0);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, interval);
  }, [count, interval, stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const resume = useRef(debounce(() => start(), 300)).current;

  if (count === 0) return null;

  const go = (index: number) => setActive(((index % count) + count) % count);

  return (
    <section
      className={cn("relative w-full overflow-hidden")}
      aria-roledescription="carrusel"
      aria-label="Galería destacada"
      onMouseEnter={stop}
      onMouseLeave={() => resume()}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {items.map((item, i) => (
          <figure
            key={i}
            className="w-full shrink-0"
            aria-hidden={i !== active}
          >
            <img
              src={`https://placehold.co/1200x600/effefc/05c7c0?text=${encodeURIComponent(item.nombre)}`}
              alt={item.alt}
              className="aspect-video w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </figure>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Anterior"
        className="button absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-aztec-950/40 p-2 text-aztec-50 transition-colors hover:bg-aztec-950/60"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Siguiente"
        className="button absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-aztec-950/40 p-2 text-aztec-50 transition-colors hover:bg-aztec-950/60"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir a ${item.nombre}`}
            aria-current={i === active}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              i === active ? "bg-aztec-500 px-4" : "bg-aztec-950/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
