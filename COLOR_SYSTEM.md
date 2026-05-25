# Budget+ Color System & Design Tokens

## CSS Custom Properties (Root Variables)

All colors are defined as CSS variables in `app/globals.css` for easy customization.

### Primary Colors

```css
--primary: #6366f1        /* Indigo - Main brand color */
--primary-light: #818cf8  /* Light Indigo - Hover states */
--primary-dark: #4f46e5   /* Dark Indigo - Active states */
```

### Accent Colors

```css
--accent-pink: #ec4899    /* Pink - Secondary brand */
--accent-purple: #a855f7  /* Purple - Gradients */
--accent-blue: #3b82f6    /* Blue - Links & accents */
```

### Neutral Colors (Complete Grayscale)

```css
--white: #ffffff          /* Pure white */
--neutral-50: #fafafa     /* Almost white - Backgrounds */
--neutral-100: #f3f4f6    /* Light gray - Card backgrounds */
--neutral-200: #e5e7eb    /* Light border color */
--neutral-300: #d1d5db    /* Input borders */
--neutral-400: #9ca3af    /* Disabled text */
--neutral-500: #6b7280    /* Secondary text/labels */
--neutral-600: #4b5563    /* Body text */
--neutral-700: #374151    /* Headings */
--neutral-800: #1f2937    /* Dark text */
--neutral-900: #111827    /* Almost black */
```

### Semantic Colors

```css
--success: #10b981        /* Green - Success states */
--warning: #f59e0b        /* Amber - Warning states */
--danger: #ef4444         /* Red - Danger/Error states */
```

### Shadow System

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15)
```

## Color Usage Guide

### Buttons
- **Primary**: Gradient (indigo → purple)
  ```css
  background: linear-gradient(135deg, var(--primary), var(--accent-purple))
  ```
- **Hover**: Darker gradient with elevation
- **Active**: Immediate feedback with transform

### Cards
- **Background**: White
- **Border**: Subtle neutral-100
- **Shadow**: Medium shadow on hover, large on active
- **Accent**: Gradient top border animation

### Stat Cards
- **Income**: Green (#10b981)
- **Expense**: Red (#ef4444)
- **Balance**: Indigo (#6366f1)
- **Budget**: Amber (#f59e0b)
- **Background**: Soft white → neutral-50 gradient

### Form Elements
- **Input Background**: Neutral-50 (default), White (focused)
- **Input Border**: Neutral-200 (default), Primary (focused)
- **Label**: Neutral-700
- **Placeholder**: Neutral-400

### Text Hierarchy
- **Headings**: Neutral-900
- **Body**: Neutral-600 to Neutral-700
- **Secondary**: Neutral-500
- **Muted**: Neutral-400

### Semantic States
- **Success**: Green gradient backgrounds with success color border
- **Warning**: Amber gradient backgrounds with warning color border
- **Danger**: Red gradient backgrounds with danger color border
- **Info**: Blue/Indigo gradient backgrounds with primary border

## Gradient Definitions

### Button Gradient
```css
linear-gradient(135deg, #6366f1 0%, #a855f7 100%)
```

### Background Gradient
```css
linear-gradient(135deg, #f0f4ff 0%, #f8f1ff 100%)
```

### Card Gradient (on hover top border)
```css
linear-gradient(90deg, transparent, #6366f1, transparent)
```

### Alert Gradients
- **Info**: `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))`
- **Success**: `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))`
- **Danger**: `linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))`

## Component Color Mappings

### Sidebar
- **Background**: White
- **Text**: Neutral-600
- **Logo**: Primary gradient text
- **Link Hover**: Neutral-100 background, Primary text
- **Border**: Neutral-100

### Badges
- **Success Badge**: Green gradient with white text
- **Danger Badge**: Red gradient with white text
- **Primary Badge**: Indigo gradient with white text
- **Info Badge**: Blue gradient with white text

### Tables
- **Header Background**: Neutral-50 → Neutral-100 gradient
- **Header Text**: Neutral-700
- **Row Hover**: Neutral-50 background
- **Border**: Neutral-100

## Usage in Code

### CSS
```css
/* Use variables in selectors */
background: var(--primary);
color: var(--neutral-700);
box-shadow: var(--shadow-lg);
border: 1px solid var(--neutral-200);
```

### Inline Styles (React)
```jsx
style={{
  backgroundColor: 'var(--primary)',
  color: 'var(--neutral-700)',
  boxShadow: 'var(--shadow-lg)'
}}
```

### Bootstrap Integration
- Custom CSS enhances Bootstrap classes
- Bootstrap utilities work alongside custom styles
- No conflicts with Bootstrap variables
- Responsive breakpoints aligned with Bootstrap

## Customization Guide

To change the theme colors, update the root variables in `app/globals.css`:

```css
:root {
  --primary: #your-color;
  --primary-light: #lighter-shade;
  --primary-dark: #darker-shade;
  /* ... update other colors */
}
```

All components using these variables will automatically update.

## Accessibility Considerations

- **Contrast Ratios**: All text meets WCAG AA standards
- **Color Meaning**: Color is never the only indicator
- **Text Alternatives**: Icons paired with text labels
- **Focus States**: All interactive elements have visible focus indicators
- **Semantic HTML**: Proper heading hierarchy maintained

## Design Token Updates

When updating the design system:
1. Update CSS variables in `:root`
2. Ensure all contrast ratios are ≥ 4.5:1 for text
3. Test button gradients for readability
4. Verify shadow depths for visual hierarchy
5. Update this documentation

---

**Color System Version:** 1.0.0
**Bootstrap Compatibility:** 5.3.8+
**Last Updated:** 2026
