# YouTube Power Tools 🦁🎮

A collection of ultra-lightweight, high-performance desktop tools for YouTube users and streamers, built with **Rust** and **Tauri**.

## 🚀 Projects Included

### 1. 🦁 YouTube Brave (Ad-Free Browser)
A premium browser experience focused on **data saving** and **aggressive ad-blocking**.
- **Network-Level Ad-Blocker**: Blocks domains at the Rust level (saves maximum mobile data).
- **Feed Ad Removal**: Specialized logic to kill "Sponsored" content and feed ads.
- **Brave Aesthetic**: Dark mode with signature orange accents.
- **Data Saver**: Forces 360p resolution and disables autoplay by default.
- **Brave Shield Dashboard**: Real-time stats on ads blocked and data saved.

### 2. 🎮 YT Studio - Streamer Edition (Dashboard)
A specialized YouTube Studio dashboard optimized for **maximum game FPS**.
- **Live Resource HUD**: Monitor app CPU and RAM usage in real-time.
- **Low-Resource Mode**: Minimal CPU/GPU footprint.

### 🌟 3. YT Super Lite (Beginner Example)
Located in the `example/` folder, this is a minimalist template for anyone wanting to build their first data-saver app. It's clean, simple, and easy to fork!

---

## 🛠️ Built With
- **Tauri v2**: Minimal resource footprint (3-5x lighter than Chrome).
- **Rust**: High-performance backend logic.
- **JavaScript**: Aggressive DOM manipulation and ad-removal injection.

## 📦 Installation

Grab the latest installers from the [Releases](https://github.com/YOUR_USERNAME/YOUR_REPO/releases) page:
- **Windows Setup (.exe)**: Easiest way to install both tools.
- **MSI Installer**: Clean installation for Windows 10/11.
- **Portable EXE**: Run directly without installation.

## 👨‍💻 Development
1. Clone the repo.
2. Install dependencies: `npm install`.
3. Run dev mode:
   - For Browser: `npm run tauri dev`
   - For Studio: `cd yt-studio && npm run tauri dev`

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
