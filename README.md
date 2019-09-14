[![Netlify Status](https://api.netlify.com/api/v1/badges/2235e531-ad29-4b4a-b306-9b9b9d3bac17/deploy-status)](https://app.netlify.com/sites/vig/deploys)

# Vigor-App

This repo manages the standalone React frontend for the Vigor stablecoin app.
(The frontend integrated into the eosDAC memberclient [can be found here]([https](https://github.com/vigorstablecoin/eosdac-client-extension)).)

# Development

> The `master` branch acts as the stablebranch that will be deployed and any **feature development should branch off `dev`**.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Local development:

```bash
yarn
yarn start
```

Production build:

```bash
yarn
yarn build
```

## Translations

This project uses [react-intl](https://github.com/formatjs/react-intl) for internationaliztion with [react-intl.macro](https://www.npmjs.com/package/react-intl.macro) for automatically extracting and updating translation files.

<details>
  <summary>More Info</summary>
  
  Every text that should be translated needs to be wrapped in a `FormattedMessage` imported from _`react-intl.macro`_ for the automatic string extraction to work.

  ```js
  import { FormattedMessage } from 'react-intl.macro';
  <FormattedMessage id="uniqueId" defaultMessage="Default message in English" />
  ```

  The JSON translation files can be found in `src/modules/i18n/translations`.
  To extract strings and update these translation files with new IDs you run this script:

  ```bash
  yarn run i18n:extract
  ```

  You can then pass these translation files to a translator.

</details>