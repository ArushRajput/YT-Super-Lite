use std::sync::atomic::{AtomicUsize, Ordering};

static BLOCKED_COUNT: AtomicUsize = AtomicUsize::new(0);

#[tauri::command]
fn get_stats() -> usize {
    BLOCKED_COUNT.load(Ordering::SeqCst)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .on_page_load(|window, _payload| {
            let script = include_str!("../../src/inject.js");
            window.eval(script).unwrap();
        })
        .invoke_handler(tauri::generate_handler![get_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
