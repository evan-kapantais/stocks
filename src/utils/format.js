const formatNumber = (number) => {
	let formatted = '';
	for (let i = 0; i < number.length; ++i) {
		formatted += number.split()[i];
		if (number.slice(0, i) % 3 === 0) {
			formatted += ',';
		}
	}

	return formatted;
};

console.log(formatNumber(1000000));
