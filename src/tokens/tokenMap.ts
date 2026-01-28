import figmaTokens from './figma-tokens.json';

type TokenLeaf = {
  value: unknown;
  type?: string;
};

type TokenTree = TokenLeaf | { [k: string]: TokenTree };

function isLeaf(node: TokenTree): node is TokenLeaf {
  return typeof node === 'object' && node !== null && 'value' in node;
}

function isPlainObject(node: unknown): node is Record<string, unknown> {
  return typeof node === 'object' && node !== null && !Array.isArray(node);
}

export function toCssVarName(path: string[], prefix = 'bl'): `--${string}` {
  const slug = path
    .join('-')
    .replaceAll('/', '-')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/[^a-zA-Z0-9_-]/g, '')
    .toLowerCase();
  return `--${prefix}-${slug}`;
}

export function flattenFigmaTokens(tree: TokenTree, basePath: string[] = []) {
  const out: Array<{ path: string[]; value: unknown; type?: string }> = [];

  const walk = (node: TokenTree, path: string[]) => {
    // Token exports may include metadata arrays/strings (e.g. $metadata.tokenSetOrder).
    // Only walk plain objects; primitives/arrays are ignored.
    if (!isPlainObject(node)) return;
    if (isLeaf(node)) {
      out.push({ path, value: node.value, type: node.type });
      return;
    }
    for (const [k, v] of Object.entries(node)) walk(v, [...path, k]);
  };

  walk(tree, basePath);
  return out;
}

export function tokensToCssVars(tree: TokenTree, opts?: { prefix?: string }) {
  const prefix = opts?.prefix ?? 'bl';
  const cssVars: Record<string, string> = {};
  for (const tok of flattenFigmaTokens(tree)) {
    const name = toCssVarName(tok.path, prefix);
    cssVars[name] = String(tok.value);
  }
  return cssVars;
}

function isTokenRef(value: unknown): value is string {
  return typeof value === 'string' && /^\{[^{}]+\}$/.test(value.trim());
}

function getTokenSetOrder(tokenFile: any): string[] {
  const order = tokenFile?.$metadata?.tokenSetOrder;
  return Array.isArray(order) ? order.filter((x) => typeof x === 'string') : [];
}

function getLeafFromTokenSetRoot(setRoot: any, pathSegments: string[]): TokenLeaf | undefined {
  let node: any = setRoot;
  for (const seg of pathSegments) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[seg];
  }
  return isLeaf(node as TokenTree) ? (node as TokenLeaf) : undefined;
}

function findLeafAcrossTokenSets(tokenFile: any, refPath: string[], searchOrder?: string[]): TokenLeaf | undefined {
  const orderFromFile = getTokenSetOrder(tokenFile);

  // Fall back to "all top-level sets" if metadata is missing.
  const defaultOrder =
    orderFromFile.length > 0
      ? orderFromFile
      : Object.keys(tokenFile ?? {}).filter((k) => k !== '$metadata' && k !== '$themes');

  const setNames = (searchOrder && searchOrder.length > 0 ? searchOrder : defaultOrder).filter(
    (x) => typeof x === 'string'
  );

  for (const setName of setNames) {
    const setRoot = tokenFile?.[setName];
    if (!setRoot) continue;
    const leaf = getLeafFromTokenSetRoot(setRoot, refPath);
    if (leaf) return leaf;
  }
  return undefined;
}

export function resolveFigmaTokenValue(
  rawValue: unknown,
  tokenFile: any,
  opts?: { maxDepth?: number; searchOrder?: string[] }
): unknown {
  const maxDepth = opts?.maxDepth ?? 20;

  let current: unknown = rawValue;
  for (let depth = 0; depth < maxDepth; depth++) {
    if (!isTokenRef(current)) return current;
    const inner = current.trim().slice(1, -1);
    const refPath = inner.split('.').filter(Boolean);
    const leaf = findLeafAcrossTokenSets(tokenFile, refPath, opts?.searchOrder);
    if (!leaf) return current; // leave unresolved; helps debug bad refs
    current = leaf.value;
  }
  return current;
}

function normalizeCssValue(value: unknown, type?: string): string {
  if (typeof value === 'number') return `${value}px`;
  // Some token exports annotate numbers as strings; treat numeric strings as px too.
  if (type === 'number' && typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
    return `${Number(value)}px`;
  }
  return String(value);
}

export function tokensToResolvedCssVars(
  tree: TokenTree,
  opts?: { prefix?: string; tokenFile?: any; maxDepth?: number; searchOrder?: string[] }
) {
  const prefix = opts?.prefix ?? 'bl';
  const tokenFile = opts?.tokenFile ?? (figmaTokens as any);
  const cssVars: Record<string, string> = {};

  for (const tok of flattenFigmaTokens(tree)) {
    const name = toCssVarName(tok.path, prefix);
    const resolved = resolveFigmaTokenValue(tok.value, tokenFile, {
      maxDepth: opts?.maxDepth,
      searchOrder: opts?.searchOrder,
    });
    cssVars[name] = normalizeCssValue(resolved, tok.type);
  }

  return cssVars;
}
export const allTokenCssVars = tokensToCssVars(figmaTokens as unknown as TokenTree, { prefix: 'bl' });


