import type { ComponentChildren } from 'preact';
import { cx } from '../../utils/cx';

export type PanelProps = {
  title?: string;
  children?: ComponentChildren;
  class?: string;
};

export function Panel(props: PanelProps) {
  return (
    <div
      class={cx(
        'rounded-[var(--bl-radius)] border border-[color:var(--bl-border)] bg-[color:var(--bl-surface)] p-4',
        props.class
      )}
    >
      {props.title && <div class="mb-2 text-sm font-semibold text-[color:var(--bl-fg)]">{props.title}</div>}
      <div class="text-sm text-[color:var(--bl-muted)]">{props.children}</div>
    </div>
  );
}


