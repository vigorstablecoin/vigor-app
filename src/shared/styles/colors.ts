import { lighten } from 'polished';

const bg = `#13161f`;

export default {
    bg,
    bgLight: lighten(0.05, bg),
    bgLighter: lighten(0.1, bg),
    bgLightest: lighten(0.15, bg),
    white: `#fff`,
    blue: `#2fe7f3`,
};
