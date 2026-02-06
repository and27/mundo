const noop = () => {};

export function disableDebugLogs() {
  if (process.env.NODE_ENV !== "production") return;
  console.log = noop;
  console.debug = noop;
}
