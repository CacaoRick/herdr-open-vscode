# herdr-open-vscode

A [Herdr](https://herdr.dev) mod: open the focused terminal's folder in your own VS Code.

![Open in VS Code](preview.png)

- A folder on this computer opens locally.
- A folder on another machine opens through [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh): the window is here, the files stay there. Nothing is installed on the other machine.

**Tested so far:** local folders on macOS and Windows, and the URIs with unit tests. Windows-to-remote, the case it was built for, is not confirmed yet.

## Install

Needs VS Code, plus Remote - SSH for other machines.

Ask your agent to add `https://github.com/CacaoRick/herdr-open-vscode`, or copy `mods/open-vscode/` to `mods/` in your Herdr folder (`~/.config/herdr-app`).

This adds no panel or button. Choose how to start it below.

## Use

The mod runs when something calls `mod.open` with its name, so you can put it wherever suits your layout. Herdr's command palette can't list mods yet.

| Start it from | Set it up | Example |
|---|---|---|
| A key | Add a binding under `global` in `keys.json`, or merge this repo's `keys.json` | `"ctrl-shift-e": "mod.open:open-vscode"` |
| A button or menu item | Call it from the click handler in your own mod | `.on_click(() => run("mod.open", { name: "open-vscode" }))` |
| The + menu | Clone the mods and layout below, then add a row to your `new-menu` clone | `this.row("vscode", icon, "Open in VS Code", () => run("mod.open", { name: "open-vscode" }))` |
| A shell or script | Nothing to set up | `herdr-app do mod.open --name open-vscode` |

The + menu is one of Herdr's own mods, which are read-only, so it needs clones. Clones don't receive Herdr's updates.

```sh
herdr-app do mod.clone '{"name":"new-menu","as":"my-new-menu"}'
herdr-app do mod.clone '{"name":"tabs","as":"my-tabs"}'
herdr-app do layout.clone '{"name":"main","as":"my-layout"}'
```

Then point `my-tabs` at `my-new-menu` (the `openOverlay` call on its + button), and point the `tabs` block in `layouts/my-layout.json` at `my-tabs`. Your menu grows by one row, so raise the height in that `openOverlay` call and in `my-new-menu`'s `render`.

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
