import LanguageDetector from 'languagedetect';
import {Language} from './types.js';
import {languageCodeToName} from './utils.js';
import {LanguageCodeFormat} from "./index.js";

export const detect = (text: string, languageCodeFormat: LanguageCodeFormat ): Language | undefined => {
	const detector = new LanguageDetector();
	const languageType = languageCodeFormat === LanguageCodeFormat.TwoLetter ? "iso2" : "iso3";
	detector.setLanguageType(languageType);
	const [languageCode] = detector.detect(text, 1)[0] ?? [];
	if (!languageCode) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};
