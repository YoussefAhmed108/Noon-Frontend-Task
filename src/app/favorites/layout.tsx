import React from 'react';

/**
 * Layout for favorites page
 * Wraps the favorites page component with any layout elements
 * @param props.children - The page component that will be rendered
 */
export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}