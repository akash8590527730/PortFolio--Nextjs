import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
};
export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-bold leading-tight tracking-tight text-slate-800",
        size === "xl" && "text-5xl md:text-7xl",
        size === "lg" && "text-4xl md:text-6xl",
        size === "md" && "text-3xl md:text-5xl",
        size === "sm" && "text-2xl md:text-4xl",
        className
      )}
    >
      {children}
    </Comp>
  );
}
