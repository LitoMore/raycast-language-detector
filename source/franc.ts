import {franc} from 'franc';
import {iso6393To1, iso6393To2T} from 'iso-639-3';
import {LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export * from './types.js';

export const detect = (
	text: string,
	options: {languageCodeFormat?: LanguageCodeFormat} = {},
) => {
	const {languageCodeFormat} = options;
	const code6393 = franc(text);
	if (!code6393) return undefined;

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		const code6392 = iso6393To2T[code6393];
		if (!code6392) return undefined;
		return {
			languageCode: code6392,
			languageName: languageCodeToName(code6392),
		};
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_3) {
		return {
			languageCode: code6393,
			languageName: languageCodeToName(code6393),
		};
	}

	const code6391 = iso6393To1[code6393];
	if (!code6391) return undefined;
	return {
		languageCode: code6391,
		languageName: languageCodeToName(code6391),
	};
};
