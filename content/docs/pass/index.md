+++
title = "Pass: The Unix Password Store"
date = "2025-03-13"
draft = false
author = "jaiganesh"
tags = ["pass", "password manager", "cli", "linux", "gpg", "git", "security", "encryption"]
categories = ["security", "utilities"]
featured_image = "/images/thumbnails/pass-the-unix-password-store.webp"
summary = "`pass`, also known as the Unix password store, is a simple, command-line-driven password manager that follows the Unix philosophy. It stores passwords in GPG-encrypted files, organized in a simple directory tree, and can be easily synchronized using Git."
+++

## Introduction

`pass`, also known as the Unix password store, is a simple, command-line-driven password manager that follows the Unix philosophy. It stores passwords in GPG-encrypted files, organized in a simple directory tree, and can be easily synchronized using Git. This guide will walk you through setting up `pass`, generating GPG keys, managing your passwords, and integrating it with Git for secure and version-controlled password management.

## Installation

## Installation

To install `pass` on Debian-based systems (like Ubuntu):

```bash
sudo apt install pass
```

## GPG Key Setup

`pass` relies on GPG (GNU Privacy Guard) for encrypting your passwords. You'll need a GPG key pair to initialize your password store. If you don't have one, you can generate a new key.

### Generate a New GPG Key

```bash
gpg --full-gen-key
```
During the key generation process, you'll be prompted for several choices:
*   **Kind of key:** Choose `(1) RSA and RSA` (default).
*   **Key size:** `4096` bits is recommended for strong security.
*   **Key expiration:** Set an expiration date (e.g., `1y` for one year) or choose `0` for no expiration.
*   **User ID:** Enter your real name and email address.
*   **Passphrase:** Choose a strong, memorable passphrase for your GPG key. This passphrase will be required to decrypt your passwords.

### Identify Your GPG Key ID

After generating or if you already have a GPG key, you need to identify its Key ID. This ID will be used to initialize `pass`.

```bash
gpg --list-secret-keys --keyid-format LONG
```
Look for a line similar to `sec   rsa4096/YOUR_KEY_ID 2023-01-01 [SC]` and copy the `YOUR_KEY_ID` part (e.g., `0x12345678ABCDEF`).

## use in pass

## Basic Pass Usage

### Initialize the Password Store

First, initialize your password store with your GPG key ID. This creates the `.password-store` directory in your home directory.

```bash
pass init YOUR_GPG_KEY_ID
```
*   Replace `YOUR_GPG_KEY_ID` with the key ID you identified in the previous step (e.g., `0x12345678ABCDEF`).

### Add a New Password

To add a new password, use `pass insert`. You can organize your passwords in a folder-like structure.

```bash
pass insert folder/title
```
*   You will be prompted to enter the password twice.
*   Example: `pass insert social/facebook` will create a file `~/.password-store/social/facebook.gpg`.

### Retrieve a Password

To retrieve and display a password, use `pass show`. You'll be prompted for your GPG passphrase.

```bash
pass show folder/title
```
*   Example: `pass show social/facebook`

### List Passwords

To list all stored passwords, simply run `pass` or `pass ls`.

```bash
pass
# or
pass ls
```
This will show you the hierarchical structure of your password store.

## Git Integration

One of the powerful features of `pass` is its seamless integration with Git. This allows you to synchronize your password store across multiple devices, maintain a history of changes, and easily recover previous versions of your passwords.

### Initialize Git Repository

To initialize a Git repository within your password store:

```bash
pass git init
```
This command creates a `.git` directory inside `~/.password-store/`.

### Add a Remote Repository (e.g., GitHub)

To synchronize your password store with a remote repository (e.g., a private GitHub repository):

```bash
pass git remote add origin git@github.com:your_username/your_password_repo.git
pass git push -u origin master
```
*   Replace `git@github.com:your_username/your_password_repo.git` with the actual SSH URL of your private repository.
*   Ensure you have SSH keys set up for GitHub access.

### Syncing Changes

After making changes to your password store, you can push them to your remote repository:

```bash
pass git add .
pass git commit -m "Update passwords"
pass git push
```

To pull changes from the remote repository to another device:

```bash
pass git pull
```

## Multiline Passwords and Custom Fields

Sometimes you need to store more than just a single password, such as a username, URL, or notes. `pass` supports multiline entries, allowing you to store structured information within a single password file.

### Using `pass insert -m`

To create a multiline entry, use the `-m` flag with `pass insert`:

```bash
pass insert -m folder/title
```
This will open your default text editor (e.g., `vi`, `nano`) where you can type your multiline content. The first line will be treated as the primary password, and subsequent lines can be custom fields.

### Recommended Multiline Format

A common and recommended format for multiline entries includes fields like username, password, and URL:

```
your_password_here
username: your_username
url: https://example.com
notes: additional notes
```
When you `pass show folder/title`, only the first line (the password) will be displayed by default. To view the entire content, you can use `pass show -c folder/title` to copy the first line, or `pass show folder/title | less` to view the full file.

## GPG Key Backup and Import

Your GPG private key is the master key to your password store. Losing it means losing access to all your encrypted passwords. Therefore, securely backing up your private key is critically important.

### Exporting Your GPG Keys

1.  **Identify Your Key ID:**
    ```bash
gpg --list-secret-keys --keyid-format LONG
    ```
    Note down the `YOUR_KEY_ID` (e.g., `0x12345678ABCDEF`).

2.  **Export Private Key (CRITICAL):**
    This is the most sensitive part. Store `private-key-backup.asc` in a very secure location (e.g., encrypted USB drive, secure cloud storage, hardware security module).

    ```bash
gpg --export-secret-keys --armor YOUR_KEY_ID > private-key-backup.asc
    ```

3.  **Export Public Key (Optional but Recommended):**
    While not as sensitive, backing up your public key is good practice, especially if you share it or need it for verification.

    ```bash
gpg --export --armor YOUR_KEY_ID > public-key-backup.asc
    ```

### Importing Your GPG Keys

If you need to restore your GPG keys on a new system or after a loss:

1.  **Import Private Key:**
    ```bash
gpg --import private-key-backup.asc
    ```
    You will be prompted for the passphrase of the private key.

2.  **Import Public Key (if needed):**
    ```bash
gpg --import public-key-backup.asc
    ```

## Conclusion

`pass` stands out as a powerful, secure, and flexible password manager that aligns perfectly with the Unix philosophy of doing one thing well. By leveraging GPG encryption and Git for synchronization, it provides a robust solution for managing your digital credentials. Integrating `pass` into your daily workflow can significantly enhance your security posture and streamline access to your sensitive information.
