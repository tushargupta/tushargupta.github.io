# How to Create New Pages

This blog uses a component-based system to make creating new pages easy. Common elements like Google Analytics, header, and sidebar are automatically loaded.

## Creating a New Blog Post

1. **Copy the template:**
   ```
   Copy posts/template.html to posts/[YEAR]/your-new-post.html
   ```

2. **Replace the placeholders:**
   - `[ARTICLE TITLE]` - Your article title
   - `[post-id]` - A unique ID (lowercase-with-dashes)
   - `[IMAGE_NAME]` - Your featured image filename
   - `[DATE]` - Publication date (e.g., "17 January 2026")
   - `[CATEGORY]` - One of: Technology, Career, Technical Writing, Personal
   - `[Your article content...]` - Your actual article content

3. **Add to listings:**
   - Update `blog-posts.html` - Add your article at the top
   - Update `includes/sidebar.html` - Add to Recent Posts (keep only 3 most recent)
   - Update `index.html` - Add to Latest Posts (keep only 4 most recent)
   - Update `sitemap.xml` - Add the new post URL to ensure it is indexed by search engines

## Component System

The blog automatically loads these components on every page:

### `includes/head.html`
Contains:
- Google Analytics tracking code
- Meta tags (charset, viewport)
- CSS stylesheet link

**Usage:** Add `<div id="head-container"></div>` in your `<head>` section

### `includes/header.html`
Contains:
- Logo
- Social media links (Twitter, Instagram)

**Usage:** Add `<div id="header-container"></div>` in your content area

### `includes/sidebar.html`
Contains:
- Navigation menu
- Recent posts (3 articles)
- Contact information

**Usage:** Add `<div id="sidebar-container"></div>` for the sidebar

## File Structure

```
tushargupta.github.io/
├── index.html              # Home page
├── about.html              # About Me page
├── blog-posts.html         # All posts listing
├── includes/               # Reusable components
│   ├── head.html          # Common head elements (GA, meta tags)
│   ├── header.html        # Site header
│   └── sidebar.html       # Sidebar navigation
├── posts/                  # Individual blog posts
│   ├── template.html      # Template for new posts
│   ├── 2025/              # Blog posts from 2025
│   └── 2026/              # Blog posts from 2026
├── images/                 # Images
└── assets/                 # CSS, JS, fonts
    └── js/
        └── components.js  # Component loader script
```

## Benefits of This System

✅ **Google Analytics** - Automatically included on all pages via `head.html`
✅ **Consistent Design** - Header and sidebar are identical across all pages
✅ **Easy Updates** - Change header/sidebar once, updates everywhere
✅ **Simple Creation** - Just copy template and fill in placeholders
✅ **No Build Process** - Pure HTML, works on GitHub Pages immediately

## Updating Common Elements

### To update Google Analytics:
Edit `includes/head.html` - Change the Measurement ID

### To update navigation:
Edit `includes/sidebar.html` - Update the menu links

### To update social links:
Edit `includes/header.html` - Update the social media URLs

## Tips

- **Folder Structure**: All new posts should be placed in their respective year folder (e.g., `posts/2026/`).
- **Template Paths**: The `template.html` is pre-configured with `../../` paths for this year-based folder structure. If you place a file directly in `posts/`, you will need to change paths to `../`.
- Always use relative paths for images: `../../images/[YEAR]/filename.png`
- Keep sidebar Recent Posts to 3 items maximum
- Keep index.html Latest Posts to 4 items maximum
- Use descriptive post IDs: `real-cost-of-convenience` not `post1`
- Test locally with `python -m http.server 8000` before deploying
