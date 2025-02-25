import {AiDetectOptions, detect as aiDetect} from './ai.js';
import {detect as ldDetect} from './languagedetect.js';
import {detect as tinyDetect} from './tinyld.js';

export enum Detector {
	AI = 'ai',
	LanguageDetect = 'languagedetect',
	TinyLD = 'tinyld',
}

const detectorMap = {
	[Detector.AI]: aiDetect,
	[Detector.LanguageDetect]: ldDetect,
	[Detector.TinyLD]: tinyDetect,
};

export type DetectOptions = {
	detectors?: Detector[];
	aiDetectOptions?: AiDetectOptions;
};

export const detect = async (text: string, options?: DetectOptions) => {
	const {detectors = Object.values(Detector), aiDetectOptions} = options ?? {};

	for (const detector of new Set(detectors)) {
		// eslint-disable-next-line no-await-in-loop
		const language = await detectorMap[detector](text, aiDetectOptions);
		if (language) return language;
	}

	return undefined;
};
