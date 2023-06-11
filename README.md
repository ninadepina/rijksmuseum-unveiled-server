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

-   Go to [Node.js](https://nodejs.org/en/) and download the latest version
-   `$ node install` in your terminal
-   `$ node -v` to check if it's installed

2. Clone this repository

```
$ git clone https://github.com/ninadepina/rijksmuseum-unveiled-server.git
```

3. Create your API key

-   Go to [Rijksstudio](https://www.rijksmuseum.nl/nl/rijksstudio) and sign up
-   Go to advanced settings and request your own personal API key
-   Create a .env file and add your API key

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

In your browser, go to `http://localhost:3000` (you can change the localhost PORT in the .env file)

---

## ⏳ Rendering

### Client side rendering

With client side rendering, all content is rendered in the user's browser. As a result, everything is loaded to 1 HTML file and the content is only displayed when everything is loaded. This is only beneficial for users with fast internet connections. The browser renders all content in the user's browser.

### Server side rendering

With server-side rendering, the content is rendered on the server. All content of a page, including the data, is rendered on the server of the website. As a result, the user will not see half-loaded websites if the connection is not good. Rendering is done on the server, so the user's connection doesn't matter.

---

## 🏋🏻‍♀️ Service worker

The service worker in this code snippet is responsible for caching and handling requests made by the web application. During installation, the service worker adds a set of core assets to a cache named `CORE_CACHE_VERSION`. The `activate` event ensures that the service worker takes control of all active clients.

In the `fetch` event, the service worker determines the type of request being made. If it's a core asset request, the service worker fetches the resource and stores a clone of the response in the `CORE_CACHE_VERSION` cache. If the request fails, it serves the cached response from the `CORE_CACHE_VERSION` cache.

If the request is an HTML request, the service worker first checks the `html-cache` for a matching response. If a response is found, it is returned. Otherwise, it fetches the HTML response, stores a clone of it in the `html-cache`, and returns the response.

The service worker also includes helper functions like `isHtmlGetRequest` and `isCoreGetRequest` to check the type of request being made and `getPathName` to extract the pathname from a request URL. These functions are used in the `fetch` event to determine the appropriate caching and response handling logic.

---

## 💨 Optimizations / critical rendering path

-   Minifying and bundling are common optimization techniques used in web development to improve the performance of websites and web applications. With Gulp, a popular task runner, you can automate the process of minifying and bundling your project's JavaScript, CSS, and other assets.

Minifying (which I did for my CSS and JavaScript) involves reducing the file size of code by removing unnecessary characters, such as whitespace and comments, while preserving the functionality. This process helps to decrease the amount of data that needs to be transferred over the network, resulting in faster load times for users.

Bundling (which I did for my CSS), on the other hand, involves combining multiple files into a single file, reducing the number of network requests required to fetch individual resources. This technique is particularly useful for JavaScript files, where dependencies and modules can be bundled together, improving both performance and maintainability.

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "start:dev": "nodemon --inspect index.js",
    "build": "npm-run-all build:*",
    "build:assets": "node gulp-scripts/gulpfile-assets.js",
    "build:css": "node gulp-scripts/gulpfile-css.js",
    "build:js": "node gulp-scripts/gulpfile-js.js",
    "build:uploads": "node gulp-scripts/gulpfile-uploads.js"
}
```

-   I have added `font-display: swap;` to my fonts, so that a fall-back font is loaded until the real font has been downloaded.

```css
@font-face {
	font-family: 'Rijks-normal';
	src: url('../font/PannoText-Normal.ttf') format('truetype');
	font-display: swap;
}
```

-   I converted the loading of the images to `srcset`. As a result, the browser determines which image is loaded, so that this is the best performance for the website.

```html
{{#each artItem}}
<li>
	<a href="/artItem/{{this.objectNumber}}" aria-label="view details of {{this.title}}">
		<figure>
			<img
				srcset="{{sliceUrl this.webImage.url}}=s500 500w, 
                    {{sliceUrl this.webImage.url}}=s750 750w, 
                    {{sliceUrl this.webImage.url}}=s1000 1000w"
				sizes="(max-width: 600px) 500px, (max-width: 1000px) 750px, 1000px"
				src="{{sliceUrl this.webImage.url}}=s750"
				alt="{{this.longTitle}}" />
		</figure>
		<div>
			<h2>{{this.title}}</h2>
			<p>{{this.principalOrFirstMaker}}</p>
		</div>
	</a>
</li>
{{/each}}
```

The helper (to get the correct url) that I created for this is:

```javascript
sliceUrl: function (url) {
    return (url || []).slice(0, -3);
}
```

-   Added cache control to the application. Cache control headers allow the server to control how long the client (usually a web browser) should cache certain resources. Caching resources can improve performance by reducing the number of requests made to the server.

```javascript
app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
	res.setHeader('Cache-Control', 'max-age=365000000, immutable');
	next();
});
```

-   Added compression, a middleware for Node.js web servers that enables response compression. It automatically compresses the HTTP responses sent by the server before they are sent back to the client. It's a technique used to reduce the size of the data transferred over the network. By compressing the response data, the 'compression' package helps to optimize the performance of web applications by reducing bandwidth usage and improving response times.

```javascript
import compression from 'compression';
app.use(compression());
```

-   Using .svg or .webp images instead of .png or .jpg images. This is because .svg and .webp images are smaller in size and therefore load faster.

<img width="687" alt="Screenshot 2023-06-10 at 21 16 23" src="https://github.com/ninadepina/rijksmuseum-unveiled-server/assets/89778503/5d795dda-0297-455a-881f-4a03bbde207a">

---

## 📈 Activity diagram

![activity diagram](https://user-images.githubusercontent.com/89778503/230193906-b273ccb5-d6cd-4d71-94d3-161fe605d7f7.png)

---

## 👁️ Demo

[reindeer-dirndl.cyclic.app](https://reindeer-dirndl.cyclic.app/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ninadepina/rijksmuseum-unveiled-server/blob/main/LICENSE) file for more details.
