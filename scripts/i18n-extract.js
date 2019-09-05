const fs = require('fs');
const globSync = require('glob').sync;
const { execSync } = require('child_process')
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../')
const TRANSLATIONS_MODULE = path.resolve(ROOT_DIR, './src/modules/i18n')

function extractMessages() {
  // must provide a relative path for MESSAGE_DIR
  execSync(
    `MESSAGE_DIR='.messages' react-scripts build`,
    {stdio: 'inherit'}
  );
}

function aggregateMessagesToSingleFile(messagesDirPattern) {
  return globSync(messagesDirPattern)
    .map((fileName) => fs.readFileSync(fileName, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((acc, descriptors) => {
      descriptors.forEach(({id, defaultMessage, description, ...other}) => {
        // console.log(id, defaultMessage)
        if (acc.hasOwnProperty(id)) {
          const currentDefaultMessage = acc[id]
          console.warn(`Duplicate message id: ${id}. Default Messages:\n\t"${currentDefaultMessage}"\n\t"${defaultMessage}"`);
        }
        acc[id] = defaultMessage
      });
      return acc;
    }, {});
}

function mergeTranslations(newMessages) {

const translationsPattern = path.resolve(TRANSLATIONS_MODULE, './**/*.json')
  return globSync(translationsPattern)
    .map((fileName) => ({ fileName: fileName, content: fs.readFileSync(fileName, 'utf8')}))
    .map(({ fileName, content }) => ({ fileName, existingTranslations: JSON.parse(content)}))
    .map(({ fileName, existingTranslations }) => {
      const newTranslations = newMessages
      Object.keys(existingTranslations).forEach(translationKey => {
        if(newTranslations.hasOwnProperty(translationKey)) newTranslations[translationKey] = existingTranslations[translationKey]
      })

      const newTranslationsOrdered = {}
      Object.keys(newTranslations).sort((a,b) => a.localeCompare(b)).forEach((key) => {
        newTranslationsOrdered[key] = newTranslations[key];
      });
      return {
        fileName,
        translations: newTranslationsOrdered,
      }
    })
}

extractMessages()
const MESSAGES_PATTERN = path.resolve(ROOT_DIR, './.messages/**/*.json');
const messages = aggregateMessagesToSingleFile(MESSAGES_PATTERN);
const mergedTranslations = mergeTranslations(messages)

for(const translation of mergedTranslations) {
  console.log(`Merging translations file: ${translation.fileName} with ${Object.keys(translation.translations).length} keys`);
  fs.writeFileSync(translation.fileName, JSON.stringify(translation.translations, null, 2));
}