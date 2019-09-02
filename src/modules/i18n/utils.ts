export type TLanguageCodes = `en` | `zh` | `ko`;

export const supportedLanguageCodes = [`en`, `zh`, `ko`];

export const getFullLanguage = code => {
    switch (code) {
        case `zh`:
            return `中文`;
        case `ko`:
            return `한국어`;
        case `en`:
        default:
            return `English`;
    }
};

export const getLanguageFlag = code => {
    switch (code) {
        case `zh`:
            return `🇨🇳`;
        case `ko`:
            return `🇰🇷`;
        case `en`:
        default:
            return `🇺🇸`;
    }
};
