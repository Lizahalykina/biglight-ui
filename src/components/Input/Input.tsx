import { cx } from '../../utils/cx';
import { useId, useState } from 'preact/hooks';

export type InputVariant = 'default' | 'focus' | 'filled' | 'disabled' | 'error' | 'success';

export type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  autoComplete?: string;
  disabled?: boolean;
  variant?: InputVariant;
  size?: 'xs' | 'sm' | 'md';
  required?: boolean;
  requiredText?: string;
  class?: string;
};

function CheckIcon(props: { class?: string }) {
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
      focusable="false"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: { class?: string }) {
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
      focusable="false"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function Input(props: InputProps) {
  const size = props.size ?? 'md';
  const variant: InputVariant =
    props.disabled || props.variant === 'disabled'
      ? 'disabled'
      : props.variant
        ? props.variant
        : props.value && props.value.length > 0
          ? 'filled'
          : 'default';

  const isError = variant === 'error';
  const isSuccess = variant === 'success';
  const isForcedFocus = variant === 'focus';
  const isDisabled = variant === 'disabled';
  const showStatusIcon = !isDisabled && (isError || isSuccess);

  const [focused, setFocused] = useState(false);
  const isActive = !isDisabled && (focused || isForcedFocus);
  const hasValue = !!(props.value && props.value.length > 0);
  const isFilledVariant = variant === 'filled';
  const showFloatingLabel = !!props.label && (isActive || hasValue || isDisabled);
  const showInlineLabel = !!props.label && !showFloatingLabel;

  const requiredText = props.requiredText ?? 'required';
  const inputId = useId();

  const borderColor = isError
    ? 'var(--bl-border-colour-error)'
    : isSuccess
      ? 'var(--bl-border-colour-positive)'
      : 'var(--bl-border-colour-passive)';

  const placeholder = !props.label || showFloatingLabel ? props.placeholder : undefined;

  return (
    <div class={cx('block w-full', props.class)}>
      <label class="relative block" for={inputId}>
        <input
          id={inputId}
          type={props.type ?? 'text'}
          inputMode={props.inputMode}
          autoComplete={props.autoComplete}
          disabled={isDisabled}
          value={props.value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onInput={(e) => props.onInput?.((e.currentTarget as HTMLInputElement).value)}
          aria-invalid={isError || undefined}
          class={cx(
            'w-full outline-none',
            size === 'xs'
              ? [
                  'h-[var(--bl-scale-1000)] text-[length:var(--bl-font-size-body-xs)] pl-[var(--bl-spacing-sm)]',
                  showStatusIcon ? 'pr-[var(--bl-scale-1000)]' : 'pr-[var(--bl-spacing-sm)]',
                ]
              : size === 'sm'
                ? [
                    'h-[var(--bl-scale-1100)] text-[length:calc(var(--bl-font-size-body-xs)+var(--bl-border-width-sm))] pl-[var(--bl-spacing-sm)]',
                    showStatusIcon ? 'pr-[var(--bl-scale-1000)]' : 'pr-[var(--bl-spacing-sm)]',
                  ]
                : [
                    'h-[var(--bl-scale-1300)] text-[length:var(--bl-font-size-body-md)] pl-[var(--bl-spacing-sm)]',
                    showStatusIcon ? 'pr-[var(--bl-scale-1000)]' : 'pr-[var(--bl-spacing-sm)]',
                  ],
            'rounded-[var(--bl-border-radius-md)]',
            isDisabled && 'bg-[color:var(--bl-surface-colour-disabled-dark)]',
            !isDisabled && isFilledVariant && !isActive && 'bg-[color:var(--bl-surface-colour-page)]',
            // Keep non-filled variants (default/focus/error/success) transparent (no theme surface tint).
            !isDisabled && !isFilledVariant && 'bg-transparent',
            // Only use theme surface fill when explicitly in the "filled" variant and active (focused).
            !isDisabled && isFilledVariant && isActive && 'bg-[color:var(--bl-surface)]',
            !isDisabled && 'text-[color:var(--bl-fg)]',
            isDisabled && 'text-[color:var(--bl-text-colour-disabled)]',
            'placeholder:text-[color:var(--bl-text-colour-passive)]',
            isDisabled && 'border border-transparent',
            !isDisabled &&
              (isFilledVariant && !isActive
                ? `border-[length:var(--bl-border-width-lg)] border-solid border-[color:${borderColor}]`
                : isActive
                  ? `border-[length:var(--bl-border-width-md)] border-solid border-[color:${borderColor}]`
                  : `border-[length:var(--bl-border-width-xs)] border-solid border-[color:${borderColor}]`),
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bl-primary)]'
          )}
        />

        {showStatusIcon && (
          <span
            class={cx(
              'pointer-events-none absolute right-[var(--bl-spacing-sm)] top-1/2 -translate-y-1/2',
              isError ? 'text-[color:var(--bl-text-colour-error)]' : 'text-[color:var(--bl-text-colour-success)]'
            )}
          >
            {isError ? <XIcon class="size-[var(--bl-scale-400)]" /> : <CheckIcon class="size-[var(--bl-scale-400)]" />}
          </span>
        )}

        {showInlineLabel && (
          <span
            class={cx(
              'pointer-events-none absolute left-[var(--bl-spacing-sm)] top-1/2 -translate-y-1/2 truncate',
              size === 'xs'
                ? 'text-[length:var(--bl-font-size-body-xs)]'
                : size === 'sm'
                  ? 'text-[length:calc(var(--bl-font-size-body-xs)+var(--bl-border-width-sm))]'
                  : 'text-[length:var(--bl-font-size-body-md)]',
              isDisabled
                ? 'text-[color:var(--bl-text-colour-disabled)]'
                : isError
                  ? 'text-[color:var(--bl-text-colour-error)]'
                  : 'text-[color:var(--bl-text-colour-passive)]'
            )}
          >
            {props.label}
          </span>
        )}

        {showFloatingLabel && (
          <div class="pointer-events-none absolute left-[var(--bl-scale-200)] -top-[var(--bl-scale-200)] flex h-[var(--bl-font-size-body-lg)] items-center">
            {isFilledVariant && !isActive && (
              <div class="absolute left-0 right-0 top-[var(--bl-scale-200)] h-[var(--bl-border-width-lg)] bg-[color:var(--bl-surface-colour-secondary)]" />
            )}
            <div
              class={cx(
                'relative flex h-[var(--bl-font-size-body-lg)] items-center rounded-[var(--bl-border-radius-md)] px-[var(--bl-scale-100)]',
                'bg-[color:var(--bl-surface-colour-secondary)]'
              )}
            >
              <span
                class={cx(
                  'text-[length:var(--bl-font-size-body-xs)] font-normal leading-none',
                  isDisabled
                    ? 'text-[color:var(--bl-text-colour-disabled)]'
                    : isError
                      ? 'text-[color:var(--bl-text-colour-error)]'
                      : 'text-[color:var(--bl-fg)]'
                )}
              >
                {props.label}
              </span>
            </div>
          </div>
        )}
      </label>

      {props.required && (
        <div class={cx('mt-[var(--bl-scale-100)] px-[var(--bl-scale-50)] text-[length:var(--bl-font-size-body-xs)] font-normal leading-none')}>
          <span class="text-[color:var(--bl-text-colour-warning)]">*</span>
          <span> </span>
          <span class="text-[color:var(--bl-text-colour-disabled)]">{requiredText}</span>
        </div>
      )}
    </div>
  );
}


