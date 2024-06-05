export function wait(secs: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, secs * 1000);
  });
}
