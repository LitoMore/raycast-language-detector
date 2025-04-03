import {iso6393To2T} from 'iso-639-3';
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

	if (
		languageCodeFormat === LanguageCodeFormat.ISO_639_2 ||
		languageCodeFormat === LanguageCodeFormat.ISO_639_3
	) {
		detector.setLanguageType('iso3');
	} else {
		detector.setLanguageType('iso2');
	}

	const [languageCode] = detector.detect(text, 1)[0] ?? [];
	if (!languageCode) return undefined;

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		const code6392T = iso6393To2T[languageCode];
		if (!code6392T) return undefined;
		return {
			languageCode: code6392T,
			languageName: languageCodeToName(code6392T),
		};
	}

	return {
		languageCode,
		languageName: languageCodeToName(languageCode),
	};
};
