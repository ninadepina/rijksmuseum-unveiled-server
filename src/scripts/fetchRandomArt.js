const randomArtForm = document.querySelector('#randomArtForm');
const randomArtImg = document.querySelector('.generateRandomArt > section > img');
const randomArtTitle = document.querySelector('.generateRandomArt > section h2');
const randomArtArtist = document.querySelector('.generateRandomArt > section p');

const fetchRandomArt = async () => {
	const url = `https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&imgonly&ps=100`;

	let data;
	let randomArt;
	let randomNumber;

	// randomArtImg.classList.add('hidden');
	randomArtImg.src = '';
	randomArtImg.alt = '';
	randomArtTitle.textContent = '';
	randomArtArtist.textContent = '';

	// addSkeletonLoader();

	try {
		data = await (await fetch(url)).json();
		randomNumber = Math.floor(Math.random() * data.artObjects.length);

		randomArt = data.artObjects[randomNumber];

		if (!data.artObjects) throw new Error();

		getRandomArt(randomArt);
	} catch {
		defaultArt();
		console.log('error');
	}
};

const getRandomArt = (randomArt) => {
	const randomArtInfo = {
		artImg: randomArt.webImage.url.slice(0, -3) + '=s1000',
		artLongtitle: randomArt.longTitle,
		artTitle: randomArt.title,
		artArtist: randomArt.principalOrFirstMaker
	};

	displayRandomArt(randomArtInfo);
};

const displayRandomArt = (randomArtInfo) => {
	// removeSkeletonLoader();

	// randomArtImg.classList.remove('hidden');
	const imageUrl = randomArtInfo.artImg.slice(0, -6);
	randomArtImg.srcset = `${imageUrl}=s500 500w, ${imageUrl}=s750 750w, ${imageUrl}=s1000 1000w`;
	randomArtImg.sizes = '(max-width: 600px) 500px, (max-width: 1000px) 750px, 1000px';
	randomArtImg.src = `${imageUrl}=s750`;
	randomArtImg.alt = randomArtInfo.artLongtitle;
	randomArtInfo.artTitle.length > 60
		? (randomArtTitle.textContent = randomArtInfo.artTitle.slice(0, 58).trim() + '...')
		: (randomArtTitle.textContent = randomArtInfo.artTitle);
	randomArtArtist.textContent = randomArtInfo.artArtist;
};

randomArtForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchRandomArt();
});
