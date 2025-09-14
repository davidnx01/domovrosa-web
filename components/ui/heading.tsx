import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: {
    container?: string;
    title?: string;
    subtitle?: string;
  };
}

export function Heading({ title, subtitle, className }: HeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-2",
        className?.container
      )}
    >
      {subtitle && (
        <h4
          className={cn(
            "py-0.5 px-1 bg-primary text-sm sm:text-base font-bold uppercase",
            className?.subtitle
          )}
        >
          {subtitle}
        </h4>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl lg:text-4xl font-bold text-black",
          className?.title
        )}
      >
        {title}
      </h2>
    </div>
  );
}
