# raycast-language-detector

Detect languages through Raycast AI or third-party language detectors

[![](https://shields.io/badge/Raycast-Pro_Enhanced-eee?labelColor=FF6363&logo=raycast&logoColor=fff&style=flat-square)](https://github.com/LitoMore/raycast-pro-extensions)

## Install

```shell
npm i raycast-language-detector
```

## Usages

```typescript
import { detect } from "raycast-language-detector";
import { detect as aiDetect } from "raycast-language-detector/ai";
import { detect as langDetect } from "raycast-language-detector/languagedetect";
import { detect as tinyDetect } from "raycast-language-detector/tinyld";

await detect("Favourite colour");
//=> {languageCode: 'en_GB', languageName: 'British English'}

await aiDetect("New Level Unlocked");
//=> {languageCode: 'en', languageName: 'English'}

langDetect("海纳百川，有容乃大");
//=> {languageCode: 'zh', languageName: 'Chinese'}

tinyDetect("一緒に泣いてくれた人");
//=> {languageCode: 'jp', languageName: 'Japanese'}
```

## API

### raycast-language-detector

This uses all possible detectors in the `Detector.AI`, `Detector.LanguageDetect`, `Detector.TinyLD` order. It there is no result, it will fallback to the next detector.

```typescript
export declare const detect: (
	text: string,
	options?: {
		detectors?: Detector[];
		aiDetectOptions?: {
			aiAskOptions?: AI.AskOptions;
			langaugeCodes?: string[];
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

```typescript
export declare const makePrompt: (
	text: string,
	languageCodes?: string[],
) => string;

export declare const detect: (
	text: string,
	options?: { aiAskOptions?: AI.AskOptions; langaugeCodes?: string[] },
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
import { detect as tinyDetect } from "raycast-language-detector/tinyld";

detect("一緒に泣いてくれた人");
//=> {languageCode: 'jp', languageName: 'Japanese'}
```

## License

MIT
