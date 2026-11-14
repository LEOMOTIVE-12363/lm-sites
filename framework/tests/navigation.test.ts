import { describe, expect, it } from 'vitest';

import {
  FIRST_ROBOTICS_COMPETITION_URL,
  createHomeNavigationItems,
} from '../src/navigation';

describe('home navigation', () => {
  it('opens only About FRC on the official FIRST® Robotics Competition website in a new tab', () => {
    const items = createHomeNavigationItems(
      [
        { id: 'about-frc' },
        { id: 'about-leomotive' },
        { id: 'robots' },
        { id: 'achievements' },
      ] as const,
      {
        'about-frc': '关于 FRC',
        'about-leomotive': '关于 LEOMOTIVE',
        robots: '机器人',
        achievements: '赛事成果',
      },
    );

    expect(items).toEqual([
      {
        href: FIRST_ROBOTICS_COMPETITION_URL,
        label: '关于 FRC',
        opensInNewTab: true,
      },
      {
        href: '#about-leomotive',
        label: '关于 LEOMOTIVE',
        opensInNewTab: false,
      },
      {
        href: '#robots',
        label: '机器人',
        opensInNewTab: false,
      },
      {
        href: '#achievements',
        label: '赛事成果',
        opensInNewTab: false,
      },
    ]);
  });
});
