import { suggestions } from './suggestions.js';

const mainContent = document.querySelector('.mainContent');

// idea from https://www.w3schools.com/howto/howto_js_autocomplete.asp
const autocomplete = (input, array) => {
	let currentFocus;

	input.addEventListener('input', function (e) {
		input.value.length > 0 ? mainContent.classList.add('spacing') : mainContent.classList.remove('spacing');

		let autocompleteList,
			autocompleteItem,
			i,
			value = this.value;

		closeAllLists();
		if (!value) return false;
		currentFocus = -1;

		autocompleteList = document.createElement('ul');
		autocompleteList.setAttribute('id', this.id + 'autocompleteList');
		autocompleteList.setAttribute('class', 'autocompleteItems');

		this.parentNode.appendChild(autocompleteList);

		for (i = 0; i < array.length; i++) {
			if (array[i].toUpperCase().indexOf(value.toUpperCase()) > -1) {
				autocompleteItem = document.createElement('li');

				// checks if the input value is in the array item (if yes, highlights it)
				let suggestion = array[i].replace(new RegExp(value, 'gi'), '<strong>$&</strong>');
				autocompleteItem.innerHTML = suggestion;
				autocompleteItem.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

				// adds clicked autocomplete item to input and submits the form
				autocompleteItem.addEventListener('click', function (e) {
					input.value = this.getElementsByTagName('input')[0].value;
					closeAllLists();

					input.form && input.form.submit();
				});

				// sorts items in the list based on if they start with the input value
				array[i].toUpperCase().startsWith(value.toUpperCase())
					? autocompleteList.insertBefore(autocompleteItem, autocompleteList.childNodes[0])
					: autocompleteList.appendChild(autocompleteItem);
			}
		}
	});

	input.addEventListener('keydown', function (e) {
		// autocomplete container (for readability: 'x')
		let x = document.querySelector('#autocompleteList');
		if (x) x = x.getElementsByTagName('li');

		switch (e.key) {
			case 'ArrowDown':
				currentFocus++;
				addActive(x);
				break;
			case 'ArrowUp':
				currentFocus--;
				addActive(x);
				break;
			case 'Enter':
				if (currentFocus > -1 && x) {
					e.preventDefault();
					x[currentFocus].click();
				}
				closeAllLists();
				break;
		}
	});

	const addActive = (x) => {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = x.length - 1;
		if (currentFocus < 0) currentFocus = 0;
		x[currentFocus].classList.add('autocompleteActive');
		// makes sure the active suggestion is always visible
		if (
			x[currentFocus].offsetTop + x[currentFocus].offsetHeight >
			x[0].parentNode.scrollTop + x[0].parentNode.offsetHeight
		) {
			x[0].parentNode.scrollTop =
				x[currentFocus].offsetTop + x[currentFocus].offsetHeight - x[0].parentNode.offsetHeight;
		} else if (x[currentFocus].offsetTop < x[0].parentNode.scrollTop) {
			x[0].parentNode.scrollTop = x[currentFocus].offsetTop;
		}
	};

	const removeActive = (x) => {
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('autocompleteActive');
		}
	};

	const closeAllLists = (e) => {
		const x = document.getElementsByClassName('autocompleteItems');
		for (let i = 0; i < x.length; i++) {
			if (e != x[i] && e != input) x[i].parentNode.removeChild(x[i]);
		}
	};
};

const userInput = document.querySelector('input[name="userInput"]');
autocomplete(userInput, suggestions);
