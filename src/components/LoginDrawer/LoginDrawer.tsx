import type { ComponentChildren } from 'preact';
import { cx } from '../../utils/cx';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';
import { Card } from '../Card/Card';
import { useEffect, useMemo, useState } from 'preact/hooks';

export type LoginDrawerProps = {
  open: boolean;
  onClose: () => void;
  variant?: 'desktop' | 'mobile';
  mode?: 'overlay' | 'embedded';
  title?: string;
  class?: string;
  footer?: ComponentChildren;
  defaultCustomerType?: 'personal' | 'business';
  defaultBusinessType?: string;
};

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

export function LoginDrawer(props: LoginDrawerProps) {
  if (!props.open) return null;

  const variant = props.variant ?? 'desktop';
  const mode = props.mode ?? 'overlay';
  const defaultCustomerType = props.defaultCustomerType ?? 'personal';

  const customerTypeOptions = useMemo(
    () => [
      { label: 'Personal', value: 'personal' },
      { label: 'Business', value: 'business' },
    ],
    []
  );

  const businessTypeOptions = useMemo(
    () => [
      { label: 'Retail Store Owner', value: 'retail-store-owner' },
      { label: 'Convenience Shop', value: 'convenience-shop' },
      { label: 'Hospitality', value: 'hospitality' },
      { label: 'Catering & Events', value: 'catering-events' },
      { label: 'Online/Delivery Only', value: 'online-delivery-only' },
      { label: 'Restaurant / Café', value: 'restaurant-cafe' },
      { label: 'Bar / Pub', value: 'bar-pub' },
      { label: 'Bakery / Pastry Shop', value: 'bakery-pastry' },
      { label: 'Food Truck / Mobile Vendor', value: 'food-truck-mobile' },
      { label: 'Grocery / Supermarket', value: 'grocery-supermarket' },
      { label: 'Butcher / Fishmonger', value: 'butcher-fishmonger' },
      { label: 'Delicatessen', value: 'delicatessen' },
      { label: 'Coffee Roaster', value: 'coffee-roaster' },
      { label: 'Winery / Brewery / Distillery', value: 'winery-brewery-distillery' },
      { label: 'Farm / Producer', value: 'farm-producer' },
      { label: 'Wholesale / Distributor', value: 'wholesale-distributor' },
      { label: 'Corporate Catering', value: 'corporate-catering' },
      { label: 'Education (School / University)', value: 'education' },
      { label: 'Healthcare (Hospital / Care Home)', value: 'healthcare' },
      { label: 'Office / Workplace Canteen', value: 'workplace-canteen' },
      { label: 'Community / Non-profit', value: 'community-nonprofit' },
      { label: 'Pop-up / Market Stall', value: 'popup-market-stall' },
      { label: 'Other', value: 'other' },
    ],
    []
  );

  const [customerType, setCustomerType] = useState<'personal' | 'business'>(defaultCustomerType);
  const [businessType, setBusinessType] = useState<string>(props.defaultBusinessType ?? '');
  const [email, setEmail] = useState<string>('');

  const isMobile = variant === 'mobile';

  useEffect(() => {
    if (customerType !== 'business') setBusinessType('');
  }, [customerType]);

  useEffect(() => {
    if (customerType === 'business' && !businessType) {
      setBusinessType(props.defaultBusinessType ?? businessTypeOptions[0]?.value ?? '');
    }
  }, [businessType, businessTypeOptions, customerType, props.defaultBusinessType]);

  const drawer = (
    <div
      class={cx(
        'bg-[color:var(--bl-surface-colour-secondary)]',
        mode === 'overlay' ? 'absolute' : 'relative',
        variant === 'desktop'
          ? cx(
              mode === 'overlay'
                ? 'right-0 top-0 h-full w-full max-w-xl border-l border-[color:var(--bl-border)]'
                : 'w-full max-w-xl rounded-[var(--bl-radius)]',
              'px-[var(--bl-scale-1000)] py-[var(--bl-scale-800)]'
            )
          : cx(
              mode === 'overlay'
                ? cx(
                    'left-0 right-0 bottom-0 w-full',
                    'max-h-[min(90dvh,720px)]',
                    'rounded-t-[var(--bl-radius)] border-t border-[color:var(--bl-border)]'
                  )
                : cx(
                    'mx-auto w-full max-w-[420px]',
                    'max-h-[min(90dvh,720px)]',
                    'rounded-[var(--bl-radius)]'
                  ),
              'overflow-y-auto overscroll-contain',
              'px-[var(--bl-scale-600)] pt-[var(--bl-scale-600)] pb-[calc(var(--bl-scale-600)+env(safe-area-inset-bottom))]'
            ),
        props.class
      )}
    >
      <div class="flex items-center justify-end">
        <button
          type="button"
          aria-label="Close"
          onClick={props.onClose}
          class={cx(
            'inline-flex items-center justify-center',
            'text-[color:var(--bl-fg)]',
            'rounded-[var(--bl-border-radius-md)]',
            'hover:bg-[color:var(--bl-surface-colour-hover)] active:bg-[color:var(--bl-surface-colour-hover)]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bl-primary)]',
            isMobile ? 'size-[var(--bl-scale-500)]' : 'size-[var(--bl-scale-600)]'
          )}
        >
          <XIcon class={cx(isMobile ? 'size-[var(--bl-scale-500)]' : 'size-[var(--bl-scale-600)]')} />
        </button>
      </div>

      <div class={cx('w-full', isMobile ? 'mt-[var(--bl-scale-600)]' : 'mt-[var(--bl-scale-1000)]')}>
        <div class={cx('flex flex-col items-start w-full', isMobile ? 'gap-[var(--bl-spacing-xl)]' : 'gap-[var(--bl-scale-1000)]')}>
          <div class="w-full">
            <div
              class={cx(
                'font-medium leading-[1.2]',
                'text-[color:var(--bl-surface-colour-brand-primary)]',
                isMobile ? 'text-[length:var(--bl-font-size-heading-h6)]' : 'text-[length:var(--bl-font-size-heading-h4)]'
              )}
            >
              {props.title ?? 'Log into your account'}
            </div>
          </div>

          <div class="w-full text-[length:var(--bl-font-size-body-md)] font-normal leading-[1.4] text-[color:var(--bl-fg)]">
            Please enter your email for a one-time-only code
          </div>

          <div class={cx('w-full flex flex-col items-start', isMobile ? 'gap-[var(--bl-scale-600)]' : 'gap-[var(--bl-spacing-xl)]')}>
            <Dropdown
              label="Customer type"
              options={customerTypeOptions}
              value={customerType}
              onChange={(v) => setCustomerType(v as 'personal' | 'business')}
              size={isMobile ? 'sm' : 'md'}
            />

            {customerType === 'business' && (
              <Dropdown
                label="Business type"
                options={businessTypeOptions}
                value={businessType}
                onChange={setBusinessType}
                size={isMobile ? 'sm' : 'md'}
              />
            )}

            <Input
              label="Email"
              placeholder="you@example.com"
              type="text"
              inputMode="email"
              autoComplete="email"
              value={email}
              onInput={setEmail}
              size={isMobile ? 'sm' : 'md'}
            />
          </div>

          <div class={cx('w-full flex flex-col items-start', 'gap-[var(--bl-spacing-md)]')}>
            <Button variant="secondary" size={isMobile ? 'sm' : 'md'} withChevrons={false} class="w-full">
              Continue
            </Button>
            <Button variant="tertiary" size={isMobile ? 'sm' : 'md'} withChevrons={false} class="w-full">
              Login with your password
            </Button>
          </div>

          <div class="w-full">
            <Card
              size={isMobile ? 'sm' : 'md'}
              buttonSize="sm"
              class={isMobile ? '!p-[var(--bl-scale-400)]' : undefined}
              buttonClass={
                isMobile
                  ? '!h-[var(--bl-scale-900)] !px-[var(--bl-scale-200)] !py-[var(--bl-scale-50)] !text-[length:var(--bl-font-size-body-micro)]'
                  : undefined
              }
              title={isMobile ? 'Join the\nfamily.' : 'Join the family.'}
              buttonLabel="Become a member"
              variant="primary"
            />
          </div>
        </div>

        {props.footer && <div class={cx(isMobile ? 'mt-[var(--bl-scale-600)]' : 'mt-[var(--bl-spacing-xl)]')}>{props.footer}</div>}
      </div>
    </div>
  );

  if (mode === 'embedded') return drawer;

  return (
    <div class={cx('fixed inset-0 z-50', props.class)}>
      <div
        class="absolute inset-0 bg-[color:var(--bl-surface-colour-overlay-background)]"
        onClick={props.onClose}
        aria-hidden="true"
      />
      {drawer}
    </div>
  );
}


