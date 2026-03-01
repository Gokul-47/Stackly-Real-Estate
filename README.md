# Stackly – Real Estate Website (Tamil Nadu)

A responsive real estate site for Tamil Nadu, built with HTML, CSS, and JavaScript.

## Features

- **Company**: Stackly – logo links to `index.html`
- **Shared navigation** on all pages (no search/account icons); **Dashboard** button instead of Sign up
- **Home dropdown**: "Home" and "Home2"
- **About section** on the index (Home) page
- **Home2** has a different nav (Overview, Features, Locations, etc.) that scrolls to 10 sections on the same page
- **10 sections** on Index, Home2, Service, and Agents pages (Dashboard and Contact are unchanged)
- **Tamil Nadu focus**: locations (Chennai, Coimbatore, Madurai, Trichy, Salem, Erode) and prices in ₹ (Lakh/Cr)
- **Dashboard** with 3 charts (property types, sales trend, price distribution) via Chart.js
- **Custom 404**: external and media links redirect to `404.html`
- **Footer** includes **Media** links (Brochure PDF, Property Tour MP4, Podcast MP3) – these redirect to 404
- **Responsive** from 320px; advanced animations

## Pages

| Page        | Path            | Description |
|------------|-----------------|-------------|
| Home       | `index.html`    | Hero, search, About, stats, Why Choose Us, Popular Residences (TN), Areas We Serve, How It Works, Testimonials, CTA (10 sections) |
| Home2      | `home2.html`    | 10 sections with section-only nav |
| Service    | `service.html`  | 10 sections |
| Agents     | `agents.html`   | 10 sections |
| Contact    | `contact.html`  | Contact form |
| Dashboard  | `dashboard.html`| Analytics with 3 graphs |
| 404        | `404.html`      | Not found (external/media links) |

## Run locally

Open `index.html` in a browser, or:

```bash
python -m http.server 8080
# or
npx serve .
```

## 404 behavior

- Links to other origins (`http://...` external) are rewritten to `404.html`.
- Footer media links (e.g. `brochure.pdf`, `property-tour.mp4`, `podcast.mp3`) redirect to `404.html`.
