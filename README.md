# raycast-language-detector

Detect languages through Raycast AI or third-party language detectors

[![](https://shields.io/badge/Raycast-Pro_Enhanced-eee?labelColor=FF6363&logo=raycast&logoColor=fff&style=flat-square)](https://github.com/LitoMore/raycast-pro-enhanced-extensions)

## Install

```shell
npm i raycast-language-detector
```

## Usages

```typescript
import { detect } from "raycast-language-detector";
import { detect as aiDetect } from "raycast-language-detector/ai";
import { detect as francDetect } from "raycast-language-detector/franc";
import { detect as langDetect } from "raycast-language-detector/languagedetect";
import { detect as tinyDetect } from "raycast-language-detector/tinyld";

await detect("Favourite colour");
//=> {languageCode: 'en_GB', languageName: 'British English'}

await aiDetect("New Level Unlocked");
//=> {languageCode: 'en', languageName: 'English'}

francDetect("여기서요?");
//=> {languageCode: 'ko', languageName: 'Korean'}

langDetect("海纳百川，有容乃大");
//=> {languageCode: 'zh', languageName: 'Chinese'}

tinyDetect("一緒に泣いてくれた人");
//=> {languageCode: 'jp', languageName: 'Japanese'}
```

## API

### raycast-language-detector

This uses all possible detectors in the `Detector.AI`, `Detector.Franc`, `Detector.LanguageDetect`, `Detector.TinyLD` order. It there is no result, it will fallback to the next detector.

The fallthrough order of detectors can be customized, you can simply pass in an array of `Detector` to `options.detectors`.

```typescript
export declare const detect: (
	text: string,
	options?: {
		detectors?: Detector[];
		aiDetectOptions?: {
			aiAskOptions?: AI.AskOptions;
			languageCodes?: string[];
		};
	},
) => Promise<Language | undefined>;
```

```typescript
import { detect } from "raycast-language-detector";

await detect("Viel Glück");
//=> {languageCode: 'de_DE', languageName: 'German (Germany)'}
```

### raycast-language-detector/ai

This uses the [Raycast AI](https://developers.raycast.com/api-reference/ai) for detecting text.

You don't have to check user's permission to Raycast AI before using this. We already handled it for you. It will return a `undefined` if the user doesn't have access to Raycast AI.

```typescript
export declare const makePrompt: (
	text: string,
	languageCodes?: string[],
) => string;

export declare const detect: (
	text: string,
	options?: { aiAskOptions?: AI.AskOptions; languageCodes?: string[] },
) => Promise<Language | undefined>;

export declare const customPromptDetect: (
	prompt: string,
	options?: { aiAskOptions?: AI.AskOptions },
) => Promise<Language | undefined>;
```

```typescript
import { detect, customPromptDetect } from "raycast-language-detector/ai";

await detect("colour", { languageCodes: ["en_US", "en_GB"] });
//=> {languageCode: 'en_GB', languageName: 'British English'}

// Create a custom prompt which detects `en_US` and `en_GB` only
const customPrompt = makePrompt("pieapple pizza", ["en_US", "en_GB"]);
await customPromptDetect(customPrompt);
//=> {languageCode: 'en_US', languageName: 'American English'}
```

### raycast-language-detector/franc

This uses the [franc](https://npmjs.com/franc) for detecting text.

```typescript
export declare detect: (text: string) => Language | undefined;
```

```typescript
import { detect } from "raycast-language-detect/franc";

detect("여기서요?");
//=> {languageCode: 'ko', languageName: 'Korean'}
```

### raycast-language-detector/languagedetect

This uses the [languagedetect](https://npmjs.com/langugagedetect) for detecting text.

```typescript
export declare const detect: (text: string) => Language | undefined;
```

```typescript
import { detect } from "raycast-language-detector/languagedetector";

detect("海纳百川，有容乃大");
//=> {languageCode: 'zh', languageName: 'Chinese'}
```

### raycast-language-detector/tinyld

This uses the [tinyld](https://npmjs.com/tinyld) for detecting text.

```typescript
export declare const detect: (text: string) => Language | undefined;
```

```typescript
import { detect } from "raycast-language-detector/tinyld";

detect("一緒に泣いてくれた人");
//=> {languageCode: 'jp', languageName: 'Japanese'}
```

### raycast-language-detector/utils

It exposes some useful utilities for detecting languages.

#### languageCodeToName(languageCode: string): string

It uses JavaScript built-in [`Intl.DisplayNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames#language_display_names) for converting language code to the name.

The input value can be a `languageCode` ["-" `scriptCode`] ["-" `regionCode` ] \*("-" `variant` ) subsequence of the unicode_language_id grammar in [UTS 35's Unicode Language and Locale Identifiers grammar](https://unicode.org/reports/tr35/#Unicode_language_identifier). `languageCode` is either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code.

```typescript
import { languageCodeToName } from "raycast-language-detector/utils";

languageCodeToName("en");
//=> 'English'

languageCodeToName("eng");
//=> 'English'

languageCodeToName("en_US");
//=> 'American English'

languageCodeToName("en_GB");
//=> 'British English'
```

## Who's using `raycast-langauge-detector`?

- [Language Detector](https://raycast.com/litomore/language-detector) - Detect languages through Raycast AI or third-party language detectors

## License

MIT
