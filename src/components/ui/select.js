import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "../../lib/utils"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

/**@param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>} param0 */
const SelectTrigger = ({ className, children, ...props }) => (
    <SelectPrimitive.Trigger
    className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
    )}
    {...props}
    >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>} param0 */
const SelectScrollUpButton = ({ className, ...props }) => (
    <SelectPrimitive.ScrollUpButton
    className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
    )}
    {...props}
    >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>} param0 */
const SelectScrollDownButton = ({ className, ...props }) => (
    <SelectPrimitive.ScrollDownButton
    className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
    )}
    {...props}
    >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
)
SelectScrollDownButton.displayName =
SelectPrimitive.ScrollDownButton.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.Content>} param0 */
const SelectContent = ({ className, children, position = "popper", ...props }) => (
    <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
      >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
            "p-1",
            position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
        >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)
SelectContent.displayName = SelectPrimitive.Content.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.Label>} param0 */
const SelectLabel = ({ className, ...props }) => (
    <SelectPrimitive.Label
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
    />
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.Item>} param0 */
const SelectItem = ({ className, children, ...props }) => (
    <SelectPrimitive.Item
    className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
    )}
    {...props}
    >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)
SelectItem.displayName = SelectPrimitive.Item.displayName

/**@param {React.ComponentProps<typeof SelectPrimitive.Separator>} param0 */
const SelectSeparator = ({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}