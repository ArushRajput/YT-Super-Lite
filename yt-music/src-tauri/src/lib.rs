use std::sync::atomic::{AtomicUsize, Ordering};

static BLOCKED_COUNT: AtomicUsize = AtomicUsize::new(0);

#[tauri::command]
fn get_stats() -> usize {
    BLOCKED_COUNT.load(Ordering::SeqCst)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let script = include_str!("../../src/inject.js");
            
            // Create the main window with ad-blocking and init script
            let _window = tauri::webview::WebviewWindowBuilder::new(
                app, 
                "main", 
                tauri::WebviewUrl::App("https://m.youtube.com".into())
            )
            .title("YouTube Brave")
            .initialization_script(script)
            .on_web_resource_request(|request, response| {
                let uri = request.uri().to_string();
                let ad_domains = [
                    "doubleclick.net",
                    "googleads",
                    "pagead",
                    "ptracking",
                    "api/stats/ads",
                    "googlesyndication.com",
                    "googleadservices.com",
                    "googletagmanager.com",
                    "google-analytics.com",
                    "ytimg.com/pagead/",
                    "s-v68-advertising",
                    "crashlytics.com",
                    "measurelib"
                ];

                for domain in ad_domains {
                    if uri.contains(domain) {
                        BLOCKED_COUNT.fetch_add(1, Ordering::SeqCst);
                        *response.body_mut() = Vec::new().into();
                        break;
                    }
                }
            })
            .build()
            .expect("failed to build window");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
