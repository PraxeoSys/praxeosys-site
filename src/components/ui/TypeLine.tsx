interface TypeLineProps {
  text: string;
  className?: string;
}

/**
 * CSS type-on. The full string is in the server HTML (and in an
 * off-screen copy for assistive tech). The visible mask reveals it.
 * Reduced motion shows the whole line immediately.
 */
export function TypeLine({ text, className }: TypeLineProps) {
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="type-line">
        <span className="invisible">{text}</span>
        <span className="type-mask">
          {text}
          <span className="type-caret" />
        </span>
      </span>
    </p>
  );
}
