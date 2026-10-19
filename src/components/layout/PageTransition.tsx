import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Crossfades route changes. This Next.js version turns the component on via
 * `experimental.viewTransition` (see next.config.ts). Browsers without the
 * API render the next page with no animation.
 *
 * The class name `page` is the view-transition-class targeted in globals.css.
 * Fades stay on under reduced motion; only the duration shortens.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="page">
      {children}
    </ViewTransition>
  );
}
