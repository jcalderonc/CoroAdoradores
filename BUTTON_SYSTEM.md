# Button System Documentation

This document explains the standardized button system used throughout the Coro Adoradores application.

## Overview

The button system provides consistent, accessible, and beautiful buttons across the entire application. It includes multiple variants, sizes, and shapes to accommodate different use cases.

## Components

### 1. Button (`src/components/atoms/Button/Button.jsx`)

The main button component with multiple variants and configurations.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'primary'` | Button style variant |
| `size` | string | `'md'` | Button size |
| `shape` | string | `'rounded'` | Button shape |
| `disabled` | boolean | `false` | Disable the button |
| `loading` | boolean | `false` | Show loading spinner |
| `type` | string | `'button'` | HTML button type |
| `onClick` | function | - | Click handler |
| `className` | string | `''` | Additional CSS classes |

#### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `primary` | Orange background, white text | Main actions, CTAs |
| `secondary` | Transparent with orange border | Secondary actions |
| `outline` | Transparent with gray border | Subtle actions |
| `ghost` | Transparent, no border | Menu items, subtle actions |
| `danger` | Red background | Destructive actions |
| `success` | Green background | Success actions |
| `warning` | Yellow background | Warning actions |
| `info` | Blue background | Informational actions |

#### Sizes

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | `px-3 py-1.5` | `text-sm` | Small buttons, compact UI |
| `md` | `px-4 py-2` | `text-base` | Standard buttons |
| `lg` | `px-6 py-3` | `text-lg` | Large buttons, CTAs |
| `xl` | `px-8 py-4` | `text-xl` | Extra large buttons |

#### Shapes

| Shape | Border Radius | Use Case |
|-------|---------------|----------|
| `rounded` | `rounded-md` | Standard buttons |
| `pill` | `rounded-full` | Modern, friendly buttons |
| `square` | `rounded-none` | Sharp, formal buttons |

### 2. MenuButton (`src/components/atoms/MenuButton/MenuButton.jsx`)

Specialized button for navigation menu items.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button content |
| `href` | string | - | Link destination |
| `active` | boolean | `false` | Active state |
| `onNavigate` | function | - | Navigation handler |
| `variant` | string | `'ghost'` | Button variant |
| `size` | string | `'md'` | Button size |

### 3. IconButton (`src/components/atoms/IconButton/IconButton.jsx`)

Button component optimized for icons.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | ReactNode | - | Icon element |
| `children` | ReactNode | - | Optional text content |
| `variant` | string | `'ghost'` | Button variant |
| `size` | string | `'md'` | Button size |

### 4. ButtonGroup (`src/components/atoms/ButtonGroup/ButtonGroup.jsx`)

Container for grouping related buttons.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button elements |
| `orientation` | string | `'horizontal'` | Layout direction |
| `spacing` | string | `'md'` | Space between buttons |

## Usage Examples

### Basic Button

```jsx
import Button from '../atoms/Button/Button'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Cancel
</Button>

// Loading button
<Button variant="primary" loading={true}>
  Saving...
</Button>
```

### Menu Button

```jsx
import { MenuButton } from '../atoms/MenuButton/MenuButton'

<MenuButton
  href="#home"
  active={selectedPage === "Home"}
  onNavigate={() => setSelectedPage("Home")}
>
  Home
</MenuButton>
```

### Icon Button

```jsx
import IconButton from '../atoms/IconButton/IconButton'

<IconButton
  icon={<svg>...</svg>}
  variant="ghost"
  size="md"
  onClick={handleClick}
>
  Settings
</IconButton>
```

### Button Group

```jsx
import Button from '../atoms/Button/Button'
import ButtonGroup from '../atoms/ButtonGroup/ButtonGroup'

<ButtonGroup spacing="lg">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="danger">Delete</Button>
</ButtonGroup>
```

## Styling Guidelines

### Color Palette

- **Primary**: Orange (`#f97316` / `bg-orange-500`)
- **Secondary**: Orange outline (`border-orange-500`)
- **Success**: Green (`#10b981` / `bg-green-500`)
- **Warning**: Yellow (`#f59e0b` / `bg-yellow-500`)
- **Danger**: Red (`#ef4444` / `bg-red-500`)
- **Info**: Blue (`#3b82f6` / `bg-blue-500`)

### Hover Effects

All buttons include smooth transitions:
- **Transform**: `translateY(-2px)` on hover
- **Shadow**: Enhanced shadow on hover
- **Color**: Darker shade on hover
- **Duration**: `300ms` transition

### Focus States

- **Ring**: `focus:ring-2 focus:ring-orange-500`
- **Offset**: `focus:ring-offset-2`
- **Outline**: `focus:outline-none`

### Disabled States

- **Opacity**: `disabled:opacity-50`
- **Cursor**: `disabled:cursor-not-allowed`
- **No Hover**: Disabled buttons don't respond to hover

## Accessibility

### Keyboard Navigation

- All buttons are focusable with `Tab`
- `Enter` and `Space` keys trigger click
- Focus indicators are clearly visible

### Screen Readers

- Loading state is announced
- Disabled state is communicated
- Button purpose is clear from content

### Color Contrast

- All color combinations meet WCAG AA standards
- Text is always readable on button backgrounds
- Focus indicators have sufficient contrast

## Best Practices

### 1. Use Appropriate Variants

```jsx
// ✅ Good - Clear hierarchy
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>

// ❌ Avoid - Confusing hierarchy
<Button variant="primary">Cancel</Button>
<Button variant="secondary">Save Changes</Button>
```

### 2. Consistent Sizing

```jsx
// ✅ Good - Consistent sizing in groups
<ButtonGroup>
  <Button size="md">Option 1</Button>
  <Button size="md">Option 2</Button>
</ButtonGroup>

// ❌ Avoid - Mixed sizes in groups
<ButtonGroup>
  <Button size="sm">Option 1</Button>
  <Button size="lg">Option 2</Button>
</ButtonGroup>
```

### 3. Loading States

```jsx
// ✅ Good - Show loading state
<Button loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>

// ❌ Avoid - No loading feedback
<Button disabled={isSubmitting}>
  Save
</Button>
```

### 4. Icon Usage

```jsx
// ✅ Good - Icon with text
<IconButton icon={<SaveIcon />}>
  Save
</IconButton>

// ✅ Good - Icon only for compact UI
<IconButton icon={<CloseIcon />} />
```

## Migration Guide

### From Old Button Styles

1. **Replace custom classes** with variant props
2. **Use size props** instead of custom padding
3. **Add loading states** for better UX
4. **Group related buttons** with ButtonGroup

### Before (Old CSS)

```jsx
<button className="btn-primary">
  Click me
</button>
```

### After (New System)

```jsx
<Button variant="primary" size="md">
  Click me
</Button>
```

## Future Enhancements

- [ ] Button animations
- [ ] More shape variants
- [ ] Custom color themes
- [ ] Button tooltips
- [ ] Ripple effects
- [ ] Icon positioning options

## Troubleshooting

### Common Issues

1. **Button not styled correctly**
   - Check if Tailwind CSS is loaded
   - Verify variant/size props are correct

2. **Loading spinner not showing**
   - Ensure `loading={true}` prop is set
   - Check if button is not disabled

3. **Hover effects not working**
   - Verify Tailwind CSS classes are included
   - Check for conflicting CSS

### Debug Mode

Add `data-debug="true"` to see button variant/size in dev tools:

```jsx
<Button variant="primary" size="md" data-debug="true">
  Debug Button
</Button>
```
