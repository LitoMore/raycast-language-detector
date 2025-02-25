import LanguageDetector from 'languagedetect';
import {Language} from './types.js';
import {languageCodeToName} from './utils.js';

export const detect = (text: string): Language | undefined => {
	const detector = new LanguageDetector();
	detector.setLanguageType('iso2');
	const [languageCode] = detector.detect(text, 1)[0] ?? [];
	if (!languageCode) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};
