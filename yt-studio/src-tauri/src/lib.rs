use sysinfo::{System, ProcessRefreshKind};
use serde::Serialize;
use std::sync::Mutex;

#[derive(Serialize)]
struct ResourceUsage {
    cpu: f32,
    ram_mb: u64,
}

struct AppState {
    sys: Mutex<System>,
}

#[tauri::command]
fn get_resource_usage(state: tauri::State<'_, AppState>) -> ResourceUsage {
    let mut sys = state.sys.lock().unwrap();
    
    // Simplest way to avoid API mismatch during fast iteration
    sys.refresh_all();
    
    let pid = sysinfo::get_current_pid().expect("Failed to get PID");
    if let Some(process) = sys.process(pid) {
        ResourceUsage {
            cpu: process.cpu_usage() / sys.cpus().len() as f32, // Average across all cores
            ram_mb: process.memory() / 1024 / 1024,
        }
    } else {
        ResourceUsage { cpu: 0.0, ram_mb: 0 }
    }
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState { sys: Mutex::new(System::new_all()) })
        .on_page_load(|window, _payload| {
            let script = include_str!("../../src/inject.js");
            window.eval(script).unwrap();
        })
        .invoke_handler(tauri::generate_handler![get_resource_usage])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
