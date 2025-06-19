import React from 'react';

/**
 * Layout for search results pages
 * Wraps the search page component with any layout elements
 * @param props.children - The page component that will be rendered
 */
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}