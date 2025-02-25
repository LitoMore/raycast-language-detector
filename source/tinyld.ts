import {detect as tinyDetect} from 'tinyld';
import {Language} from './types.js';
import {languageCodeToName} from './utils.js';

export const detect = (text: string): Language | undefined => {
	const languageCode = tinyDetect(text);
	if (!languageCode) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};
