import {franc} from 'franc';
import {iso6393To1} from 'iso-639-3';
import {languageCodeToName} from './utils.js';

export const detect = (text: string) => {
	const code6393 = franc(text);
	const code6391 = iso6393To1[code6393];
	if (!code6391) return undefined;
	const languageName = languageCodeToName(code6391);
	return {languageCode: code6391, languageName};
};
