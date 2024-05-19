import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';
import en from './en.json';
import ko from './ko.json';

function getDeviceLanguage() {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  if (deviceLanguage.toLowerCase().indexOf('ko') >= 0) {
    return 'ko-KR';
  }
  if (deviceLanguage.toLowerCase().indexOf('en') >= 0) {
    return 'en-EN';
  }
  return 'en-EN';
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
    },
    lng: getDeviceLanguage(),
    fallbackLng: {
      'ko-KR': ['ko-KR'],
      'en-EN': ['en-EN'],
      default: ['en-EN'],
    },
    debug: true,
    defaultNS: 'translation',
    ns: 'translation',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(r => {});

export default {i18n, getDeviceLanguage};
