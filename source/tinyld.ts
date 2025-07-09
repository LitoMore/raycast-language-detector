import {iso6393To2T} from 'iso-639-3';
import {detect as tinyDetect, toISO3} from 'tinyld';
import {type Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export * from './types.js';

export const detect = (
	text: string,
	options: {languageCodeFormat?: LanguageCodeFormat} = {},
): Language | undefined => {
	const {languageCodeFormat} = options;
	const code6391 = tinyDetect(text);
	if (!code6391) return undefined;

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		const code6392T = iso6393To2T[toISO3(code6391)];
		if (!code6392T) return undefined;
		return {
			languageCode: code6392T,
			languageName: languageCodeToName(code6392T),
		};
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_3) {
		const code6393 = toISO3(code6391);
		return {
			languageCode: code6393,
			languageName: languageCodeToName(code6393),
		};
	}

	return {
		languageCode: code6391,
		languageName: languageCodeToName(code6391),
	};
};
