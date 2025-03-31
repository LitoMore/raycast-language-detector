import {franc} from 'franc';
import {iso6393To1} from 'iso-639-3';
import {languageCodeToName} from './utils.js';
import {LanguageCodeFormat} from './index.js';

export const detect = (
	text: string,
	languageCodeFormat: LanguageCodeFormat,
) => {
	const code6393 = franc(text);
	const code6391 = iso6393To1[code6393];
	if (!code6391) return undefined;

	const languageCode =
		languageCodeFormat === LanguageCodeFormat.TwoLetter ? code6391 : code6393;

	const languageName = languageCodeToName(code6391);
	return {languageCode, languageName};
};
