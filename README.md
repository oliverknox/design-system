# Design System

A modern React component library built with TypeScript, providing reusable UI components with consistent design patterns.

## Architecture

The design system follows an atomic design methodology with the following structure:

- **Tokens**: Design primitives (colors, typography, spacing) that form the foundation of the design language
  - Implemented as CSS custom properties for consistent theming across components
  - Organized by category (colors.css, typography.css, spacing.css) for maintainability
  - Consumed by all other layers to ensure design consistency

- **Atoms**: Basic building blocks (buttons, inputs, icons) that are self-contained
  - Each atom is composed of a React component that applies token values
  - Atoms have no dependencies on other components, only on tokens
  - Fully encapsulated with their own styling and behavior

- **Molecules**: Combinations of atoms (form fields, cards) forming more complex components
  - Composed of multiple atoms to create cohesive functionality
  - Maintain their own state and behavior while leveraging atom functionality

- **Organisms**: Complex UI patterns that combine molecules and atoms
  - Represent complete interface sections with business logic
  - Integrate with application state and data flow

The architecture implements a unidirectional dependency flow, where higher-level components (organisms) can import and use lower-level components (molecules, atoms), but never the reverse. This ensures a clean dependency graph and prevents circular dependencies.

## Getting Started

```bash
# Install dependencies
pnpm install
# Install Playwright browsers for Storybook tests
pnpm exec playwright install --with-deps

# Start Storybook development server
pnpm storybook
```

## Available Commands

- `pnpm dev` - Start Vite development server
- `pnpm build` - Build the library for production
- `pnpm lint` - Run ESLint checks
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm prettier` - Check code formatting
- `pnpm prettier:fix` - Fix code formatting
- `pnpm test` - Run Vitest tests
- `pnpm test:ui` - Run tests with UI
- `pnpm test:watch` - Run tests in watch mode
- `pnpm storybook` - Start Storybook development server
- `pnpm storybook:build` - Build Storybook for production

## Coding Style and Conventions

- **TypeScript**: Strong typing with extensive interfaces for all components and utilities
  - Component props defined in dedicated interface files for better reusability
  - Type exports for consumer applications to leverage type safety
  - Strict TypeScript configuration ensuring type safety throughout

- **Naming Conventions**:
  - Component names use PascalCase (Button, TextField)
  - File names use lowercase with feature-first organization (button.tsx)
  - CSS modules use feature.module.css naming (button.module.css)
  - Interfaces are exported from dedicated files (button.interfaces.ts)
  - Utility functions use camelCase (formatDate, validateInput)

- **Component Organization**:
  - Each component has its own directory under the appropriate category
  - Component implementation in feature.tsx
  - Type definitions in feature.interfaces.ts
  - Styles in feature.module.css with CSS Modules for scoping
  - Tests in feature.test.tsx with Vitest and React Testing Library
  - Stories in feature.stories.tsx with complete documentation

- **CSS Modules**:
  - Local scoping with generated class names
  - camelCase convention for accessing class names in code
  - Design tokens used for consistent styling across components

## Build System

The package is built using a sophisticated Vite-based system that:

- **Bundles Component Library**: 
  - Compiles TypeScript to JavaScript using the tsconfig.app.json configuration
  - Generates both ESM (.esm.js) and CommonJS (.cjs.js) formats for maximum compatibility
  - Creates TypeScript declaration files (.d.ts) using vite-plugin-dts with rollup type bundling
  - Extracts and bundles CSS into a single index.css file while preserving CSS Modules functionality

- **Configuration Files**:
  - **tsconfig.json**: Base TypeScript configuration extended by other configs
  - **tsconfig.app.json**: Component library configuration for the build process
  - **tsconfig.node.json**: Specific configuration for build tooling (Vite config)
    - Targets modern JavaScript (ES2023)
    - Uses bundler module resolution for compatibility with Vite
    - Enables strict type checking and unused code detection
    - Specifically configured for build scripts, not component code

- **Optimizes for Consumption**:
  - Externalization of React and React DOM to avoid duplicate installations
  - CSS code splitting disabled to provide a single CSS entry point
  - Asset file naming optimized for predictable imports
  - Path aliases (@/) resolved during build for clean consumer imports

- **Testing Integration**:
  - Configured for dual testing environments:
    - JSDOM for standard component tests
    - Browser-based testing with Playwright for Storybook integration tests
  - Supports comprehensive test coverage reporting via Vitest

- **Storybook Integration**:
  - Design tokens (colors, typography, spacing) must be imported in `.storybook/preview.tsx`
  - Components in Storybook automatically receive the design token context
  - React StrictMode enabled for all stories to ensure component compatibility

The build output is structured according to package.json exports field, enabling consumers to import the library through various module systems while maintaining type safety.

## Consuming the Library

### Installation

```bash
npm install @oliverknox/design-system
# or
yarn add @oliverknox/design-system
# or
pnpm add @oliverknox/design-system
```

### Usage

1. Import the CSS file in your application entry point:

```tsx
// In your main entry file (e.g., App.tsx, index.tsx)
import '@oliverknox/design-system/index.css';
```

2. Import and use components with their enums:

```tsx
import { Button, ButtonVariant, ButtonSize } from '@oliverknox/design-system';

const MyComponent: React.FC = () => {
  return (
    <Button 
      label="Click Me"
      variant={ButtonVariant.POSITIVE}
      size={ButtonSize.MEDIUM}
      onClick={() => console.log('Clicked!')}
    />
  );
};
```



### Examining the Distribution

After building, the `dist` folder contains:

- `index.esm.js` - ES modules version
- `index.cjs.js` - CommonJS version
- `index.d.ts` - TypeScript declarations
- `index.css` - Combined CSS including tokens and component styles

## Publishing

This library is published to npm using GitHub Actions when a new release is created.

### Publishing Process

1. Update the version in `package.json` using semantic versioning

   ```bash
   # For patch updates (bug fixes)
   pnpm version patch

   # For minor updates (new features, backward compatible)
   pnpm version minor

   # For major updates (breaking changes)
   pnpm version major
   ```

2. Push changes to GitHub including the version tag

   ```bash
   git push --follow-tags
   ```

3. Create a new release on GitHub
   - Go to the repository's Releases page
   - Click "Draft a new release"
   - Select the version tag (should match package.json version)
   - Add release notes describing the changes
   - Publish the release

4. The GitHub Actions workflow will automatically:
   - Verify the tag version matches package.json version
   - Install dependencies
   - Run tests
   - Build the package
   - Publish to npm registry
