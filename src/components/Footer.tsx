interface FooterProps {
  translations: {
    copyright: string;
    // Single-line locality note ("Based in Philadelphia, PA" / "总部位于
    // 宾夕法尼亚州费城"). A minor trust signal for parents who Google
    // the firm's address; also lets us pass verification from HNW
    // families who expect a discoverable U.S. address even for a
    // remote-first boutique. Stacked below copyright in a sub-column
    // so the wordmark stays the visual anchor of the footer row.
    location: string;
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
          {/* Copyright + location stack to the right. md:items-end keeps
              the locality line flush with the copyright above on wide
              viewports; mobile centers both lines with the wordmark.
              text-white/60 for location (vs /70 copyright) reads as
              secondary metadata rather than equal-weight claim — the
              copyright carries the legal assertion, location is a
              locator. */}
          <div className="flex flex-col items-center gap-1 md:items-end">
            <span className="text-sm text-white/70">
              {translations.copyright}
            </span>
            {translations.location && (
              <span className="text-sm text-white/60 font-chinese">
                {translations.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
