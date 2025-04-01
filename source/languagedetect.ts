import LanguageDetector from 'languagedetect';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export const detect = (
	text: string,
	options?: {languageCodeFormat: LanguageCodeFormat},
): Language | undefined => {
	const detector = new LanguageDetector();
	const languageType =
		options?.languageCodeFormat === LanguageCodeFormat.TwoLetter
			? 'iso2'
			: 'iso3';
	detector.setLanguageType(languageType);
	const [languageCode] = detector.detect(text, 1)[0] ?? [];
	if (!languageCode) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};
