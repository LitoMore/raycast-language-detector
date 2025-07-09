import {type AiDetectOptions, detect as aiDetect} from './ai.js';
import {detect as francDetect} from './franc.js';
import {detect as ldDetect} from './languagedetect.js';
import {detect as tinyDetect} from './tinyld.js';
import {type LanguageCodeFormat} from './types.js';

export * from './types.js';

export enum Detector {
	AI = 'ai',
	Franc = 'franc',
	LanguageDetect = 'languagedetect',
	TinyLD = 'tinyld',
}

const detectorMap = {
	[Detector.AI]: aiDetect,
	[Detector.Franc]: francDetect,
	[Detector.LanguageDetect]: ldDetect,
	[Detector.TinyLD]: tinyDetect,
};

export type DetectOptions = {
	detectors?: Detector[];
	languageCodeFormat?: LanguageCodeFormat;
	aiDetectOptions?: AiDetectOptions;
};

export const detect = async (text: string, options?: DetectOptions) => {
	const {
		detectors = Object.values(Detector),
		languageCodeFormat,
		aiDetectOptions,
	} = options ?? {};

	for (const detector of new Set(detectors)) {
		// eslint-disable-next-line no-await-in-loop
		const language = await detectorMap[detector](text, {
			languageCodeFormat,
			...aiDetectOptions,
		});
		if (language) {
			return language;
		}
	}

	return undefined;
};
