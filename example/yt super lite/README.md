# 🚀 YT Super Lite: All-in-One Beginner Example

Welcome to the **YT Super Lite** project! This is a minimalist, single-page guide designed to help you build your first data-saving YouTube browser using **Tauri and Rust**.

## ✨ What does it do?
This app is designed for **maximum efficiency**. It automatically forces the YouTube player into **360p quality** (Medium) to save your mobile data or home network bandwidth. It's 10x lighter than using a standard browser like Chrome.

---

## 🛠️ The Complete Source Code

Everything you need to know is in these two files:

### 1. The Backend (Rust)
**File**: `src-tauri/src/lib.rs`
This part manages the window and tells the browser to run our "Data Saver" script.

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .on_page_load(|window, _payload| {
            // Injects our JavaScript "Secret Sauce" on every page load
            let script = include_str!("../../src/inject.js");
            window.eval(script).unwrap();
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 2. The Secret Sauce (JavaScript)
**File**: `src/inject.js`
This is the script that actually talks to YouTube and changes the settings for you.

```javascript
(function() {
    console.log('YT Super Lite: Saving Data...');

    // Forces YouTube player to 360p (Medium) quality
    function forceQuality() {
        const player = document.getElementById('movie_player') || 
                     document.querySelector('.html5-video-player');
        
        if (player && typeof player.setPlaybackQualityRange === 'function') {
            if (player.getPlaybackQuality() !== 'medium') {
                player.setPlaybackQualityRange('small', 'medium');
            }
        }
    }

    // Simple Dark Mode for better viewing
    const style = document.createElement('style');
    style.innerHTML = "html, body { background-color: #000 !important; color: #fff !important; }";
    document.head.appendChild(style);

    // Keep checking every 3 seconds to ensure 360p stays active
    setInterval(forceQuality, 3000);
})();
```

---

## 📦 How to Build it (3 Simple Steps)
1.  **Install**: Make sure you have **Node.js** and **Rust** installed on your PC.
2.  **Setup**: Open this folder in your terminal and run `npm install`.
3.  **Run**: Run `npm run tauri dev` to see your ultra-lite browser in action!

## 📜 License
This example is open-source under the **MIT License**. Feel free to fork it, change it, and build your own tools! 🦁
