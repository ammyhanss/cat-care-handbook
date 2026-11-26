import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar.mjs';

export default defineConfig({
  site: 'https://ammyhanss.github.io',
  base: '/cat-care-handbook',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: {
        'zh-TW': '貓咪照護手冊',
        en: 'Cat Care Handbook',
        'zh-CN': '猫咪照护手册',
        ja: '猫のケアハンドブック',
      },
      description: 'Owner education on common cat diseases. Not a substitute for a veterinarian.',
      defaultLocale: 'root',
      locales: {
        root: { label: '繁體中文', lang: 'zh-TW' },
        en: { label: 'English', lang: 'en' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
        ja: { label: '日本語', lang: 'ja' },
      },
      sidebar,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/ammyhanss/cat-care-handbook',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/ammyhanss/cat-care-handbook/edit/main/',
      },
      lastUpdated: false,
      pagination: true,
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      components: {
        Banner: './src/components/Banner.astro',
        PageTitle: './src/components/PageTitle.astro',
        Footer: './src/components/Footer.astro',
      },
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    }),
  ],
});
