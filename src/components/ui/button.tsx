import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium cursor-pointer transition-colors focus-visible:outline-none duration-200 focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default:
          "-translate-x-[0.25rem] -translate-y-[0.25rem] ml-[0.4rem] active:translate-0 select-none rounded-full border border-black border-solid transition duration-200 bg-primary text-primary-foreground shadow-float active:shadow-none",
        hover:
          "hover:-translate-x-[0.25rem] hover:-translate-y-[0.25rem] active:translate-0 ml-[0.4rem] h-9 select-none rounded-full border border-black border-solid bg-primary px-6 py-2 text-primary-foreground text-xs transition duration-200 hover:shadow-[0.25rem_0.25rem_#000] active:shadow-none has-[>svg]:px-3 hover:dark:shadow-[0.25rem_0.25rem_#fff]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-slate-900 text-white text-sm hover:bg-slate-900/90 rounded-full dark:bg-slate-200 dark:text-black dark:hover:bg-slate-200/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-6 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-6 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): React.JSX.Element {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
