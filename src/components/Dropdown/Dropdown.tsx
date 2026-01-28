import { cx } from '../../utils/cx';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

export type DropdownOption = { label: string; value: string };

export type DropdownVariant = 'default' | 'focus' | 'selected' | 'disabled' | 'opened';

export type DropdownProps = {
  label?: string;
  value?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
  variant?: DropdownVariant;
  size?: 'xs' | 'sm' | 'md';
  placeholder?: string;
  required?: boolean;
  requiredText?: string;
  showLeftIcon?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  class?: string;
};

function ClockIcon(props: { class?: string }) {
  return (
    <svg
      class={props.class}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 5V8l2 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon(props: { open: boolean; class?: string }) {
  return (
    <svg
      class={props.class}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {props.open ? (
        <path
          d="M4 10L8 6l4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function Dropdown(props: DropdownProps) {
  const size = props.size ?? 'md';
  const variant: DropdownVariant =
    props.disabled || props.variant === 'disabled'
      ? 'disabled'
      : props.variant
        ? props.variant
        : props.value
          ? 'selected'
          : 'default';

  const isForcedFocus = variant === 'focus';
  const isVariantOpened = variant === 'opened';

  const isControlledOpen = props.open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(props.defaultOpen ?? false);

  const effectiveOpen = isVariantOpened ? true : isControlledOpen ? !!props.open : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    props.onOpenChange?.(next);
    if (!isControlledOpen) setUncontrolledOpen(next);
  };

  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const selectedOption = useMemo(() => {
    const v = props.value;
    if (!v) return undefined;
    return props.options.find((o) => o.value === v);
  }, [props.options, props.value]);

  const showLeftIcon = props.showLeftIcon ?? false;
  const requiredText = props.requiredText ?? 'required';

  const isDisabled = variant === 'disabled';
  const isFilled = variant === 'selected' || !!selectedOption;
  const isActive = !isDisabled && (effectiveOpen || isForcedFocus || isVariantOpened);

  const showFloatingLabel = !!props.label && (isActive || isFilled);

  const menuMaxHeightClass =
    size === 'xs'
      ? 'max-h-[calc(var(--bl-scale-3000)+var(--bl-scale-800))]'
      : size === 'sm'
        ? 'max-h-[calc(var(--bl-scale-3000)+var(--bl-scale-1400))]'
        : 'max-h-[calc(var(--bl-scale-3000)+var(--bl-scale-2200))]';

  useEffect(() => {
    if (!effectiveOpen) return;
    const onDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [effectiveOpen]);

  return (
    <div
      class={cx(
        'block w-full',
        isActive && 'relative z-[200]',
        props.class
      )}
      ref={rootRef}
    >
      <div class="relative">
        <button
          ref={buttonRef}
          type="button"
          disabled={variant === 'disabled'}
          aria-haspopup="listbox"
          aria-expanded={effectiveOpen}
          onClick={() => {
            if (variant === 'disabled' || variant === 'opened') return;
            setOpen(!effectiveOpen);
          }}
          class={cx(
            'w-full outline-none',
            size === 'xs'
              ? 'h-[var(--bl-scale-1000)] text-[length:var(--bl-font-size-body-xs)] px-[var(--bl-spacing-sm)]'
              : size === 'sm'
                ? 'h-[var(--bl-scale-1100)] text-[length:calc(var(--bl-font-size-body-xs)+var(--bl-border-width-sm))] px-[var(--bl-spacing-sm)]'
                : 'h-[var(--bl-scale-1300)] text-[length:var(--bl-font-size-body-md)] px-[var(--bl-spacing-sm)]',
            'rounded-[var(--bl-border-radius-md)]',
            // Brand B: when opened, join trigger to the menu (like an expanded input).
            effectiveOpen && '[[data-theme=brandB]_&]:rounded-b-none',
            'flex items-center justify-between gap-2',
            isDisabled && 'bg-[color:var(--bl-surface-colour-disabled-dark)]',
            !isDisabled && isFilled && !isActive && 'bg-[color:var(--bl-surface-colour-page)]',
            !isDisabled && (!isFilled || isActive) && 'bg-[color:var(--bl-surface)]',
            !isDisabled && 'text-[color:var(--bl-fg)]',
            isDisabled && 'text-[color:var(--bl-text-colour-disabled)]',
            isDisabled && 'border border-transparent',
            !isDisabled &&
              (isFilled && !isActive
                ? 'border-[length:var(--bl-border-width-lg)] border-solid border-[color:var(--bl-border-colour-passive)]'
                : isActive
                  ? 'border-[length:var(--bl-border-width-md)] border-solid border-[color:var(--bl-border-colour-passive)]'
                  : 'border-[length:var(--bl-border-width-xs)] border-solid border-[color:var(--bl-border-colour-passive)]'),
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bl-primary)]'
          )}
        >
          <span class="flex min-w-0 flex-1 items-center gap-2">
            {showLeftIcon && (
              <ClockIcon
                class={cx(
                  'shrink-0',
                  isDisabled ? 'text-[color:var(--bl-text-colour-disabled)]' : 'text-[color:var(--bl-fg)]'
                )}
              />
            )}
            <span
              class={cx(
                'min-w-0 truncate text-left',
                selectedOption
                  ? isDisabled
                    ? 'font-medium text-[color:var(--bl-text-colour-disabled)]'
                    : 'font-medium text-[color:var(--bl-fg)]'
                  : isDisabled
                    ? 'text-[color:var(--bl-text-colour-disabled)]'
                    : 'text-[color:var(--bl-text-colour-passive)]'
              )}
            >
              {selectedOption ? selectedOption.label : props.placeholder ?? 'Label'}
            </span>
          </span>

          <ChevronIcon
            open={effectiveOpen}
            class={cx(
              'shrink-0',
              isDisabled ? 'text-[color:var(--bl-text-colour-disabled)]' : 'text-[color:var(--bl-fg)]'
            )}
          />
        </button>

        {showFloatingLabel && (
          <div class="pointer-events-none absolute left-[var(--bl-scale-200)] -top-[var(--bl-scale-200)] flex h-[var(--bl-font-size-body-lg)] items-center">
            {isFilled && !isActive && (
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
                  isDisabled ? 'text-[color:var(--bl-text-colour-disabled)]' : 'text-[color:var(--bl-fg)]'
                )}
              >
                {props.label}
              </span>
            </div>
          </div>
        )}

        {effectiveOpen && (
          <div
            role="listbox"
            class={cx(
              'absolute z-[100] mt-[var(--bl-scale-200)] w-full overflow-hidden',
              'rounded-[var(--bl-border-radius-md)]',
              '[[data-theme=brandB]_&]:mt-0 [[data-theme=brandB]_&]:rounded-t-none',
              '[[data-theme=brandB]_&]:border-[length:var(--bl-border-width-md)] [[data-theme=brandB]_&]:border-solid [[data-theme=brandB]_&]:border-[color:var(--bl-border-colour-passive)] [[data-theme=brandB]_&]:border-t-0',
              'bg-[color:var(--bl-dropdown-surface)]'
            )}
          >
            <div class={cx(menuMaxHeightClass, 'overflow-auto overscroll-contain py-[var(--bl-scale-200)]', 'bl-scrollbar')}>
              {props.options.map((o) => {
                const selected = props.value === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      props.onChange?.(o.value);
                      setOpen(false);
                    }}
                    class={cx(
                      'w-full text-left',
                      size === 'xs'
                        ? 'px-[var(--bl-scale-400)] py-[var(--bl-scale-200)] text-[length:var(--bl-font-size-body-xs)]'
                        : size === 'sm'
                          ? 'px-[var(--bl-scale-400)] py-[calc(var(--bl-scale-200)+var(--bl-border-width-sm))] text-[length:calc(var(--bl-font-size-body-xs)+var(--bl-border-width-sm))]'
                          : 'px-[var(--bl-scale-400)] py-[var(--bl-scale-300)] text-[length:var(--bl-font-size-body-md)]',
                      'text-[color:var(--bl-fg)]',
                      selected ? 'font-medium' : 'font-normal',
                      'hover:bg-[color:var(--bl-dropdown-option-hover-bg)] focus-visible:bg-[color:var(--bl-dropdown-option-hover-bg)]'
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

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


