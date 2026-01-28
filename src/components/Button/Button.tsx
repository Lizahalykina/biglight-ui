import type { ComponentChildren } from 'preact';
import { cx } from '../../utils/cx';

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md';
  withChevrons?: boolean;
  disabled?: boolean;
  forceState?: 'hover' | 'default';
  onClick?: () => void;
  children?: ComponentChildren;
  class?: string;
};

function ChevronLeftIcon(props: { class?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class={props.class}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: { class?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class={props.class}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'secondary';
  const size = props.size ?? 'md';
  const withChevrons = props.withChevrons ?? true;

  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      data-state={props.forceState === 'default' ? undefined : props.forceState}
      class={cx(
        'inline-flex items-center justify-center font-medium leading-[1.1] transition select-none',
        'whitespace-nowrap',
        'border-0',
        'rounded-[var(--bl-border-radius-round)]',
        'disabled:cursor-not-allowed',
        {
          'px-[var(--bl-spacing-lg)] py-[var(--bl-spacing-sm)] text-[length:var(--bl-font-size-action-sm)]':
            size === 'sm',
          'h-[var(--bl-scale-1200)] p-[var(--bl-spacing-md)] text-[length:var(--bl-font-size-action-md)]':
            size === 'md',
        },
        variant === 'primary' && [
          'border border-transparent',
          'bg-[color:var(--bl-surface-colour-action-primary)]',
          'text-[color:var(--bl-text-colour-action-onprimary)]',
          'hover:bg-[color:var(--bl-surface-colour-action-hover-primary)] hover:text-[color:var(--bl-text-colour-action-inverse)]',
          'active:brightness-95',
          'data-[state=hover]:bg-[color:var(--bl-surface-colour-action-hover-primary)] data-[state=hover]:text-[color:var(--bl-text-colour-action-inverse)]',
          'disabled:bg-[color:var(--bl-surface-colour-disabled-dark)] disabled:text-[color:var(--bl-text-colour-action-disabled)]',
        ],
        variant === 'secondary' && [
          'border border-transparent',
          'bg-[color:var(--bl-surface-colour-action-secondary)]',
          'text-[color:var(--bl-text-colour-action-onsecondary)]',
          'hover:bg-[color:var(--bl-surface-colour-action-hover-secondary)] hover:text-[color:var(--bl-text-colour-action-onprimary)]',
          'active:brightness-95',
          'data-[state=hover]:bg-[color:var(--bl-surface-colour-action-hover-secondary)] data-[state=hover]:text-[color:var(--bl-text-colour-action-onprimary)]',
          'disabled:bg-[color:var(--bl-surface-colour-disabled-dark)] disabled:text-[color:var(--bl-text-colour-action-disabled)]',
        ],
        variant === 'tertiary' && [
          'border border-[length:var(--bl-border-width-md)] border-[color:var(--bl-border-colour-primary)]',
          'bg-transparent',
          'text-[color:var(--bl-text-colour-action-ontertiary)]',
          'enabled:hover:border-transparent enabled:hover:bg-[color:var(--bl-surface-colour-action-hover-primary)] enabled:hover:text-[color:var(--bl-text-colour-action-inverse)]',
          'active:brightness-95',
          'enabled:data-[state=hover]:border-transparent enabled:data-[state=hover]:bg-[color:var(--bl-surface-colour-action-hover-primary)] enabled:data-[state=hover]:text-[color:var(--bl-text-colour-action-inverse)]',
          'disabled:border-[color:var(--bl-border-colour-disabled)] disabled:text-[color:var(--bl-text-colour-action-disabled)]',
        ],
        props.class
      )}
    >
      {withChevrons ? (
        <span class="flex w-full items-center">
          <ChevronLeftIcon class="size-4 shrink-0" />
          <span class="flex-1 px-2 text-center">{props.children}</span>
          <ChevronRightIcon class="size-4 shrink-0" />
        </span>
      ) : (
        props.children
      )}
    </button>
  );
}


