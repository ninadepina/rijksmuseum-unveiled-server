import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

// fetching data from the Rijkmuseum API based on user input
const fetchData = async (userInput, resultCount, language) => {
	let data;
	const url = `https://www.rijksmuseum.nl/api/${language}/collection?key=${process.env.API_KEY}&q=${userInput}&ps=${resultCount}&imgonly=true`;

	try {
		data = await (await fetch(url)).json();
		return data.artObjects;
	} catch {
		console.error('error');
	}
};

// fetching data from the Rijkmuseum API based on id
const fetchDataIndividual = async (id, language) => {
	let data;
	const url = `https://www.rijksmuseum.nl/api/${language}/collection/${id}?key=${process.env.API_KEY}`;

	try {
		data = await (await fetch(url)).json();
		return data.artObject;
	} catch {
		console.error('error');
	}
};

// fetching a random art piece from the Rijkmuseum API
const fetchRandomArt = async (language) => {
	let data;
	let randomNumber;
	const url = `https://www.rijksmuseum.nl/api/${language}/collection?key=${process.env.API_KEY}&ps=100&imgonly=true`;

	try {
		data = await (await fetch(url)).json();
		randomNumber = Math.floor(Math.random() * data.artObjects.length);
		return data.artObjects[randomNumber];
	} catch {
		console.error('error');
	}
};

// fetching data from the Rijkmuseum API based on color
const fetchColorData = async (color, language) => {
	if (color) color = color.toUpperCase();
	let data;
	const url = `https://www.rijksmuseum.nl/api/${language}/collection?key=${process.env.API_KEY}&ps=100&imgonly=true&f.normalized32Colors.hex=%20%23${color}`;

	try {
		data = await (await fetch(url)).json();
		return data.artObjects;
	} catch {
		console.error('error');
	}
};

export { fetchData, fetchDataIndividual, fetchColorData, fetchRandomArt };
