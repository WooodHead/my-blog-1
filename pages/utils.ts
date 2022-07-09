export const getDateStr = (
	date: Date | string,
	options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
) => {
	const formatter = new Intl.DateTimeFormat(getLang(), options)
	return formatter.format(new Date(date));
}

export const getLang = () => {
	return "en-US";
	//next is a server rendering framework, so the navigator will be a undefined during the server rendering phase.
	if (navigator.languages != undefined)
		return navigator.languages[0];
	return navigator.language;
}