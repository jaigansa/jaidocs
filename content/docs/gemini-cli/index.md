+++
title = "Gemini-CLI Setup in Linux"
date = "2024-10-29"
draft = false
author = "jaiganesh"
tags = ["gemini", "cli", "linux", "installation", "configuration", "ai models", "google ai studio"]
categories = ["ai", "tools"]
featured_image = "/images/thumbnails/gemini-cli-setup-in-linux.webp"
summary = "This guide will walk you through setting up the Gemini CLI on a Linux system. The Gemini CLI is a powerful tool for interacting with Google's Gemini models directly from your command line, enabling scripting, automation, and quick experimentation with AI models."
+++
## Introduction

This guide will walk you through setting up the Gemini CLI on a Linux system. The Gemini CLI is a powerful tool for interacting with Google's Gemini models directly from your command line, enabling scripting, automation, and quick experimentation with AI models.

## Installation

1.  **Download the binary:** Download the appropriate binary for your Linux distribution from the official Gemini releases page.

2.  **Make it executable:**
    ```bash
    chmod +x gemini-cli-linux
    ```

3.  **Move and rename the binary to a directory in your PATH:**
    ```bash
    sudo mv gemini-cli-linux /usr/local/bin/gemini
    ```

## Configuration

1.  **Get your API key:** Obtain your API key from Google AI Studio.

2.  **Set the API key as an environment variable:**
    ```bash
    export GEMINI_API_KEY="YOUR_API_KEY"
    ```
    You can add this line to your `~/.bashrc` or `~/.zshrc` file to make it permanent. **Important:** Keep your API key secure and never commit it to version control.

## Basic Usage

1.  **Check the version:**
    ```bash
    gemini --version
    ```

2.  **Run a prompt:**
    ```bash
    gemini "Hello, world!"
    ```

3.  **Use with pipes:**
    ```bash
    cat my_code.py | gemini "Explain this code"
    ```

## Conclusion

You have successfully set up the Gemini CLI on your Linux system. This powerful tool allows for seamless interaction with Google's Gemini models directly from your terminal, opening up possibilities for scripting, automation, and rapid prototyping. Explore the official Gemini CLI documentation for more advanced features and usage examples.
