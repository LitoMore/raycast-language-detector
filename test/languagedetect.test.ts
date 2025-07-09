import test from 'ava';
import {sentenceEnglish} from './_helper.test.js';
import {
	LanguageCodeFormat,
	detect as langDetect,
} from 'raycast-language-detector/languagedetect';

test('detects English', (t) => {
	t.deepEqual(langDetect(sentenceEnglish), {
		languageCode: 'en',
		languageName: 'English',
	});

	t.deepEqual(
		langDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_1,
		}),
		{
			languageCode: 'en',
			languageName: 'English',
		},
	);

	t.deepEqual(
		langDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_2,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);

	t.deepEqual(
		langDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_2,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);
});
