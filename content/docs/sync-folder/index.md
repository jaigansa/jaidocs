+++
title = "Sync Folders with Rsync"
date = "2025-01-15"
draft = false
author = "jaiganesh"
tags = ["rsync", "synchronization", "file transfer", "backup", "linux", "cli", "remote sync"]
categories = ["utilities", "system administration"]
featured_image = "/images/thumbnails/sync-folders-with-rsync.webp"
summary = "Rsync (remote synchronize) is a fast and versatile command-line utility for synchronizing files and directories between two locations. It's widely used for backups, mirroring, and data migration due to its efficiency in transferring only the changed parts of files."
+++

Rsync (remote synchronize) is a fast and versatile command-line utility for synchronizing files and directories between two locations. It's widely used for backups, mirroring, and data migration due to its efficiency in transferring only the changed parts of files. This guide will explore how to use `rsync` for various synchronization tasks, both locally and remotely.

## Understanding rsync Basics

The basic syntax for `rsync` is:

```bash
rsync [options] SOURCE DESTINATION
```

*   **SOURCE:** The file or directory you want to copy or synchronize.
*   **DESTINATION:** The location where you want to copy or synchronize the files.

Here are some commonly used options:

*   `-a`, `--archive`: Archive mode; this is a quick way to tell rsync to enable recursive, copy symlinks, preserve permissions, preserve modification times, preserve group, preserve owner, and preserve device files. It's often the most useful option.
*   `-v`, `--verbose`: Increases verbosity, showing what files are being transferred and providing progress information.
*   `-h`, `--human-readable`: Output numbers in a human-readable format.

### Local to Local Synchronization

To copy or synchronize files and directories locally, you can use the following command:

```bash
rsync -avh /path/to/source /path/to/destination
```
*   Example: `rsync -avh /home/user/documents /mnt/backup/documents`

For more detailed information, refer to the official `rsync` manpage: [Manpage](https://download.samba.org/pub/rsync/rsync.html)

### Local to Remote Synchronization (Push)

To synchronize files from your local machine to a remote server:

```bash
rsync -avh /path/to/local/source user@remote_host:/path/to/remote/destination
```
*   Example: `rsync -avh ~/my_project user@example.com:/var/www/html`

### Remote to Local Synchronization (Pull)

To synchronize files from a remote server to your local machine:

```bash
rsync -avh user@remote_host:/path/to/remote/source /path/to/local/destination
```
*   Example: `rsync -avh user@example.com:/var/www/html ~/backups/website`

### Deleting Files on Destination

To ensure the destination exactly mirrors the source (i.e., delete files on the destination that are no longer on the source), use the `--delete` option:

```bash
rsync -avh --delete /path/to/source /path/to/destination
```
*   **Caution:** Use `--delete` with extreme care, as it will permanently remove files from the destination.

### Excluding Files or Directories

To exclude specific files or directories from the synchronization, use the `--exclude` option:

```bash
rsync -avh --exclude 'node_modules/' --exclude '*.log' /path/to/source /path/to/destination
```
*   You can use multiple `--exclude` options.

### Dry Run

Before executing a potentially destructive `rsync` command (especially with `--delete`), it's highly recommended to perform a dry run using the `--dry-run` or `-n` option. This will show you what `rsync` *would* do without actually making any changes.

```bash
rsync -avhn --delete /path/to/source /path/to/destination
```

## Common Use Cases for rsync

`rsync` is incredibly versatile and can be used for a variety of tasks:

*   **Backups:** Creating incremental backups of your important data to a local or remote drive.
*   **Website Deployment:** Synchronizing website files from your development environment to a production server.
*   **Data Migration:** Moving large amounts of data between servers or storage devices efficiently.
*   **Mirroring:** Maintaining an exact copy of a directory structure in another location.

## Conclusion

`rsync` is a powerful and flexible tool for anyone needing to synchronize files and directories efficiently. Its ability to handle local and remote transfers, coupled with options for fine-grained control over the synchronization process, makes it an essential utility for system administrators, developers, and anyone managing data. By integrating `rsync` into your workflow, you can ensure your data is always where it needs to be, reliably and efficiently.

