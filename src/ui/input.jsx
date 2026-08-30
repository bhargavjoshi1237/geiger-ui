import * as React from "react"

import { cn } from "../lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Box geometry comes from the shared --input-box-* tokens (tokens.css)
        // so every field in the suite lines up; fallbacks keep it sane if an
        // app hasn't picked up the tokens yet.
        //
        // Padding is set WITHOUT !important on purpose. The earlier !important
        // here silently dropped pl-*/pr-* utilities on every adornment input in
        // the suite (icon inputs, search, currency-prefixed price fields), so
        // icons sat on top of the placeholder. The tokens still provide the
        // default, but consumers can now reserve gutter space with a plain
        // pl-8 / pr-8 when they need to. h-auto and rounded stay !important
        // because the suite-wide shape and minimum height are not negotiable.
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input !h-auto w-full min-w-0 !rounded-[var(--input-box-radius,0.375rem)] border bg-background px-[var(--input-box-padding-x,0.75rem)] py-[var(--input-box-padding-y,0.5rem)] text-base leading-5 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
