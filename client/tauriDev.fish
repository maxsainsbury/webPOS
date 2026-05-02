#!/usr/bin/env fish

set -x GDK_BACKEND wayland
set -x WEBKIT_DISABLE_DMABUF_RENDERER 1
cargo tauri dev