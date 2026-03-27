+++
title = "Btop"
date = "2025-02-14"
draft = false
author = "jaiganesh"
tags = ["btop", "resource monitor", "system monitoring", "cli", "linux", "configuration"]
categories = ["utilities", "system tools"]
featured_image = "/images/thumbnails/btop.webp"
summary = "`btop` is a fast, modern, and fully customizable command-line resource monitor that displays usage and stats for processor, memory, disks, network, and processes. It's a visually appealing and feature-rich alternative to traditional tools like `top` and `htop`, offering an interactive interface and extensive configuration options."
+++

## Introduction

`btop` is a fast, modern, and fully customizable command-line resource monitor that displays usage and stats for processor, memory, disks, network, and processes. It's a visually appealing and feature-rich alternative to traditional tools like `top` and `htop`, offering an interactive interface and extensive configuration options. This guide will cover how to install `btop`, understand its basic usage, and customize its configuration.

## Installation

`btop` can be installed on various operating systems. Here are common methods for popular distributions:

### Debian/Ubuntu

```bash
sudo apt install btop
```

### Fedora

```bash
sudo dnf install btop
```

### Arch Linux

```bash
sudo pacman -S btop
```

### macOS (using Homebrew)

```bash
brew install btop
```

### Other Systems (Build from Source)

If `btop` is not available in your package manager, you can compile it from source. Refer to the official `btop` GitHub repository for the latest build instructions.

## Basic Usage

To launch `btop`, simply open your terminal and type:

```bash
btop
```

### Interface Overview

Upon launching, `btop` presents a comprehensive overview of your system's resources, typically divided into several sections:

*   **CPU:** Displays CPU utilization per core, temperature, and frequency.
*   **Memory:** Shows RAM and Swap usage.
*   **Disk:** Monitors disk I/O and usage for mounted partitions.
*   **Network:** Visualizes network activity (upload/download speeds).
*   **Processes:** Lists running processes, sortable by various metrics (CPU, memory, PID).

### Navigation and Interaction

`btop` is highly interactive and can be navigated using your keyboard:

*   **Arrow Keys:** Move between sections and processes.
*   `m`: Toggle the main menu for settings and options.
*   `p`: Toggle process view.
*   `f`: Filter processes.
*   `q`: Quit `btop`.
*   `Esc`: Close menus or filters.

## Configuration

`btop` is highly customizable through its configuration file, allowing you to tailor its appearance and behavior to your preferences.

### Configuration File Location

The main configuration file for `btop` is located at:

```
~/.config/btop/btop.conf
```
If this file doesn't exist, `btop` will use its default settings. You can create it by copying the example configuration file, usually found in `/usr/share/btop/btop.conf` or `/usr/local/share/btop/btop.conf`.

### Editing the Configuration

You can edit `btop.conf` with any text editor:

```bash
nano ~/.config/btop/btop.conf
# or
vim ~/.config/btop/btop.conf
```

### Common Configuration Options

Some popular customization options include:

*   **`color_theme`**: Change the color scheme (e.g., `default`, `dracula`, `nord`).
*   **`update_ms`**: Adjust the update interval in milliseconds.
*   **`show_clock`**: Display a clock in the header.
*   **`default_view`**: Set the default view mode (e.g., `cpu`, `mem`, `proc`).
*   **`proc_sorting`**: Define how processes are sorted by default.

After saving changes to `btop.conf`, restart `btop` for the new settings to take effect.

## Conclusion

`btop` offers a visually appealing and highly functional way to monitor your system's resources. Its interactive interface, detailed statistics, and extensive customization options make it a superior alternative to many traditional resource monitors. By following this guide, you can install, use, and configure `btop` to keep a close eye on your system's performance and ensure everything is running smoothly.
