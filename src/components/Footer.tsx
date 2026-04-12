interface FooterProps {
  translations: {
    copyright: string;
    email: string;
  };
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer className="bg-ink px-6 py-8" role="contentinfo">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-display text-lg tracking-tight text-white/80">
          EM Consulting
        </span>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <a
            href={`mailto:${translations.email}`}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {translations.email}
          </a>
          {/* TODO: Add WeChat Official Account link when live */}
          {/* TODO: Add Xiaohongshu link when live */}
        </div>
        <span className="text-sm text-white/30">{translations.copyright}</span>
      </div>
    </footer>
  );
}
