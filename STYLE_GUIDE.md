# Portfolio Website - Style Guide & Design System

## Color Palette

### Primary Colors
- **Deep Navy** (`#0D1117`) - Main background (dark mode)
- **Slate Gray** (`#1E293B`) - Secondary background, cards (dark mode)
- **Teal Accent** (`#14B8A6`) - Primary CTA, links, highlights
- **Soft White** (`#F8FAFC`) - Text, background (light mode)

### Color Usage
```css
--background-color: #F8FAFC (light) / #0D1117 (dark)
--text-color: #1E293B (light) / #F8FAFC (dark)
--main-color: #14B8A6
--secondary-color: #0D1117 (light) / #1E293B (dark)
--hover-color: #0D9488
--card-bg: #FFFFFF (light) / #1E293B (dark)
--card-border: #E2E8F0 (light) / #334155 (dark)
```

## Typography

### Font Family
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Clean, modern sans-serif for excellent readability

### Font Sizes
- **Hero Title**: `clamp(2.5rem, 6vw, 4.5rem)` - Large, impactful
- **Section Titles**: `clamp(2rem, 5vw, 3rem)` - Clear hierarchy
- **Subtitle**: `clamp(1.1rem, 3vw, 1.5rem)` - Supporting text
- **Body**: `1rem - 1.1rem` - Readable paragraphs
- **Small**: `0.85rem - 0.95rem` - Badges, labels

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semi-Bold**: 600
- **Bold**: 700
- **Extra Bold**: 800

## Spacing System

```css
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 1.5rem (24px)
--spacing-lg: 2rem (32px)
--spacing-xl: 3rem (48px)
--spacing-2xl: 4rem (64px)
```

## Border Radius

```css
--radius-sm: 0.5rem (8px) - Small elements
--radius-md: 0.75rem (12px) - Buttons, inputs
--radius-lg: 1rem (16px) - Cards
--radius-full: 9999px - Circular elements, pills
```

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

Dark mode shadows are more pronounced (higher alpha values).

## Transitions

```css
--transition-fast: 0.15s ease
--transition-normal: 0.3s ease
--transition-slow: 0.5s ease
```

## Component Styles

### Buttons

**Primary Button**
- Background: `var(--main-color)`
- Color: `var(--button-text-color)`
- Padding: `1rem 2.5rem`
- Border Radius: `var(--radius-md)`
- Hover: Lift up 2px, darker background, enhanced shadow

**Secondary Button**
- Background: `transparent`
- Border: `2px solid var(--main-color)`
- Color: `var(--main-color)`
- Hover: Fill with main color, lift up

### Cards

**Project Cards**
- Background: `var(--card-bg)`
- Border: `1px solid var(--card-border)`
- Border Radius: `var(--radius-lg)`
- Shadow: `var(--shadow-md)`
- Hover: `translateY(-8px)`, enhanced shadow, border color changes to accent

### Badges

**Tech Stack / Skill Pills**
- Background: `var(--main-color)` or transparent with border in dark mode
- Color: `var(--button-text-color)`
- Padding: `0.4rem 0.9rem` to `0.6rem 1.2rem`
- Border Radius: `var(--radius-full)`
- Hover: Lift up 2-3px, enhanced shadow

### Form Elements

**Inputs & Textareas**
- Background: `var(--background-color)`
- Border: `2px solid var(--card-border)`
- Border Radius: `var(--radius-md)`
- Padding: `0.9rem 1rem`
- Focus: Border color changes to `var(--main-color)`, subtle glow

## Animations & Micro-interactions

### Hover Effects
- **Cards**: `transform: translateY(-8px)` + enhanced shadow
- **Buttons**: `transform: translateY(-2px)` + color change
- **Images**: `transform: scale(1.05)` or `scale(1.1)`
- **Links**: Underline animation from left to right

### Page Load
- **Hero Section**: Fade in from bottom (`fadeInUp`)
- **Profile Image**: Subtle float animation (3s infinite)
- **Particles**: Smooth movement with connection lines

### Transitions
- All interactive elements use `var(--transition-fast)` or `var(--transition-normal)`
- Smooth scroll enabled globally

## Layout Structure

### Hero Section
- Full viewport height (`100vh`)
- Centered content with animated background
- Circular avatar with teal border glow
- Two-button CTA (primary + secondary)

### Projects Section
- Grid layout: `repeat(auto-fit, minmax(320px, 1fr))`
- Cards with image preview on top
- Tech stack badges in card content
- Action buttons at bottom

### About Section
- Two-column grid: `1fr 2fr` (image | content)
- Circular avatar image
- Skills displayed as modern pill badges
- Stats displayed in 3-column grid

### Navbar
- Fixed position at top
- Backdrop blur for modern feel
- Links with hover underline animation
- Mobile: Slide-in side menu from right

### Footer
- Centered layout
- Social icons with hover lift effect
- Back-to-top floating button (bottom-right)

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop Small */
@media (max-width: 968px) { ... }

/* Desktop Large */
@media (min-width: 1200px) { ... }
```

### Responsive Behavior

**Mobile (< 768px)**
- Stack all sections vertically
- Hamburger menu replaces horizontal nav
- Single column layouts
- Reduced padding and font sizes
- Touch-friendly button sizes

**Tablet (768px - 968px)**
- 2-column grids where appropriate
- Maintained card layouts
- Adjusted spacing

**Desktop (> 968px)**
- Full multi-column layouts
- Maximum widths for readability
- Enhanced hover effects

## Dark/Light Mode Toggle

All components support theme switching via `data-theme` attribute:
- Automatically adjusts colors using CSS variables
- Smooth transitions between themes
- Maintains contrast ratios for accessibility

## Best Practices

1. **Consistency**: Use CSS variables for all colors, spacing, and transitions
2. **Performance**: Use `transform` and `opacity` for animations
3. **Accessibility**: Maintain 4.5:1 contrast ratio, keyboard navigation
4. **Mobile-First**: Design for small screens, enhance for large
5. **Semantic HTML**: Use appropriate tags for SEO and accessibility
6. **Smooth Scroll**: Enable globally for better UX

## File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & CSS variables
│   └── page.tsx              # Main page component
├── components/
│   └── AnimatedBackground/   # Particle animation
├── layouts/
│   ├── Main/                 # Hero section
│   ├── About/                # About section with skills
│   ├── Projects/             # Project cards
│   ├── Navbar/               # Navigation
│   ├── Contact/              # Contact form
│   └── Footer/               # Footer with social links
└── context/
    ├── ThemeContext.tsx      # Dark/light mode
    └── LanguageContext.tsx   # i18n support
```
