import { h } from 'preact';
import type { Preview } from '@storybook/preact-vite';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import type { ThemeName } from '../src/theme/themes';
import '../src/index.css';
import './storybook.css';

const componentThemeOptions: ThemeName[] = ['brandA', 'brandB'];

const previewConfig: Preview = {
  parameters: {
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Components',
          ['Button', 'Card', 'Dropdown', 'Input', 'LoginDrawer'],
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Component theme',
      defaultValue: 'brandA',
      toolbar: { title: 'Theme', items: componentThemeOptions, dynamicTitle: true },
    },
  },
  decorators: [
    (Story, context) =>
      h(ThemeProvider, {
        initialTheme: context.globals.theme as ThemeName,
        children: h(Story, {}),
      }),
  ],
};

export default previewConfig;


