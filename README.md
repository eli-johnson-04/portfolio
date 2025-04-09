# Personal Portfolio
### Elijah Johnson

Hello! Welcome to the repository for my personal portfolio website, hosted on GitHub Pages at **[elijahjohnson.me](https://elijahjohnson.me)**. Featured are three planets and moons, each of which has text on them indicating what lies within. Activity is Pluto, Portfolio is the moon Callisto, and Profile is the dwarf planet Eris.

![Entry View of Planets!](/public/images/repo/entry-view.webp)

Hover over them for more information, and click to explore their contents. 

![Portfolio Hovered](/public/images/repo/portfolio-hovered.webp)

## Notable Features
- Planets hover around idly, with their text following the camera
- Starry background shader
- Each planet opens a modal with bespoke content
- Click and drag to change view
- Each Portfolio and Activity entry corresponds to a single Markdown file which are compiled and translated into HTML, then styled with a custom stylesheet
- Extra stars that fly in to the planets when hovered in accordance with however many Markdown files are present
- Tooltips that provide TL;DRs for Activity Entries and keywords for Portfolio entries
- A variety of responsive animations and transitions to provide a smooth, simple experience. 

## Stack: 
This website is built on HTML, CSS, JavaScript, and Vite, with the following tools and frameworks:
- Three.JS: world construction, spheres, 3D objects
- GSAP: all 3D animations and many others for non-Three elements
- React JS: modals, custom components
- TailwindCSS: (almost) all HTML styling
- react-markdown: conversion of Markdown files into HTML
- rc-tooltip: React-based tooltips for keywords and TL;DRs
- GitHub Pages: deployment and hosting
- Miscellaneous: rehype-raw, simplex-noise, dat.gui 