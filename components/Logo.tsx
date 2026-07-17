import Link from "next/link";

interface LogoProps {
  size?: "lg" | "sm";
  href?: string;
}

export function Logo({ size = "lg", href = "/" }: LogoProps) {
  const isLarge = size === "lg";

  const box = (
    <span
      className={[
        "inline-flex items-center justify-center bg-accent text-white font-logo font-black italic leading-none select-none",
        isLarge
          ? "h-[44px] px-[10px] text-[28px] tracking-[-0.5px]"
          : "h-[22px] px-[5px] text-[14px] tracking-[-0.3px]",
      ].join(" ")}
      aria-label="Pranav"
    >
      Pranav
    </span>
  );

  if (!href) {
    return box;
  }

  return (
    <Link
      href={href}
      className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {box}
    </Link>
  );
}
