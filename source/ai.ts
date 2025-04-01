import {AI, environment} from '@raycast/api';
import {Language, LanguageCodeFormat} from './types.js';
import {languageCodeToName} from './utils.js';
import { toISO3} from 'tinyld';

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
};

export const detect = async (
	text: string,
	options: {
		languageCodeFormat: LanguageCodeFormat;
		aiDetectOptions: AiDetectOptions;
	},
): Promise<Language | undefined> => {
	if (!environment.canAccess(AI)) return undefined;
	const {aiAskOptions, languageCodes} = options.aiDetectOptions;
	const prompt = makePrompt(text, languageCodes);

	const aiResponse = await ask(prompt, aiAskOptions);
	if (!aiResponse) return undefined;

	// AI prompt returns language code in xx_XX format, first part is two letter language code in ISO-639-1 standard
	const code6931 = aiResponse.languageCode.split("_")[0]
	if (!code6931) return undefined

	const languageCode =
		options.languageCodeFormat === LanguageCodeFormat.TwoLetter
			? code6931
			: toISO3(code6931);

	if (!languageCode) return undefined;
	const languageName = aiResponse.languageName
	return {languageCode, languageName}
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
