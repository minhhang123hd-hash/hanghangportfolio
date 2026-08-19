# Hang Doan — Portfolio

A multi-page portfolio site: Home · About · Projects (3 case studies) · Gallery · Contact.
Plain HTML/CSS/JS — no build step, no dependencies. Works directly on GitHub Pages.

## File structure
```
index.html                     → Home (folder intro animation + hero + highlights + featured projects)
about.html                     → Full bio, education, experience timeline, skills
projects.html                  → All 3 case studies listed
project-tedx.html              → Case study: TEDxFTU Hanoi 2025
project-sacchammauviet.html    → Case study: Workshop "Sắc – Chạm Màu Việt"
project-skypacific.html        → Case study: Sky Pacific Education
gallery.html                   → Design & video showcase (filterable, autoplay videos)
contact.html                   → Contact form + info + CV download

css/style.css                  → All styling & design tokens (colors, fonts, spacing)
js/main.js                     → Nav, intro animation, music player, scroll reveal, gallery filter

assets/
  images/profile/              → your photos
  images/projects/              → case-study covers & galleries
  images/gallery-design/        → standalone poster/leaflet/POSM images
  videos/                        → gallery reels (.mp4)
  audio/bg-music.mp3            → background music track
  cv/Hang-Doan-CV.pdf           → downloadable CV
  ASSET-CHECKLIST.md            → exactly what to upload where
```

## How to deploy on GitHub Pages (using the web interface, no local Git needed)

1. Go to your existing repo (or create a new one) on github.com — e.g. `portfoliohangg.github.io`.
2. Click **Add file → Upload files**.
3. Drag in every file and folder from this project, keeping the same folder structure (GitHub's uploader preserves folders when you drag a whole folder in).
4. Commit directly to the `main` branch.
5. Go to **Settings → Pages**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
6. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two (or at the root domain if the repo is named `<username>.github.io`).

## Before you share the link
Work through `assets/ASSET-CHECKLIST.md` — every placeholder box on the site tells you exactly which file it's waiting for and where it goes. Once photos, project images, videos, your CV, and a music track are uploaded, swap the `<p class="ph-note">` placeholders for real `<img>` / `<video>` tags as shown in the checklist.

## Customizing further
- **Colors / fonts:** all defined once at the top of `css/style.css` under `:root` — change a value there and it updates everywhere.
- **Adding a 4th project:** duplicate `project-tedx.html`, rename it, update the content, then add a matching card in `projects.html` and `index.html`.
- **Contact form:** currently shows a "Sent ✓" confirmation locally only. To actually receive messages, sign up for a free form backend like Formspree or Netlify Forms and point the form's `action` at it (a couple of lines in `contact.html`).
