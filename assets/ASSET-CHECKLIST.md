# 📌 Asset checklist

Upload your real files to these exact folders/names (or edit the `src=` in the HTML if you rename anything). Everything currently shows a labeled placeholder box so you can see exactly what's missing as you browse the site.

## 1. Profile photos
| File | Used on |
|---|---|
| `assets/images/profile/portrait.jpg` | Homepage hero (right side) |
| `assets/images/profile/about-photo.jpg` | About page |

→ In `index.html` / `about.html`, replace the `<p class="ph-note">...</p>` placeholder inside `.hero-portrait` with:
```html
<img src="assets/images/profile/portrait.jpg" alt="Hang Doan">
```

## 2. Project case-study images
| File | Used on |
|---|---|
| `assets/images/projects/tedx-cover.jpg` | Project card thumbnail (home + projects list) |
| `assets/images/projects/tedx-hero.jpg` | Case study top banner |
| `assets/images/projects/tedx-1.jpg` / `-2.jpg` / `-3.jpg` | Case study proof gallery |
| `assets/images/projects/sacchammauviet-cover.jpg` | Card thumbnail |
| `assets/images/projects/sacchammauviet-hero.jpg` | Case study banner |
| `assets/images/projects/scmv-1.jpg` / `-2.jpg` / `-3.jpg` | Case study proof gallery |
| `assets/images/projects/skypacific-cover.jpg` | Card thumbnail |
| `assets/images/projects/skypacific-hero.jpg` | Case study banner |
| `assets/images/projects/skypacific-1.jpg` / `-2.jpg` / `-3.jpg` | Case study proof gallery |

→ For each `.project-thumb` or `.case-cover`, swap the placeholder `<p class="ph-note">` for an `<img src="...">` the same way as above.

## 3. Gallery (design + video showcase)
- Design pieces → `assets/images/gallery-design/asset-01.jpg`, `asset-02.jpg`, etc.
- Videos → `assets/videos/reel-01.mp4`, `reel-02.mp4`, etc.
- Add a new `.gallery-item` block in `gallery.html` for every extra piece — copy an existing block, change the filename, caption, and `data-type` (`design` or `video`).
- Videos autoplay muted as they scroll into view and pause when scrolled away (already wired up in `js/main.js`) — no action needed beyond uploading the `.mp4`.

## 4. CV
- `assets/cv/Hang-Doan-CV.pdf` — used by every "Download CV" button (homepage hero + Contact page).

## 5. Background music
- `assets/audio/bg-music.mp3` — a looping instrumental track (keep it soft/ambient so it doesn't compete with any video sound). Used by the corner music player on every page.
- **Browser note:** browsers block audio with sound from playing before the visitor interacts with the page. This is already handled — the very first click (opening the folder on the homepage, or the music button itself) counts as that interaction and starts playback smoothly.

## 6. Optional — poster frames for videos
If you want a static thumbnail to show before a video plays/loads, add e.g. `assets/images/gallery-design/reel-01-poster.jpg` and set `poster="assets/images/gallery-design/reel-01-poster.jpg"` on the matching `<video>` tag in `gallery.html`.

---

**Naming tip:** keep every filename lowercase, no spaces, no Vietnamese diacritics (use `sac-cham-mau-viet` not `Sắc – Chạm Màu Việt`) — this avoids broken links on GitHub Pages, which is case-sensitive.
