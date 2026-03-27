# Jaidoc // Top Secret E-Ink Dossiers

A technical, high-contrast Hugo theme designed for e-ink displays and secure technical documentation.

## [Visit Live Site](https://jaigansa.github.io/jaidocs/)

---

## 🛠 Commands

### Development
To run the local server with live reloading:
```bash
hugo server
```
*Accessible at: `http://localhost:1313/jaidocs/`*

### Production Build
To generate the final, minified files for deployment:
```bash
hugo --minify -e production
```
*Output directory: `public/`*

## 📁 Project Structure
- `content/docs/`: Your primary dossiers (markdown files).
- `themes/jaidoc/`: The core e-ink theme logic.
- `static/`: Global images and assets.

## ⚙️ Features
- **BDC Clock**: Binary Coded Decimal live brand clock.
- **Data Scramble**: Secure-reveal typewriter greeting.
- **Dossier UI**: Monochrome, sharp-edged dossier list with QR code scanning.
- **Terminal Syntax**: High-contrast, dot-matrix styled code blocks.
- **Encrypted Search**: Instant database searching via the header tools.
