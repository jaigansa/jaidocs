+++
title = "ADB CLI: Connect and Debug Android Devices"
date = "2025-01-15"
draft = false
author = "jaiganesh"
tags = ["adb", "android", "cli", "debugging", "wireless debugging", "usb debugging", "linux"]
categories = ["android development", "tools"]
featured_image = "/images/thumbnails/adb-cli-connect-and-debug-android-devices.webp"
summary = "Android Debug Bridge (ADB) is a versatile command-line tool that lets you communicate with an Android-powered device. ADB provides various device actions, such as installing and debugging apps, and it offers access to a Unix shell that you can use to run commands on a device."
+++

Android Debug Bridge (ADB) is a versatile command-line tool that lets you communicate with an Android-powered device. ADB provides various device actions, such as installing and debugging apps, and it offers access to a Unix shell that you can use to run commands on a device. This guide will walk you through installing ADB and connecting to your Android devices via USB and Wi-Fi.

# ADB Connect CLI

## Install ADB

There are two primary ways to install ADB on your Linux system:

### Method 1: Using Platform Tools (Recommended for latest version)

1.  **Download Platform Tools:**
    *   Visit the official Android Developers Platform Tools page: [ADB PLATFORM TOOLS](https://developer.android.com/tools/releases/platform-tools)
    *   Direct link for Linux: [linux adb latest](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)

2.  **Extract the Archive:**
    ```bash
unzip platform-tools-latest-linux.zip
    ```

3.  **Move to a convenient location:**
    ```bash
sudo mv platform-tools /opt/android-platform-tools
    ```

4.  **Add to PATH:** Add the directory to your system's PATH environment variable. This allows you to run `adb` commands from any directory.
    ```bash
echo 'export PATH=$PATH:/opt/android-platform-tools' >> ~/.bashrc
source ~/.bashrc
    ```
    (If you use Zsh, replace `~/.bashrc` with `~/.zshrc`).

### Method 2: Debian/Ubuntu Package Manager

For Debian-based distributions (like Ubuntu), you can install an older version of ADB directly from the repositories:

```bash
sudo apt install adb
```

## Connect via Wi-Fi (Initial Setup via USB)

This method allows you to debug your device over Wi-Fi after an initial setup using a USB cable.

1.  **Connect Device via USB:** Ensure your Android device is connected to your computer via a USB cable and USB debugging is enabled in Developer Options.

2.  **Restart ADB in TCP/IP Mode:**
    ```bash
adb kill-server      # Terminates any running ADB server processes.
adb devices          # Lists connected devices to confirm your device is recognized.
adb tcpip 5555       # Restarts the ADB daemon on the device to listen for connections on port 5555 (over TCP/IP).
    ```

3.  **Disconnect USB and Connect via Wi-Fi:**
    You can now disconnect your USB cable. Find your device's IP address (usually in Wi-Fi settings on the device).

    ```bash
adb connect <device_ip_address>:5555 # Connects to your device over Wi-Fi using its IP address and the specified port.
    ```
    *   Replace `<device_ip_address>` with the actual IP address of your Android device on the local network.


## Connect via Wi-Fi (Wireless Pairing)

Android 11 and higher support wireless debugging without needing a USB cable for initial setup.

1.  **Enable Wireless Debugging on Device:** On your Android device, go to Developer Options > Wireless debugging and enable it. You'll see a pairing code and IP address/port.

2.  **Pair with Device:**
    ```bash
adb kill-server                                  # Terminates any running ADB server processes.
adb pair <device_ip_address>:<device_port>       # Initiates pairing with your device. Enter the pairing code shown on your device when prompted.
    ```
    *   Replace `<device_ip_address>` with the IP address shown on your device for wireless debugging.
    *   Replace `<device_port>` with the pairing port shown on your device.

3.  **Connect to Device:**
    ```bash
adb connect <device_ip_address>:<device_port>    # Connects to your device over Wi-Fi after successful pairing.
adb devices                                      # Lists connected devices to confirm your device is recognized.
    ```
    *   Note: The `<device_port>` for connecting might be different from the pairing port. Check your device's wireless debugging settings for the correct connection port.

## Conclusion

The Android Debug Bridge (ADB) is an indispensable tool for Android developers and power users. By mastering its commands and connection methods, you gain powerful control over your Android devices for debugging, development, and customization. Continue exploring the extensive capabilities of ADB to streamline your workflow and unlock the full potential of your Android devices.

