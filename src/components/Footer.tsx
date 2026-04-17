interface FooterProps {
  translations: {
    copyright: string;
  };
}

export default function Footer({ translations }: FooterProps) {
  return (
    // The <footer> element is implicitly role="contentinfo" when scoped to
    // <body>, so the explicit attribute is redundant and can trip duplicate-
    // landmark warnings in some audit tools.
    <footer className="border-t border-white/[0.08] bg-ink px-6 py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8">
        {/* Accent rule closes the page with the same gold signature used under
            every section tag — so the end-of-page reads as a branded artifact
            rather than a trailing footer strip. */}
        <div className="accent-rule" aria-hidden="true" />
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-display text-lg tracking-tight text-white/90">
            EM Consulting
          </span>
          <span className="text-sm text-white/70">
            {translations.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
