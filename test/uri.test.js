import { expect, test } from "bun:test";
import { folderUri, protocolUrl, resolveHost, sshAuthority, uriPath } from "../mods/open-vscode/uri.js";

const hex = (s) => Buffer.from(s).toString("hex");

test("encodes every shell-sensitive character", () => {
  expect(uriPath("/a b/測試/(x)&'y")).toBe("/a%20b/%E6%B8%AC%E8%A9%A6/%28x%29%26%27y");
});
test("keeps Windows drives", () => {
  expect(uriPath("C:\\Users\\a b")).toBe("/C:/Users/a%20b");
  expect(uriPath("C:\\")).toBe("/C:/");
  expect(uriPath("c:")).toBe("/c:/");
});
test("lowercase hosts stay readable", () => {
  expect(sshAuthority("rick@10.0.0.2")).toBe("ssh-remote+rick@10.0.0.2");
  expect(sshAuthority("mac-mini")).toBe("ssh-remote+mac-mini");
});
test("capitals are hex-encoded", () => {
  expect(sshAuthority("MacStudio")).toBe(`ssh-remote+${hex('{"hostName":"MacStudio"}')}`);
});
test("hex is UTF-8, without TextEncoder", () => {
  const original = globalThis.TextEncoder;
  delete globalThis.TextEncoder;
  try {
    expect(sshAuthority("Mäc")).toBe(`ssh-remote+${hex('{"hostName":"Mäc"}')}`);
  } finally {
    globalThis.TextEncoder = original;
  }
});
test("full URIs", () => {
  expect(folderUri("/w/a b", "box")).toBe("vscode-remote://ssh-remote+box/w/a%20b");
  expect(folderUri("/w/a b", null)).toBe("file:///w/a%20b");
  expect(folderUri("C:\\w", null)).toBe("file:///C:/w");
  expect(protocolUrl("/w", "box")).toBe("vscode://vscode-remote/ssh-remote+box/w");
  expect(protocolUrl("C:\\w", null)).toBe("vscode://file/C:/w");
});
test("host comes from the override, then the target", () => {
  const ms = [{ name: "box", target: "rick@box" }, { name: "fly", target: "fly ssh console", via: true }];
  expect(resolveHost("box", ms, {})).toBe("rick@box");
  expect(resolveHost("box", ms, { box: "other" })).toBe("other");
  expect(resolveHost("fly", ms, {})).toBe(null);
  expect(resolveHost("gone", ms, {})).toBe(null);
});
