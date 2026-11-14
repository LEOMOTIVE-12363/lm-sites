import { describe, expect, it } from 'vitest';

import {
  buildSiteNavigationItems,
  FIRST_FRC_OFFICIAL_URL,
  localizedPageHref,
  resolveLegacySectionRoute,
  sitePagePlan,
} from '../src/site-structure';

const labels = {
  'about-frc': '关于 FRC',
  'about-leomotive': '关于 LEOMOTIVE',
  news: '新闻动态',
  sponsors: '赞助商',
  contact: '联系我们',
};

describe('site page structure', () => {
  it('publishes all five Stable navigation destinations as independent routes', () => {
    expect(sitePagePlan.map(({ id, contentId }) => [id, contentId])).toEqual([
      ['about-frc', 'frc'],
      ['about-leomotive', 'team'],
      ['news', 'news'],
      ['sponsors', 'sponsors'],
      ['contact', 'contact'],
    ]);
  });

  it('marks only the current independent page in global navigation', () => {
    const items = buildSiteNavigationItems(labels, 'news', 'en');

    expect(items.filter(({ isCurrent }) => isCurrent)).toEqual([
      expect.objectContaining({ href: '/en/news/', label: '新闻动态' }),
    ]);
    expect(items.filter(({ href }) => href.startsWith('/'))).toHaveLength(4);
  });

  it('opens About FRC on the official FIRST website instead of the local page', () => {
    const [aboutFrc] = buildSiteNavigationItems(labels, 'about-frc', 'zh-cn');

    expect(aboutFrc).toEqual({
      href: FIRST_FRC_OFFICIAL_URL,
      isCurrent: false,
      label: '关于 FRC',
      opensInNewTab: true,
    });
  });

  it('builds localized page paths with stable English slugs', () => {
    expect(localizedPageHref('zh-cn', 'frc')).toBe('/zh-cn/frc/');
    expect(localizedPageHref('en', 'frc')).toBe('/en/frc/');
  });

  it('maps legacy homepage section hashes to their independent routes', () => {
    expect(resolveLegacySectionRoute('#about-frc')).toBe('/frc/');
    expect(resolveLegacySectionRoute('#about-leomotive')).toBe('/team/');
    expect(resolveLegacySectionRoute('#news')).toBe('/news/');
    expect(resolveLegacySectionRoute('#sponsors')).toBe('/sponsors/');
    expect(resolveLegacySectionRoute('#contact')).toBe('/contact/');
    expect(resolveLegacySectionRoute('#unknown')).toBeUndefined();
  });
});
