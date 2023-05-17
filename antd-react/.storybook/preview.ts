import type { Preview } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../src/styles/index.scss';
library.add(fas);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewMode: 'docs',
    options: {
      storySort: {
        order: [
          'Button',
          'Menu',
          'Input',
          'AutoComplete',
          'Upload',
        ],
      },
    },
  },
};

export default preview;
