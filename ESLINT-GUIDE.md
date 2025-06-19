# ESLint Fixing Guide

This document provides a step-by-step approach to fix the ESLint issues in your project.

## Quick Fix

To automatically fix many of the issues:

```bash
bun run fix-lint
```

This will run ESLint with the `--fix` flag and fix many common issues like:

- Quotes (double → single)
- Missing semicolons
- Indentation
- Trailing commas
- Import order (partially)

## Manual Fixes Required

Some issues need manual intervention:

### 1. Console Statements

Search for `console.log` statements and replace with proper error handling:

```typescript
// Before
console.log("Fetching data...");

// After - remove entirely or replace with
console.error("Error fetching data:", error);
```

### 2. React Hook Dependencies

Fix useEffect dependency arrays:

```typescript
// Before
useEffect(() => {
  fetchData();
}, []);

// After
useEffect(() => {
  fetchData();
}, [fetchData]); // Add all dependencies
```

### 3. Type 'any'

Replace any types with more specific types:

```typescript
// Before
const data: any = { name: "Movie" };

// After
interface MovieData {
  name: string;
}
const data: MovieData = { name: "Movie" };
```

### 4. Non-null Assertions

Replace non-null assertions with proper null checks:

```typescript
// Before
const title = movie!.title;

// After
const title = movie ? movie.title : "No title";
// or
if (!movie) return null;
const title = movie.title;
```

### 5. Image Tags

Replace HTML img tags with Next.js Image component:

```tsx
// Before
<img src={src} alt={alt} />;

// After
import Image from "next/image";

<Image src={src} alt={alt} width={300} height={200} layout="responsive" />;
```

### 6. Import Order

Organize imports in this order:

1. React
2. Next.js
3. External libs
4. Internal modules
5. CSS/Assets

```typescript
// Correct order
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Movie } from "@/types/movie";
import { useFetch } from "@/hooks/useFetch";
import styles from "./component.module.css";
```

## File-by-File Approach

Tackle files in this order:

1. Utility functions (`src/app/utils/tmdb.ts`)
2. Type definitions (`src/types/movie.ts`)
3. Hooks (`src/hooks/usePagination.ts`, `src/hooks/useFetch.ts`)
4. Stores (`src/stores/useMovieStore.ts`)
5. Components (`src/components/*`)
6. Pages (`src/app/*`)

## VSCode Autofix

Set up VSCode to autofix on save:

1. Create `.vscode/settings.json` (if not exists):

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

2. Restart VSCode

## Prevent Future Issues

1. Add a pre-commit hook with Husky to lint staged files
2. Document coding standards for your team
3. Consider Prettier for consistent formatting

## Common Patterns to Fix

### Indentation

- Use 2 spaces consistently
- No mixed tabs/spaces

### Quotes

- Single quotes for strings
- No template literals for simple strings

### Semicolons

- Always use semicolons at the end of statements

### Trailing Commas

- Always add trailing commas in multiline objects/arrays

### React Components

- Use function components with explicit return types
- Self-close empty elements

Hope this helps you clean up your codebase!
