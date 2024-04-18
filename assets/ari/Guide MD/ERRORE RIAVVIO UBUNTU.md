# ERRORE RIAVVIO UBUNTU

  

Dopo un riavvio inaspettato del sistema ci si puo ritrovare ad un errore di avvio, sarà impossibile accedervi da remoto, dovremo manualmente accedere al raspberry connettendolo ad uno schermo tramite cavo hdmi - mini/hdmi ed una tastiera USB. avviamo il dispositivo e ci troviamo , all'interno della shell initramfs, davanti ad una schermata così:

  

```

fsck from util-linux 2.26.2

/dev/sda6 contains a file system with errors, check forced.

/dev/sda6: Inodes that were part of a corrupted orphan linked list found.

  

/dev/sda6: UNEXPECTED INCONSISTENCY; RUN fsck MANUALLY.

(i.e., without -a or -p options)

fsck exited with status code 4

The root filesystem on /dev/sda6 requires a manual fsck

  

Busybox v1.22.1 (Ubuntu 1:1.22.0-15ubuntu1) built in shell (ash)

Enter 'help' for a list of built-in commands.

  

(initramfs) _

```

  

Digitare - Try this:

(where /dev/sda6 is the partition mentioned)

  

```

fsck /dev/sda6

```

  

And enter Yes (y) to for each error. Or press ‘a’ one time for always-yes.

Then reboot and it should be fine.

  

```

reboot -f

```

  

