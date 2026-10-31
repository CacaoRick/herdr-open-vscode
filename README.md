# herdr-open-vscode

A [Herdr](https://herdr.dev) mod: open the focused terminal's folder in your own VS Code, in one key.

![Open in VS Code](preview.png)

- A folder on this computer opens locally.
- A folder on another machine opens through [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh): the window is here, the files stay there. Nothing is installed on the other machine.

**Tested so far:** a local folder on macOS, and the URIs with unit tests. Windows-to-remote, the case it was built for, is not tested yet.

## Install

Needs VS Code, plus Remote - SSH for other machines.

Ask your agent to add `https://github.com/CacaoRick/herdr-open-vscode`, or do it by hand:

1. Copy `mods/open-vscode/` to `mods/` in your Herdr folder (`~/.config/herdr-app`).
2. Merge `keys.json` into yours, or bind the key you like.

## Use

Press `ctrl-shift-e` (`cmd-shift-e` on macOS). Herdr's command palette can't list mods yet, so use a key, or put it wherever your layout wants it:

| From | Write |
|---|---|
| A key | `"ctrl-shift-e": "mod.open:open-vscode"` in `keys.json` |
| A button in your mod | `run("mod.open", { name: "open-vscode" })` |
| A shell | `herdr-app do mod.open --name open-vscode` |

## If the host doesn't match

The mod uses the machine's ssh target from `hc machine ls`. If VS Code needs another name, or the machine was added with `--via`, create `mods/open-vscode/hosts.json`:

```json
{ "mac": "mac-studio" }
```

The key is the machine's name in Herdr; the value is a Host your ssh config knows.

## What it touches

It runs `code`, `powershell`, `open` or `xdg-open`, and `hc` on this computer, and reads its own `hosts.json`. It has no network access of its own.

## License

MIT
