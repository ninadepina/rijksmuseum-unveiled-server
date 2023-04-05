![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# 👋🏼 'Rijksmuseum Unveiled (server)'
'Dutch Delights: Rijksmuseum Unveiled' is a Single Page Application that let's you explore the Rijksmuseum's collection. You can search for artworks, artists and get more information about them.

This specific application is the server-side version of [Dutch Delights: Rijksmuseum Unveiled](https://github.com/ninadepina/rijksmuseum-unveiled).

![bannerRijksUnveiled](https://user-images.githubusercontent.com/89778503/220186555-1a8edc48-35d1-4e9d-ae70-03c9e75730eb.png)

---

## 🛠️ Technologies used
-   Node.js
-   Express
-   Handelbars
-   CSS3
-   JavaScript
-   Rijksmuseum API [(RijksData)](https://data.rijksmuseum.nl/object-metadata/api/)

---

## 👩🏼‍💻 How to use
1. Install Node.js
- Go to [Node.js](https://nodejs.org/en/) and download the latest version
- `$ node install` in your terminal
- `$ node -v` to check if it's installed

2. Clone this repository
```
$ git clone https://github.com/ninadepina/rijksmuseum-unveiled-server.git
```

3. Create your API key
- Go to [Rijksstudio](https://www.rijksmuseum.nl/nl/rijksstudio) and sign up
- Go to advanced settings and request your own personal API key
- Create a .env file and add your API key
```
API_KEY='YOUR_API_KEY'
```

4. Install dependencies
```
$ cd rijksmuseum-unveiled-server
$ npm i
```

5. Run the server
```
$ npm run start
// or when wanting to use nodemon
$ npm run start:dev
```
In your browser, go to `http://localhost:3000`

---

## 💨 Optimizations
- I have added `font-display: swap;` to my fonts, so that a fall-back font is loaded until the real font has been downloaded.
```css
@font-face {
	font-family: 'Rijks-normal';
	src: url('../font/PannoText-Normal.ttf') format('truetype');
	font-display: swap;
}
```

- I converted the loading of the images to `srcset`. As a result, the browser determines which image is loaded, so that this is the best performance for the website.
```html
{{#each artItem}}
	<li>
		<a href='/artItem/{{this.objectNumber}}' aria-label='view details of {{this.title}}'>
			<figure>
				<img
					srcset='{{sliceUrl this.webImage.url}}=s500 500w, 
                    {{sliceUrl this.webImage.url}}=s750 750w, 
                    {{sliceUrl this.webImage.url}}=s1000 1000w'
					sizes='(max-width: 600px) 500px, (max-width: 1000px) 750px, 1000px'
					src='{{sliceUrl this.webImage.url}}=s750'
					alt='{{this.longTitle}}'
				/>
			</figure>
			<div>
				<h2>{{this.title}}</h2>
				<p>{{this.principalOrFirstMaker}}</p>
			</div>
		</a>
	</li>
{{/each}}
```
The helper that I created for this is:
```javascript
sliceUrl: function (url) {
    return (url || []).slice(0, -3);
}
```

- Added cache control to the application
```javascript
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
	res.setHeader('Cache-Control', 'max-age=365000000, immutable');
	next();
});
```

---

## 👁️ Demo

---

## 📄 License
This project is licensed under the MIT License - see the `LICENSE` file for more details.