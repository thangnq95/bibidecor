interface BreadcrumbProps {
  items: string[];
  className?: string;
}

export function Breadcrumb({ items, className = 'idea-breadcrumb' }: BreadcrumbProps) {
  const visibleItems = items.filter(Boolean);

  if (!visibleItems.length) return null;

  return (
    <nav className={className} aria-label="Breadcrumb">
      {visibleItems.map((item, index) => (
        <span key={`${item}-${index}`}>
          {index > 0 ? <span className={`${className}__sep`}>/</span> : null}
          {item}
        </span>
      ))}
    </nav>
  );
}

