import test from 'ava';
import {
	LanguageCodeFormat,
	detect as detectTinyld,
} from 'raycast-language-detector/tinyld';
import {sentenceEnglish} from './_helper.test.js';

test('detects English', (t) => {
	t.deepEqual(detectTinyld(sentenceEnglish), {
		languageCode: 'en',
		languageName: 'English',
	});

	t.deepEqual(
		detectTinyld(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_1,
		}),
		{
			languageCode: 'en',
			languageName: 'English',
		},
	);

	t.deepEqual(
		detectTinyld(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_2,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);

	t.deepEqual(
		detectTinyld(sentenceEnglish, {
			languageCodeFormat: LanguageCodeFormat.ISO_639_3,
		}),
		{
			languageCode: 'eng',
			languageName: 'English',
		},
	);
});
