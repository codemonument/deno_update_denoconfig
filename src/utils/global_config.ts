import { createMemo, createSignal } from "solid-js";
import type { LogMode } from "../cli.ts";

export const [logMode, setLogMode] = createSignal<LogMode>("info");
export const [cliVersion, setCliVersion] = createSignal<string>("0.0.0");

export const isLogModeDebug = createMemo(() => logMode() === "debug");
export const isLogModeVerbose = createMemo(() => logMode() === "verbose");
export const isLogModeInfo = createMemo(() => logMode() === "info");
export const isLogModeWarn = createMemo(() => logMode() === "warn");
export const isLogModeError = createMemo(() => logMode() === "error");
