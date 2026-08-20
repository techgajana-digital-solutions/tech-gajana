import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://www.techgajana.org',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Optional customizations:
  // exclude: ['/admin/*', '/private/*'],
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     'https://www.techgajana.org/server-sitemap.xml',
  //   ],
  // },
};

export default config;