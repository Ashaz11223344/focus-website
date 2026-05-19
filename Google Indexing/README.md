# ✦ Google Indexing & SEO Configuration Guide

This directory contains the master configuration files for Google search indexing and SEO optimization for the **Focus App Website** ([https://getfocus.online](https://getfocus.online)).

---

## 📁 File Structure & Mapping

The master files in this directory are linked to the active deployment directory as follows:

| Master File | Description | Production Deployment Path | Public URL |
| :--- | :--- | :--- | :--- |
| `sitemap.xml` | XML Sitemap containing all indexable pages | `public/sitemap.xml` | [https://getfocus.online/sitemap.xml](https://getfocus.online/sitemap.xml) |
| `robots.txt` | Instructions for Googlebot and other web crawlers | `public/robots.txt` | [https://getfocus.online/robots.txt](https://getfocus.online/robots.txt) |
| `seo-config.json` | Blueprint of titles, meta descriptions, and social graph cards | Configured in `app/layout.jsx` | Generated in page HTML head |
| `structured-data.json` | JSON-LD SoftwareApplication schema markup | Configured in `app/layout.jsx` | Injected into server-rendered head |

---

## 🛠️ Implementation Details

### 1. XML Sitemap (`sitemap.xml`)
Exposes the public entry point of the website using the `https` protocol and absolute URL structure. The homepage is given maximum priority (`1.0`) to instruct search engines to index it foremost.

### 2. Robots Directives (`robots.txt`)
Enables absolute search engine crawling globally, specifies standard indexing permissions, and references the absolute location of the Sitemap file:
```text
User-agent: *
Allow: /
Sitemap: https://getfocus.online/sitemap.xml
```

### 3. Rich SEO Metadata & Open Graph Tags
We have integrated Next.js Metadata APIs dynamically in `app/layout.jsx` to render professional, rich visual assets when shared across social channels:
* **Standard SEO**: Customized page `title`, search `description`, and indexable `keywords`.
* **Canonical URL**: Prevents duplicate content issues by hardcoding `<link rel="canonical" href="https://getfocus.online" />`.
* **Open Graph (Facebook/LinkedIn)**: Displays custom title, description, URL, locale, and high-resolution logo preview when sharing.
* **Twitter Card**: Configured with `summary_large_image` to showcase the application's logo inside a clean, modern card layout.

### 4. Structured Data (JSON-LD)
Configured with the Google-recommended `SoftwareApplication` schema inside the server-side page render context to increase the chance of rich search snippet indicators in search results (e.g. mobile app search queries):
* **Type**: `SoftwareApplication`
* **App Name**: `Focus App`
* **Category**: `ProductivityApplication`
* **Sub-category**: `Mindful Offline Growth & Productivity`
* **Operating Systems**: `Android, iOS`
* **Price**: Free (`$0.00 USD`)

---

## 🚀 Google Search Console Submission Steps

To submit your website for crawling and ensure immediate indexing by Google:

1. **Access Google Search Console**:
   Open [Google Search Console](https://search.google.com/search-console) and log into your Google Account.

2. **Add Property**:
   * Click the property selector dropdown in the top-left and select **"Add property"**.
   * Choose the **URL prefix** method, enter `https://getfocus.online`, and click **Continue**.

3. **Verify Ownership**:
   * Select **HTML Tag** verification.
   * Copy the verification meta tag value (e.g., `<meta name="google-site-verification" content="..." />`).
   * Paste this tag into your `app/layout.jsx` file under `metadata` if needed, OR verify ownership using your DNS provider by adding a TXT record.

4. **Submit Sitemap**:
   * Navigate to the **"Sitemaps"** menu from the left sidebar under the *Indexing* tab.
   * Under **"Add a new sitemap"**, input the exact sitemap URL:
     ```text
     https://getfocus.online/sitemap.xml
     ```
   * Click **Submit**.

5. **Request Indexing**:
   * Go to **"URL Inspection"** at the top search bar.
   * Paste `https://getfocus.online/` and press Enter.
   * Click **"Request Indexing"** to flag Googlebot to crawl your homepage immediately.

---

## 🧪 Validation Checklist

To verify that search engine crawlers can successfully read your assets after deploying:

1. **Verify robots.txt is accessible**:
   Navigate to [https://getfocus.online/robots.txt](https://getfocus.online/robots.txt). It must display your user-agent directives without throwing any HTTP errors.
2. **Verify sitemap.xml is valid**:
   Navigate to [https://getfocus.online/sitemap.xml](https://getfocus.online/sitemap.xml). Verify that the XML structure opens successfully without compilation errors.
3. **Run Rich Snippet Tests**:
   Submit `https://getfocus.online/` to the [Google Rich Results Test](https://search.google.com/test/rich-results) tool to confirm that your `SoftwareApplication` JSON-LD structured data is parsed correctly without warnings.
4. **Inspect SEO Tags**:
   View the page source of [https://getfocus.online](https://getfocus.online) to ensure the `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<link rel="canonical">`, Open Graph (`og:*`), and Twitter (`twitter:*`) tags are fully populated.
