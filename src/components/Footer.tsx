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
        <span className="font-display text-lg tracking-tight text-white/90">
          EM Consulting
        </span>
        <span className="text-sm text-white/65">
          {translations.copyright}
        </span>
        {/* TODO: Add WeChat Official Account link when ready */}
        {/* TODO: Add Xiaohongshu link when ready */}
      </div>
    </footer>
  );
}
