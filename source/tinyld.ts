import {detect as tinyDetect, toISO2, toISO3} from 'tinyld';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export * from './types.js';

export const detect = (
	text: string,
	options: {languageCodeFormat?: LanguageCodeFormat} = {},
): Language | undefined => {
	const {languageCodeFormat} = options;
	const code6391 = tinyDetect(text);
	if (!code6391) return undefined;
	const languageName = languageCodeToName(code6391);

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		return {languageCode: toISO2(code6391), languageName};
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_3) {
		return {languageCode: toISO3(code6391), languageName};
	}

	return {languageCode: code6391, languageName};
};
