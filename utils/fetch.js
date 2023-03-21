import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

// fetching data from the Rijkmuseum API based on user input
const fetchData = async (userInput, resultCount) => {
	let data;
	const url = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.API_KEY}&q=${userInput}&ps=${resultCount}&imgonly=true`;

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
	const url = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${process.env.API_KEY}`;

	try {
		data = await (await fetch(url)).json();
		return data.artObject;
	} catch {
		console.error('error');
	}
};

export { fetchData, fetchDataIndividual };
