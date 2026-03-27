+++
title = "Hugo CLI"
date = "2025-02-14"
draft = false
author = "jaiganesh"
tags = ["hugo", "cli", "auto-completion", "bash", "linux", "productivity"]
categories = ["development", "tools"]
featured_image = "/images/thumbnails/hugo-cli.webp"
summary = "Auto-completion for command-line interface (CLI) tools significantly enhances productivity by reducing typing, minimizing errors, and making it easier to discover available commands and options. If you want auto-completion for Hugo commands in the terminal (CLI), you can enable shell completion for Bash."
+++

# Enable Hugo Auto-Completion in Bash

Auto-completion for command-line interface (CLI) tools significantly enhances productivity by reducing typing, minimizing errors, and making it easier to discover available commands and options. If you want auto-completion for Hugo commands in the terminal (CLI), you can enable shell completion for Bash. Hugo provides built-in auto-completion scripts.

## **1. Generate and Apply Auto-Completion Script**

Run the following command to generate the Hugo auto-completion script and apply it to your current session:

```bash
hugo completion bash | tee /etc/bash_completion.d/hugo
source /etc/bash_completion.d/hugo
```
*   `hugo completion bash`: Generates the Bash completion script for Hugo.
*   `| tee /etc/bash_completion.d/hugo`: Pipes the generated script to `tee`, which writes it to `/etc/bash_completion.d/hugo` (making it available system-wide for Bash completion) and also outputs it to stdout.
*   `source /etc/bash_completion.d/hugo`: Executes the script in the current shell session, immediately enabling auto-completion without restarting the terminal.

If you don’t have root permissions, save it in your home directory instead:

```bash
hugo completion bash > ~/.hugo_completion.sh
echo "source ~/.hugo_completion.sh" >> ~/.bashrc
source ~/.bashrc
```
*   `> ~/.hugo_completion.sh`: Redirects the generated script to a file in your home directory.
*   `echo "source ~/.hugo_completion.sh" >> ~/.bashrc`: Adds a line to your `~/.bashrc` file to source the completion script every time a new Bash session starts.
*   `source ~/.bashrc`: Reloads your `~/.bashrc` file in the current session.

## **2. Test Auto-Completion**

Once this is enabled, you can type `hugo` followed by pressing `Tab` to see available subcommands:

```bash
hugo [TAB][TAB]
```

This should suggest Hugo commands like `new`, `server`, `config`, etc.

## **3. Verify Auto-Completion**

To check if auto-completion is working correctly, restart your terminal and try:

```bash
hugo server[TAB]
```

If completion does not work, ensure that Bash completion is installed:

```bash
sudo apt install bash-completion  # Debian/Ubuntu
sudo yum install bash-completion  # RHEL/CentOS
brew install bash-completion      # macOS
```

After installation, reload your shell:

```bash
exec bash
```
*   `exec bash`: This command replaces the current shell process with a new Bash instance. This is a clean way to ensure all new environment variables and configurations are loaded without fully restarting your terminal application.

## Conclusion

Enabling auto-completion for the Hugo CLI significantly boosts your productivity by streamlining command entry and reducing errors. With these steps, you can now navigate and manage your Hugo projects more efficiently, leveraging the full power of the command line with ease.
