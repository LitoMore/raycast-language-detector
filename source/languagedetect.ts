import LanguageDetector from 'languagedetect';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export * from './types.js';

export const detect = (
	text: string,
	options: {languageCodeFormat?: LanguageCodeFormat} = {},
): Language | undefined => {
	const {languageCodeFormat} = options;
	const detector = new LanguageDetector();

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		detector.setLanguageType('iso2');
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_3) {
		detector.setLanguageType('iso3');
	}

	const [languageCode] = detector.detect(text, 1)[0] ?? [];
	if (!languageCode) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};
