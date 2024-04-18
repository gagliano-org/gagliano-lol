---
type: hook
---
This hook is invoked by [git-commit[1]](https://git-scm.com/docs/git-commit) and [git-merge[1]](https://git-scm.com/docs/git-merge), and can be bypassed with the `--no-verify` option. It takes a single parameter, the name of the file that holds the proposed commit log message. Exiting with a non-zero status causes the command to abort.

The hook is allowed to edit the message file in place, and can be used to normalize the message into some project standard format. It can also be used to refuse the commit after inspecting the message file.

The default _commit-msg_ hook, when enabled, detects duplicate `Signed-off-by` trailers, and aborts the commit if one is found.