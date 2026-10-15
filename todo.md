# Task: Implement Graduation Travel & Parking Guide Page

## 1. Objective

Implement the `GuidePage` for the graduation invitation website using React, TypeScript, and Tailwind CSS.

The page must contain **three main sections in this exact order**:

1. **Sơ đồ tổng quan** – displays overview map images of the university.
2. **Xe máy** – displays numbered travel/parking instructions and a video guide.
3. **Xe công nghệ** – displays numbered instructions and images of two entrances with their corresponding Google Maps links.

Inspect the existing project structure, routes, components, dependencies, and styles before implementing the page. Preserve the current visual identity and avoid modifying unrelated pages.

## 2. Design System

Follow the existing graduation invitation theme:

- Cream background: `#FFF9F0`
- Primary burgundy: `#A83242`
- Dark burgundy: `#742936`
- Champagne gold: `#D8B66A`
- Blush beige: `#F1DFD6`
- Secondary text: `#76665C`

Keep the design elegant, warm, and consistent with the paper invitation aesthetic.

Important layout requirements:
- The page must grow vertically according to its content.
- Do not force all sections into a fixed-height container.
- Retain the subtle paper border and shadow where appropriate.
- Ensure the page is responsive on mobile and desktop.
- Separate the three sections visually using spacing, thin gold dividers, or subtle headings.

## 3. Section One: Sơ đồ tổng quan

This section must appear at the very top of the content, before the two transportation tabs.

Purpose: show overview maps of the university campus so guests can understand the general layout before choosing a travel method.

Requirements:
- Add a section heading: `Sơ đồ tổng quan`.
- Support multiple map images through a configurable data array.
- Each map item should support:
  - Unique ID
  - Image URL
  - Short label or description, if needed
  - Optional image alternative text
- Display the maps clearly, with enough space to inspect road layouts, campus buildings, entrances, and relevant areas.
- Preserve image aspect ratios using appropriate `object-fit` behavior.
- Make images responsive and prevent horizontal overflow.
- Allow guests to click a map image to view it larger using the existing image-modal component if one is available in the project.
- Do not add unnecessary captions or descriptive text if it does not help users understand the map.
- If no image URL has been configured, show a restrained placeholder instead of a broken image.
- Do not invent actual campus maps or image URLs.

Layout:
- On mobile, stack map images vertically or use a horizontal gallery when that improves map readability.
- On desktop, use a responsive grid or gallery based on the number and aspect ratios of the images.
- Avoid shrinking detailed maps so much that they become unreadable.

## 4. Section Two: Transportation Tabs

Below `Sơ đồ tổng quan`, render two tabs:

- `Xe máy`
- `Xe công nghệ`

The tabs must switch the content displayed beneath them. Keep the overview map section visible regardless of which tab is selected.

Use semantic tab controls and appropriate ARIA attributes. Ensure keyboard navigation and visible focus states.

## 5. Tab: Xe máy

Display a configurable list of numbered travel and parking instructions.

Each instruction should support:
- Step number, generated from its order in the array
- Short heading
- Description
- Optional image

At the bottom of this tab, add a section for the parking instruction video.

Video requirements:
- Support a configurable video URL.
- Reuse the project's existing video/embed approach if available.
- If no URL has been provided, show a placeholder that can be configured later.
- Use a responsive video container.
- Do not invent video URLs or real-world directions.

## 6. Tab: Xe công nghệ

Display a configurable list of numbered instructions.

At the bottom, display two entrance cards:

- `Cổng 1`
- `Cổng 2`

Each card must support:
- Entrance label
- Image URL
- Corresponding Google Maps URL
- Button to open the map in a new tab
- Button to copy the map URL

Requirements:
- Open external map links using `target="_blank"` and `rel="noopener noreferrer"`.
- Use the Clipboard API to copy map links.
- Display brief feedback after copying.
- Handle missing image URLs and map URLs gracefully.
- Keep both cards visually consistent.
- Stack the cards on mobile and display them side by side on sufficiently wide screens.
- Do not invent entrance images or map URLs.

## 7. Data and Configuration

Separate editable content from presentation where practical. Follow the existing project conventions; a suitable location might be `src/data/guide.ts`.

Define TypeScript interfaces for the map images, instruction steps, and entrance information. For example:

```ts
interface OverviewMap {
  id: string;
  imageUrl: string;
  alt: string;
  label?: string;
}

interface GuideStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface EntranceGuide {
  id: string;
  label: string;
  imageUrl?: string;
  mapUrl?: string;
}
```

Keep these data groups separate:
- Overview campus maps
- Motorcycle instructions
- Motorcycle video URL
- Ride-hailing instructions
- Entrance 1 and Entrance 2 image/map configuration

Generate step numbers automatically from array order. Do not use `any`. Do not fabricate event information.

## 8. Implementation Constraints

- Preserve existing routing and page behavior.
- Reuse existing modal, icon, and UI components where practical.
- Do not install unnecessary dependencies.
- Do not add a backend or database.
- Do not modify unrelated pages.
- Avoid excessive animations.
- Respect reduced-motion preferences if animations are added.
- Ensure images, buttons, and text do not overflow on mobile.

## 9. Acceptance Criteria

- `Sơ đồ tổng quan` appears first and displays configurable campus map images.
- The overview map section remains visible when switching transportation tabs.
- The `Xe máy` tab shows its own numbered instructions and video section.
- The `Xe công nghệ` tab shows its own numbered instructions and two entrance cards.
- Each entrance card supports viewing its image, opening Google Maps, and copying the map link.
- Missing optional data does not break the page.
- The design matches the existing graduation invitation website.
- The page works on mobile and desktop.
- Run the available type-check, lint, or build commands and fix relevant errors.

After implementation, report the files changed, where to configure map images and instructions, and the verification results.