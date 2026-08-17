import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from '../src/components/Quiz';
import { dataset } from '../src/data';
import { otherLang, ui } from '../src/lib/i18n';
import type { Lang } from '../src/lib/schema';

/**
 * Single-page build of the app for a shareable preview. Same components and
 * same dataset as the site — only the routing differs, since an artifact is
 * one page and the real site has per-language routes.
 */
function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const t = ui[lang];

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      {dataset.status === 'draft_unverified' && (
        <div className="border-b border-notice-edge bg-notice-bg px-4 py-2.5 text-center text-xs text-notice-ink">
          {t.draftBanner}
        </div>
      )}

      <header className="border-b border-edge">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <span className="font-semibold tracking-tight">{t.siteName}</span>
          <button
            type="button"
            onClick={() => setLang(otherLang(lang))}
            className="rounded-full border border-edge px-3 py-1 text-sm text-ink/60 hover:border-ink/40 hover:text-ink"
          >
            {t.switchLang}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">{t.tagline}</h1>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/65">{t.intro}</p>

        <div className="mt-10 border-t border-edge pt-10">
          {/* Remount on language change so answers reset cleanly with the copy. */}
          <Quiz key={lang} lang={lang} />
        </div>
      </main>

      <footer className="mt-16 border-t border-edge">
        <div className="mx-auto max-w-3xl px-5 py-8 text-xs leading-relaxed text-ink/45">
          <p>{t.privacy}</p>
          <p className="mt-2">
            {dataset.version} — {dataset.updatedAt}
          </p>
        </div>
      </footer>
    </div>
  );
}

const mount = document.getElementById('root');
if (mount) createRoot(mount).render(<App />);
