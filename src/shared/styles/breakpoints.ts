type SIZE_TYPES = 'xs' | 'xs-max' | 'sm' | 'sm-max' | 'md' | 'md-max' | 'lg' | 'lg-max' | 'xl';

const sizes = {
    xs: `492px`,
    'xs-max': `719px`,
    sm: `720px`,
    'sm-max': `995px`,
    md: `996px`,
    'md-max': `1215px`,
    lg: `1216px`,
    'lg-max': `1719px`,
    xl: `1720px`,
};

const lessThan = (sizeName: SIZE_TYPES) => `@media (max-width: ${sizes[sizeName]})`;

const between = (sizeName1: SIZE_TYPES, sizeName2: SIZE_TYPES) =>
    `@media (min-width: ${sizes[sizeName1]}) and (max-width: ${sizes[sizeName2]})`;

const greaterThan = (sizeName: SIZE_TYPES) => `@media (min-width: ${sizes[sizeName]})`;

export const media = {
    xs: lessThan(`xs-max`),
    sm: between(`sm`, `sm-max`),
    md: between(`md`, `md-max`),
    lg: between(`lg`, `lg-max`),
    xl: greaterThan(`xl`),

    lessThan: lessThan,
    between: between,
    greaterThan: greaterThan,
};
