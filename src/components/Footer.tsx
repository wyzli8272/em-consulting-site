interface FooterProps {
  translations: {
    copyright: string;
  };
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer
      className="border-t border-white/[0.08] bg-ink px-6 py-12"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-display text-lg tracking-tight text-white/80">
          EM Consulting
        </span>
        <div className="flex items-center gap-6 text-sm text-white/40">
          {/* TODO: Add WeChat Official Account link when ready */}
          {/* TODO: Add Xiaohongshu link when ready */}
        </div>
        <span className="text-sm text-white/30">{translations.copyright}</span>
      </div>
    </footer>
  );
}
