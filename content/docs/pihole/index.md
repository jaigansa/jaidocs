+++
title = "Pi-hole: Network-wide Ad Blocking"
date = "2025-02-19"
draft = false
author = "jaiganesh"
tags = ["pi-hole", "ad blocking", "dns", "network", "privacy", "linux", "configuration"]
categories = ["networking", "security"]
featured_image = "/images/thumbnails/adb-cli.png"
summary = "Pi-hole is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole, and optionally a DHCP server, for a private network. It is designed to protect your devices from unwanted content like ads, trackers, and malicious websites across your entire network, improving privacy and browsing speed."
+++

Pi-hole is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole, and optionally a DHCP server, for a private network. It is designed to protect your devices from unwanted content like ads, trackers, and malicious websites across your entire network, improving privacy and browsing speed. This guide will walk you through the installation and basic configuration of Pi-hole.

## Installation

### One-Step Automated Install

The quickest and most convenient way to install Pi-hole is by using their official one-step automated script.

```bash
curl -sSL https://install.pi-hole.net | bash
```

**Explanation of the command:**
*   `curl -sSL https://install.pi-hole.net`: Downloads the installation script from the official Pi-hole website.
    *   `-s`: Silent mode (doesn't show progress meter or error messages).
    *   `-S`: Show error messages even when in silent mode.
    *   `-L`: Follow redirects.
*   `| bash`: Pipes the downloaded script directly to the `bash` interpreter, executing it.

**Prerequisites before running the installer:**
*   **Dedicated Device:** Pi-hole is typically installed on a dedicated low-power device like a Raspberry Pi, but can also run on other Linux machines or in a virtual machine.
*   **Static IP Address:** Your Pi-hole device should have a static IP address on your network. This ensures that other devices can consistently find it for DNS resolution.
*   **Operating System:** A fresh installation of a supported Debian-based OS (e.g., Raspberry Pi OS Lite, Ubuntu Server) is recommended.

**During the interactive installer, you will be prompted to:**
*   Confirm your network interface.
*   Choose your upstream DNS provider (e.g., Google, Cloudflare, OpenDNS).
*   Select blocklists.
*   Decide whether to install the web admin interface.
*   Note down the password for the web interface.

## Post-Installation Configuration

After the installation is complete, you'll need to configure your network to use Pi-hole as its DNS server.

### Accessing the Web Interface

You can access the Pi-hole web administration interface by navigating to `http://<your_pi_hole_ip_address>/admin` in your web browser. Log in using the password provided during installation.

### Configuring Devices to Use Pi-hole

There are two main ways to direct your network traffic through Pi-hole:

1.  **Configure your Router (Recommended):**
    *   Log in to your router's administration panel.
    *   Find the DHCP/DNS settings.
    *   Change the primary DNS server to the IP address of your Pi-hole.
    *   Save changes and restart your router. All devices connected to your network will then automatically use Pi-hole.

2.  **Configure Individual Devices:**
    *   Manually change the DNS settings on each device (computer, phone, tablet) to point to your Pi-hole's IP address. This is useful if you only want certain devices to use Pi-hole or if your router doesn't allow custom DNS settings.

## Adlists

Adlists are collections of domains known to serve advertisements, trackers, or malicious content. Pi-hole uses these lists to block DNS requests to these domains, effectively preventing ads and trackers from loading on your network.

### Managing Adlists

You can manage your adlists through the Pi-hole web interface:
1.  Navigate to "Group Management" > "Adlists."
2.  Here you can add new adlist URLs, enable/disable existing ones, and update them.

### Recommended Adlist: oisd

The `oisd` adlist is a popular, comprehensive, and frequently updated blocklist that aims to block ads, malware, and trackers across various categories. It's an excellent choice for a robust ad-blocking experience.

*   **oisd Adlist:** [https://oisd.nl/setup/pihole](https://oisd.nl/setup/pihole)
    *   Follow the instructions on the `oisd` website to add their list to your Pi-hole.

## Conclusion

Pi-hole offers a powerful and efficient way to block unwanted content across your entire network, significantly enhancing your browsing experience, privacy, and even network performance. With its easy installation and comprehensive web interface, you can take control of your network's DNS and enjoy a cleaner, faster internet. Explore its advanced features like whitelisting, blacklisting, and custom DNS entries to tailor Pi-hole to your specific needs.
