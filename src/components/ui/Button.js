import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        custom: "",
        default: "bg-rail-light text-white hover:bg-rail-dark",
        destructive:
          "bg-red-600 text-white hover:bg-red-600/90",
        outline:
          "border border-input bg-white hover:bg-gray-200 hover:text-black",
        ghost: "hover:bg-gray-200 hover:text-black",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * @param {{
 *    className: string,
 *    asChild: boolean,
 *    size: "default" | "sm" | "lg" | "icon",
 *    variant: "default" | "custom" | "destructive" | "outline" | "ghost" | "link",
 * } & React.ButtonHTMLAttributes} param0 
 * @returns {React.JSX.Element}
 */
const Button = ({ className, asChild, size, variant, ...props }) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button };
