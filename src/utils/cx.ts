export type CxArg =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | CxArg[];

export function cx(...args: CxArg[]): string {
  const out: string[] = [];

  const push = (arg: CxArg): void => {
    if (!arg) return;
    if (typeof arg === 'string' || typeof arg === 'number') {
      out.push(String(arg));
      return;
    }
    if (Array.isArray(arg)) {
      for (const item of arg) push(item);
      return;
    }
    for (const [k, v] of Object.entries(arg)) {
      if (v) out.push(k);
    }
  };

  for (const a of args) push(a);
  return out.join(' ');
}


