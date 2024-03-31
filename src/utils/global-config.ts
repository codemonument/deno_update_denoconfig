import { createMemo, createSignal } from "solid-js";

export const [globalConfig, setGlobalConfig] = createSignal({
  verbose: false,
});

export const isVerbose = createMemo(() => globalConfig().verbose);
