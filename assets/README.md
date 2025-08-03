# Assets Folder

This folder contains all the static assets for Mathiya's portfolio website.

## Structure

```
assets/
├── images/           # Project screenshots, profile photos, gallery images
├── icons/           # Custom icons and favicons
├── animations/      # Lottie files and custom animations
└── documents/       # Resume PDF and other documents
```

## Image Guidelines

- **Profile Photos**: 400x400px minimum, square aspect ratio
- **Project Screenshots**: 1200x800px for best quality
- **Gallery Images**: Various sizes, optimized for web
- **Icons**: SVG format preferred, PNG fallback

## Optimization

All images should be optimized for web:
- Use WebP format when possible
- Compress images to reduce file size
- Provide multiple sizes for responsive images

## Usage

Images are referenced in the HTML using relative paths:
```html
<img src="assets/images/profile.jpg" alt="Mathiya Angirasa">
```

For lazy loading:
```html
<img data-src="assets/images/project1.jpg" class="lazy" alt="Project Screenshot">
```