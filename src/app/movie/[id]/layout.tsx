import React from 'react';

/**
 * Layout for movie detail pages
 * Wraps the movie page component with any layout elements
 * @param props.children - The page component that will be rendered
 */
export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}