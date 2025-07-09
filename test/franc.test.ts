import test from 'ava';
import {sentenceEnglish} from './_helper.test.js';
import {
	LanguageCodeFormat,
	detect as francDetect,
} from 'raycast-language-detector/franc';

test('detects English', (t) => {
	t.deepEqual(francDetect(sentenceEnglish), {
		languageCode: 'en',
		languageName: 'English',
	});

	t.deepEqual(
		francDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_1,
		}),
		{
			languageCode: 'en',
			languageName: 'English',
		},
	);

	t.deepEqual(
		francDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_2,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);

	t.deepEqual(
		francDetect(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_3,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);
});
