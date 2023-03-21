import fetch from 'node-fetch';

// fetching data from the Rijkmuseum API based on user input
const fetchData = async (userInput, resultCount) => {
	let data;

	const url = `https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&q=${userInput}&ps=${resultCount}&imgonly=true`;

	try {
		data = await (await fetch(url)).json();

		return data.artObjects;
	} catch {
		console.error('error');
	}
};

// fetching data from the Rijkmuseum API based on id
const fetchDataIndividual = async (id) => {
	let data;

	const url = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=RdKQCPfy`;

	try {
		data = await (await fetch(url)).json();

        console.log(data.artObject)
		return data.artObject;
	} catch {
		console.error('error');
	}
};

export { fetchData, fetchDataIndividual };
