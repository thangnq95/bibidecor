export function Icon({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'search':
      return (
        <svg width="18" height="18" {...common}>
          <circle cx="11" cy="11" r="6.8" />
          <path d="m16.6 16.6 3.2 3.2" />
        </svg>
      );
    case 'menu':
      return (
        <svg width="20" height="20" {...common}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      );
    case 'heart':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.5L12 21.35Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'profile':
      return (
        <svg width="18" height="18" {...common}>
          <circle cx="12" cy="8" r="3.3" />
          <path d="M5.5 19.2c1.2-3 3.6-4.7 6.5-4.7s5.3 1.7 6.5 4.7" />
        </svg>
      );
    case 'bell':
      return (
        <svg width="18" height="18" {...common}>
          <path d="M6 8a6 6 0 1 1 12 0c0 2.8.7 4.2 1.6 5.3.2.2.3.6.3 1H4.1c0-.4.1-.7.3-1C5.3 12.2 6 10.8 6 8Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </svg>
      );
    case 'home':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m4 11 8-7 8 7" />
          <path d="M6 10.8V19h12v-8.2" />
        </svg>
      );
    case 'plus':
      return (
        <svg width="18" height="18" {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m13 5-6 7 6 7" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m11 5 6 7-6 7" />
        </svg>
      );
    case 'share':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M17 3a4 4 0 1 0 0 8 3.97 3.97 0 0 0 2.21-.67l-7.48 4.24A4.01 4.01 0 0 0 8 13.1a4 4 0 1 0 0 7.9 4.01 4.01 0 0 0 3.73-2.53l7.49 4.23A4 4 0 1 0 20 20a3.97 3.97 0 0 0-2.21.67l-7.49-4.23A4.01 4.01 0 0 0 12 12c0-.15-.01-.3-.03-.45l7.49-4.24A4 4 0 0 0 20 7a4 4 0 0 0-3-4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'bookmark':
      return (
        <svg width="18" height="18" {...common}>
          <path d="M7 4.5h10v15l-5-3-5 3z" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m12 2 1.1 4.2L17 7.3l-3.9 1.1L12 12l-1.1-3.6L7 7.3l3.9-1.1z" />
          <path d="M4 14l.7 2.3L7 17l-2.3.7L4 20l-.7-2.3L1 17l2.3-.7z" />
        </svg>
      );
    case 'cart':
    case 'wishlist':
      return (
        <svg width="18" height="18" {...common}>
          <path d="M12 21s-7-4.8-9-9.2C1.4 8.8 3.1 5.5 6.7 5.5c1.9 0 3.3 1.1 4.3 2.3 1-1.2 2.4-2.3 4.3-2.3 3.6 0 5.3 3.3 3.7 6.3C19 16.2 12 21 12 21Z" />
        </svg>
      );
    case 'arrow-up-right':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m7 17 10-10" />
          <path d="M9 7h8v8" />
        </svg>
      );
    case 'close':
      return (
        <svg width="18" height="18" {...common}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14.5 7.5H17V4h-2.5C11.9 4 10 5.9 10 8.5V11H7v3h3v6h3v-6h3l.7-3H13v-2.5c0-.6.4-1 1-1Z"
            fill="currentColor"
          />
        </svg>
      );
    case 'tiktok':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15.8 3c.4 2.7 2.1 4.5 4.7 4.7v3.2c-1.6.1-3.1-.4-4.7-1.2v5.7c0 3.4-2.7 6.2-6 6.2s-6-2.7-6-6 2.7-6 6-6c.4 0 .8 0 1.2.1v3.4c-.4-.1-.8-.2-1.2-.2-1.5 0-2.8 1.2-2.8 2.7 0 1.6 1.3 2.9 2.8 2.9 1.7 0 3-1.4 3-3.1V3h3Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}
