import { cx } from '../../utils/cx';
import { Button, type ButtonProps } from '../Button/Button';
import IconSvg from '../../assets/Icon.svg';

export type CardProps = {
  size?: ButtonProps['size'];
  buttonSize?: ButtonProps['size'];
  buttonClass?: string;
  class?: string;
  title: string;
  text?: string;
  buttonLabel: string;
  onButtonClick?: ButtonProps['onClick'];
  variant?: ButtonProps['variant'];
  buttonDisabled?: ButtonProps['disabled'];
  iconSrc?: string;
  withButtonIcon?: boolean;
};

function UserIcon(props: { class?: string }) {
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
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

export function Card(props: CardProps) {
  const size = props.size ?? 'md';
  const withButtonIcon = props.withButtonIcon ?? true;
  const buttonSize = props.buttonSize ?? size;
  const buttonVariant = props.variant ?? 'primary';
  const graphicWidthClass =
    size === 'sm'
      ? 'w-[clamp(var(--bl-scale-1800),26%,var(--bl-scale-2600))]'
      : 'w-[clamp(var(--bl-scale-2600),46%,calc(var(--bl-scale-3000)+var(--bl-scale-1800)))]';
  const paddingClass = size === 'sm' ? 'p-[var(--bl-scale-500)]' : 'p-[var(--bl-scale-600)]';
  const gapClass = size === 'sm' ? 'gap-[var(--bl-scale-500)]' : 'gap-[var(--bl-spacing-xl)]';
  const titleClass =
    size === 'sm'
      ? 'text-[length:var(--bl-scale-500)] leading-[1.2]'
      : 'text-[length:var(--bl-font-size-heading-h5)] leading-[1.2]';
  return (
    <div
      class={cx(
        'flex items-stretch justify-between',
        gapClass,
        paddingClass,
        size === 'sm'
          ? 'h-[calc(var(--bl-scale-3000)+var(--bl-scale-400)+var(--bl-border-width-lg))] w-full'
          : 'h-[calc(var(--bl-scale-3000)+var(--bl-scale-1800)+var(--bl-border-width-lg))] w-full',
        'rounded-[var(--bl-border-radius-xl)] bg-[color:var(--bl-surface-colour-brand-primary)]',
        props.class
      )}
    >
      <div class={cx('min-w-0 flex-1 self-stretch', 'flex flex-col items-start', gapClass)}>
        <div class="min-w-0 w-full">
          <div
            class={cx(
              'font-medium text-[color:var(--bl-text-colour-action-inverse)]',
              titleClass,
              'whitespace-pre-wrap'
            )}
          >
            {props.title}
          </div>
        </div>

        <Button
          size={buttonSize}
          variant={buttonVariant}
          withChevrons={false}
          disabled={props.buttonDisabled}
          onClick={props.onButtonClick}
          class={cx(
            // Brand B Cards: default button should be black (but only for "primary" buttons).
            buttonVariant === 'primary' && [
              '[[data-theme=brandB]_&]:enabled:!bg-[color:var(--bl-surface-colour-action-hover-primary)]',
              '[[data-theme=brandB]_&]:enabled:!text-[color:var(--bl-text-colour-action-inverse)]',
            ],
            props.buttonClass
          )}
        >
          <span class="flex items-center">
            {withButtonIcon ? (
              <UserIcon class={cx('shrink-0', buttonSize === 'sm' ? 'size-3' : 'size-4')} />
            ) : null}
            <span class={cx('text-center', withButtonIcon ? 'px-2' : 'px-1')}>{props.buttonLabel}</span>
          </span>
        </Button>
      </div>

        <img
          src={props.iconSrc ?? IconSvg}
          alt=""
          aria-hidden="true"
        class={cx(
          'shrink-0 self-stretch',
          graphicWidthClass,
          'block aspect-square max-h-full object-contain object-top'
        )}
        />
    </div>
  );
}

