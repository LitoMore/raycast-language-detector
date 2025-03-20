export const languageCodeToName = (languageCode: string): string => {
	languageCode = languageCode.toLowerCase().trim();
	try {
		const name = new Intl.DisplayNames(['en'], {type: 'language'}).of(
			languageCode.replace('_', '-'),
		);
		return name ?? languageCode;
	} catch {
		if (languageCode.length <= 2) return languageCode;
		return languageCodeToName(languageCode.slice(0, 2));
	}
};
