import { NativeModules } from 'react-native'
import { Platform } from 'react-native'
import { camelize } from './utils/string-conversion.util'
import { en, fr } from './supportedLanguages.json'

export function loadTranslations(key) {
  let lang = getDeviceLanguage()
  return loadSpecificKeyTranslation(key, lang)
}

export function getEnglishNameForIcon(name) {
  const lang = getDeviceLanguage()
  if (lang === 'en_CA' || lang === 'en_US') {
    return name
  }
  else {
    if (lang === 'fr') {
      const key = Object.keys(en).find(key => en[key] === name)
      return en[key]
    }
  }
}

export function getDeviceLanguage() {
  let lang = null
  if (Platform.OS === 'ios') {
    lang =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
  } else {
    lang = NativeModules.I18nManager.localeIdentifier
  }
  return lang
}

export function getPriceCategories() {
  const lang = getDeviceLanguage()
  if (lang.includes('fr')) {
    return _getGeneralRestaurantCategories(fr)
  } else {
    return _getGeneralRestaurantCategories(en)
  }
}

export function getCategories() {
  if (Platform.OS === 'ios') {
    const lang =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    return loadSubcategoryTranslations(lang)
  } else {
    const lang = NativeModules.I18nManager.localeIdentifier
    return loadSubcategoryTranslations(lang)
  }
}

export function getPreselectedSubCategories(generalCategory) {
  let lang = null
  if (Platform.OS === 'ios') {
    lang =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
  } else {
    lang = NativeModules.I18nManager.localeIdentifier
  }
  return _convertToObjArray(loadAllTranslation(lang), (key) => {
    const camelCaseGeneralCat = camelize(generalCategory?.replace("generalMenu", ""))
    return key.includes(camelCaseGeneralCat)
  }).map(obj => obj?.value)
}

export function getMenuCategories() {
  if (Platform.OS === 'ios') {
    const lang =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    return loadMenuTranslations(lang)
  } else {
    const lang = NativeModules.I18nManager.localeIdentifier
    return loadMenuTranslations(lang)
  }
}

function _convertToObjArray(obj, filterFunction) {
  const t =  Object.values(
    Object.keys(obj)
      .filter((key) => filterFunction(key))
      .map((object) => {return { key: object, value: obj[object]} })
    )  
    return t
}

function loadMenuTranslations(lang) {
  if (lang.includes('fr')) {
    return _getGeneralMenuCategories(fr)
  } else {
    return _getGeneralMenuCategories(en)
  }
}

function loadSubcategoryTranslations(lang) {
  if (lang.includes('fr')) {
    return _getGeneralCategories(fr)
  } else {
    return _getGeneralCategories(en)
  }
}

function _getGeneralMenuCategories(allTranslations) {
  return _convertToObjArray(allTranslations, (key) => key.includes('generalMenu'))
    .filter((category) => {
      return !category.value.includes('general')
    })
    .map((category, index) => ({ id: index, title: category.value, image: category.key}))
}

function _getGeneralRestaurantCategories(allTranslations) {
  return _convertToObjArray(allTranslations, (key) => {
    return key.includes('restaurants')
  })
    .filter((category) => {
      return !category.value.includes('general')
    })
    .map((category, index) => ({ id: index, title: category }))
}

function _getGeneralCategories(allTranslations) {
  return _convertToObjArray(allTranslations, (key) => !key.includes('general'))
    .filter((category) => {
      return !category.value.includes('general')
    })
    .map((category, index) => ({ id: index, title: category }))
}

function loadSpecificKeyTranslation(key, lang) {
  if (lang.includes('fr')) {
    return fr[key]
  } else {
    return en[key]
  }
}

function loadAllTranslation(lang) {
  if (lang.includes('fr')) {
    return fr
  } else {
    return en
  }
}
