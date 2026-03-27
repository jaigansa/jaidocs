+++
title = "Mobile Screencast: Android to OBS via RTMP & IP Camera"
date = "2025-01-15"
draft = false
author = "jaiganesh"
tags = ["mobile screencast", "android", "obs", "rtmp", "nginx", "ffmpeg", "ip camera", "rtsp", "streaming", "linux"]
categories = ["streaming", "tutorials"]
featured_image = "/images/thumbnails/mobile-screencast-android-to-obs-via-rtmp-ip-camera.webp"
summary = "Mobile screencasting allows you to display your mobile device's screen on another device, such as a computer, often for recording or live streaming. This is particularly useful for creating tutorials, showcasing mobile games, delivering presentations, or simply mirroring your phone's display to a larger screen."
+++

Mobile screencasting allows you to display your mobile device's screen on another device, such as a computer, often for recording or live streaming. This is particularly useful for creating tutorials, showcasing mobile games, delivering presentations, or simply mirroring your phone's display to a larger screen.

This guide will walk you through two primary methods for screencasting your mobile device to OBS (Open Broadcaster Software) as a media source: using the RTMP protocol for Android devices and integrating an IP camera feed.

## Screen cast android to obs media source

### RTMP Method

The Real-Time Messaging Protocol (RTMP) is a communication protocol for streaming audio, video, and data over the internet. In this context, your mobile phone will act as an RTMP client, streaming its screen to a local RTMP server (NGINX) which OBS can then pick up as a media source.

> Install rtmp app to phone 
1. [PRISM Live Studio](https://play.google.com/store/apps/details?id=com.prism.live&pcampaignid=web_share)

2. [Larix](https://play.google.com/store/apps/details?id=com.wmspanel.larix_screencaster&pcampaignid=web_share)




#### Serve Screen via RTMP

To configure your mobile RTMP app, you'll need the following details:

*   **RTMP Server URL:** This will be in the format `rtmp://<system-ip-address>:<port>/live`.
    *   `<system-ip-address>`: The IP address of the computer running the NGINX RTMP server (e.g., `192.168.0.100`). You can find this by running `ip a` or `ifconfig` in your terminal.
    *   `<port>`: The port NGINX is listening on for RTMP, typically `1935`.
*   **Stream Key:** A unique identifier for your stream (e.g., `streamkey`). This helps the server differentiate between multiple streams.

Example configuration for your mobile app:
> system-ip-address:port `192.168.0.100:1935`

> key  `streamkey`


#### NGINX RTMP Server Setup

To receive the RTMP stream from your mobile device, you'll set up an NGINX server with the `nginx-mod-rtmp` module.

First, install NGINX and the RTMP module:
```bash
sudo apt-get update && sudo apt-get install nginx libnginx-mod-rtmp vlc
```

Next, edit the NGINX configuration file:
```bash
sudo nano /etc/nginx/nginx.conf
```

Add the following RTMP configuration block, typically outside the `http` block, at the end of the file:
```bash
rtmp {
        server {
                listen 1935; # RTMP server listens on port 1935
                chunk_size 4096; # Sets the RTMP chunk size

                application live {
                        live on; # Enables live streaming for this application
                        record off; # Disables recording of the stream
                }
        }
}

```
After modifying the configuration, test it for syntax errors and restart NGINX to apply the changes:
```bash
sudo nginx -t && sudo systemctl restart nginx
```

You can verify that NGINX is listening on port 1935 with `nmap`:
```bash
nmap -sT localhost
```
#### FFmpeg for RTMP Stream Reservation (Optional)

In some scenarios, you might need `ffmpeg` to act as an intermediary to reserve or re-stream the RTMP feed. This command listens for an incoming RTMP stream and then re-streams it, potentially to another RTMP endpoint or for local processing.

```bash
ffmpeg -f flv -listen 1 -i rtmp://<system-ip-address:port>/live/<key> -c copy -f flv -listen 1 rtmp://<localhost:1935>/live/<key>
```
*   Replace `<system-ip-address:port>` with your NGINX server's IP and port.
*   Replace `<key>` with your chosen stream key.

#### OBS Source Input

In OBS Studio, you will add a new "Media Source" to capture the RTMP stream from your local NGINX server.

1.  **Add Media Source:** In OBS, click the `+` button under "Sources" and select "Media Source."
2.  **Configure Media Source:**
    *   **Input:** `rtmp://localhost:1935/live/streamkey` (This is the address of your local NGINX RTMP server and the stream key you configured.)
    *   **Input Format:** `rtmp`
    *   Ensure "Local File" is unchecked.


## IP Camera to OBS Media Source

This section guides you on how to integrate an IP camera feed directly into OBS Studio.

To begin, you need to find the IP address of your camera on your local network. You can use network scanning tools like `nmap` for this purpose.

*   **Find Camera IP Address:**
    `nmap -sn routerip/subnet`
    *   Replace `routerip/subnet` with your network's IP range (e.g., `192.168.0.1/24`).
    *   `nmap -sn` performs a ping scan, listing all active devices on the specified network. Look for devices that might correspond to your camera.

### CCPlus RTSP IP

In OBS Studio, you will add a new "Media Source" to capture the RTSP stream from your IP camera.

1.  **Add Media Source:** In OBS, click the `+` button under "Sources" and select "Media Source."
2.  **Configure Media Source:**
    *   **Input:** `rtsp://username:password@192.168.0.50:554/camrealmonitor?channel=1&subtype=0`
        *   `rtsp://`: The protocol for Real-Time Streaming Protocol.
        *   `username:password@`: Your camera's login credentials (if required).
        *   `192.168.0.50`: The IP address of your IP camera.
        *   `554`: The default RTSP port.
        *   `/camrealmonitor?channel=1&subtype=0`: Specific path and parameters for accessing the video stream, which can vary by camera model and manufacturer. Refer to your camera's documentation for the correct path.
> Input Format `rtsp`

## Conclusion

You now have a comprehensive guide to setting up mobile screencasting using both RTMP for Android devices and direct IP camera integration with OBS Studio. These methods provide flexible solutions for a variety of applications, from creating tutorials to live streaming games or presentations. Experiment with these setups to find the best configuration for your specific needs.
    *   Ensure "Local File" is unchecked.