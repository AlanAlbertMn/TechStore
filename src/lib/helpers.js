
const getHeaders = () => {
	return {
		'x-rapidapi-key': process.env.apiKey,
		'x-rapidapi-host': process.env.apiHost,
		'Content-Type': 'application/json',
	};
};

export default getHeaders;
