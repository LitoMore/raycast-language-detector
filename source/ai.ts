import {AI, environment} from '@raycast/api';
import {toISO2, toISO3} from 'tinyld';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';

export * from './types.js';

export const makePrompt = (text: string, languageCodes?: string[]) => {
	return [
		languageCodes
			? `Here is a list of supported language codes: ${languageCodes.join(', ')}`
			: 'Supported language codes can only be in the "xx_XX" format.',
		"(Please note a language may have different branches, like 'en' for English, 'en_US' for American English, and 'en_GB' for British English.)",
		"(For example, some American English words are spelled differently in British English, like 'color' and 'colour'.)",
		"(Chinese has different branches like 'zh_CN' for Simplified Chinese and 'zh_HK' for Traditional Chinese.)",
		'Here are some texts below, please tell what the language is:',
		text,
		"(Please answer with the supported language codes I've mentioned above. Don't reply with any unsupported codes.)",
		'(The answer format is one-line only, no commas, no spaces, no "xx", no "XX", and no extra characters.)',
	].join('\n');
};

const ask = async (prompt: string, aiAskOptions?: AI.AskOptions) => {
	const answer = await AI.ask(prompt, aiAskOptions);
	const languageCode = answer.trim().toLowerCase();
	if (languageCode.startsWith('und')) return undefined;
	const languageName = languageCodeToName(languageCode);
	return {languageCode, languageName};
};

export type AiDetectOptions = {
	aiAskOptions?: AI.AskOptions;
	languageCodes?: string[];
	languageCodeFormat?: LanguageCodeFormat;
};

export const detect = async (
	text: string,
	options: AiDetectOptions = {},
): Promise<Language | undefined> => {
	if (!environment.canAccess(AI)) return undefined;
	const {aiAskOptions, languageCodes, languageCodeFormat} = options;
	const prompt = makePrompt(text, languageCodes);

	const aiResponse = await ask(prompt, aiAskOptions);
	if (!aiResponse) return undefined;

	const code6391 = aiResponse.languageCode.slice(0, 2);
	if (languageCodeFormat === LanguageCodeFormat.ISO_639_1) {
		return {
			languageCode: code6391,
			languageName: aiResponse.languageName,
		};
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_2) {
		return {
			languageCode: toISO2(code6391),
			languageName: aiResponse.languageName,
		};
	}

	if (languageCodeFormat === LanguageCodeFormat.ISO_639_3) {
		return {
			languageCode: toISO3(code6391),
			languageName: aiResponse.languageName,
		};
	}

	return aiResponse;
};

export type CustomPromptDetectOptions = {
	aiAskOptions?: AI.AskOptions;
};

export const customPromptDetect = async (
	prompt: string,
	options: CustomPromptDetectOptions = {},
): Promise<Language | undefined> => {
	if (!environment.canAccess(AI)) return undefined;
	const {aiAskOptions} = options;
	return ask(prompt, aiAskOptions);
};
