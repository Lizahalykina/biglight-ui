import type { LoginDrawerProps } from './LoginDrawer';

export const loginDrawerExamples: Record<string, Partial<LoginDrawerProps>> = {
  Desktop: {
    variant: 'desktop',
    title: 'Log into your account',
  },
  Mobile: {
    variant: 'mobile',
    title: 'Log into your account',
  },
  Business: {
    variant: 'desktop',
    title: 'Log into your account',
    defaultCustomerType: 'business',
  },
};


