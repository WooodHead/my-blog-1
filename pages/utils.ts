export const getDateStr = (
	date: Date,
	options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
) => {
	const formatter = new Intl.DateTimeFormat(getLang(), options)
	return formatter.format(date);
}

export const getLang = () => {
	if (navigator.languages != undefined)
		return navigator.languages[0];
	return navigator.language;
}