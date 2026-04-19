interface FooterProps {
  translations: {
    copyright: string;
  };
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.08] bg-ink px-6 py-14">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8">
        {/* Round 7 Brand Guardian M2: dropped the gold accent-rule that
            used to sit above the wordmark. The rule was stacking with
            the top border (`border-t border-white/[0.08]`) in ~32 px of
            vertical space and reading as two dividers instead of one
            closing gesture. Accent-rules elsewhere on the page live
            directly under section-tags as section-openers; putting one
            here without a tag above it broke that semantic. The top
            border alone now closes the page cleanly. */}
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-display text-xl tracking-tight text-white">
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
