import { useEffect, useMemo, useRef, useState } from 'react';

export function FloatingMascot({
  mascotSrc,
  suggestions = [],
  menuItems = [],
  defaultOpen = true,
  ariaLabel = 'Open decor assistant',
  backToTopLabel = 'Back to top',
  dismissLabel = 'Hide suggestion',
  closeLabel = 'Close assistant',
  onAction,
}: any) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('bibidecor-mascot-dismissed') === '1';
  });
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeSuggestion = useMemo(() => {
    if (!suggestions.length) return '';
    return suggestions[suggestionIndex % suggestions.length];
  }, [suggestions, suggestionIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (dismissed) {
        window.localStorage.setItem('bibidecor-mascot-dismissed', '1');
      } else {
        window.localStorage.removeItem('bibidecor-mascot-dismissed');
      }
    } catch {
      // Ignore storage errors.
    }
  }, [dismissed]);

  useEffect(() => {
    setSuggestionIndex(0);
  }, [suggestions]);

  useEffect(() => {
    if (suggestions.length <= 1) return undefined;

    let active = true;
    let delayTimer = window.setTimeout(function scheduleCycle() {
      if (!active) return;

      const nextDelay = 5000 + Math.floor(Math.random() * 2000);
      delayTimer = window.setTimeout(() => {
        if (!active) return;
        setIsTransitioning(true);

        const fadeTimer = window.setTimeout(() => {
          if (!active) return;
          setSuggestionIndex((value) => (value + 1) % suggestions.length);
          setIsTransitioning(false);
          scheduleCycle();
        }, 240);

        if (!active) {
          window.clearTimeout(fadeTimer);
        }
      }, nextDelay);
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(delayTimer);
    };
  }, [suggestions]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen]);

  const handleDismiss = () => {
    setDismissed(true);
    setMenuOpen(false);
  };

  const handleMascotClick = () => {
    setMenuOpen((value) => !value);
  };

  const handleBackToTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuItem = (item) => {
    setMenuOpen(false);
    onAction?.(item.id);
  };

  const showSpeechBubble = defaultOpen && !dismissed && !menuOpen && suggestions.length > 0;

  return (
    <div ref={rootRef} className={`floating-mascot ${menuOpen ? 'is-open' : ''}`}>
      {showSpeechBubble ? (
        <div className={`floating-mascot__speech ${isTransitioning ? 'is-fading' : ''}`} role="status" aria-live="polite">
          <span className="floating-mascot__speech-text">{activeSuggestion}</span>
          <button type="button" className="floating-mascot__speech-close" onClick={handleDismiss} aria-label={dismissLabel}>
            ✕
          </button>
        </div>
      ) : null}

      <div className="floating-mascot__menu glass" aria-hidden={!menuOpen}>
        <div className="floating-mascot__menu-head">
          <span>Trợ lý Bì Bì</span>
          <button type="button" className="floating-mascot__menu-close" onClick={() => setMenuOpen(false)} aria-label={closeLabel}>
            ✕
          </button>
        </div>

        <div className="floating-mascot__menu-list">
          {menuItems.map((item) => (
            <button key={item.id} type="button" className="floating-mascot__menu-item" onClick={() => handleMenuItem(item)}>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>

      <div className="floating-mascot__actions">
        <button type="button" className="floating-mascot__button glass" onClick={handleMascotClick} aria-label={ariaLabel}>
          <img src={mascotSrc} alt="" aria-hidden="true" loading="eager" decoding="async" />
        </button>

        <button type="button" className="floating-mascot__top glass" onClick={handleBackToTop} aria-label={backToTopLabel}>
          ↑
        </button>
      </div>
    </div>
  );
}
