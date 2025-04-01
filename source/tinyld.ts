import {detect as tinyDetect, toISO3} from 'tinyld';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export const detect = (
	text: string,
	options: {languageCodeFormat: LanguageCodeFormat},
): Language | undefined => {
	const code6391 = tinyDetect(text);
	if (!code6391) return undefined;
	const languageName = languageCodeToName(code6391);

	const languageCode =
		options.languageCodeFormat === LanguageCodeFormat.TwoLetter
			? code6391
			: toISO3(code6391);

	return {languageCode, languageName};
};
