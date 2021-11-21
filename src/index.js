import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBoxEl = document.querySelector('[id="search-box"]');
const countryInfo = document.querySelector('.country-info');

searchBoxEl.addEventListener('input', debounce(() => {
    const name = searchBoxEl.value.trim();
    if (name === '') {
        return countryInfo.innerHTML = ''
    }
    fetchCountries(name).then(onShowCountry).catch(showError)
}, DEBOUNCE_DELAY));



// function onShowCountry () {
//     fetchCountries(searchBoxEl.value.trim())
//         .then(country => {
//             countryInfo.innerHTML = '';

//             if (country.length > 10) {
//                 Notify.info('Too many matches found. Please enter a more specific name.');
//             } else if (country.length >= 2 && country.length <= 10) {
//                 renderCountries(country);
//             } else if (country.length === 1) {
//                 createMarkup(country);
//             }
//         })
// .catch (showError);
// };


function renderCountries (array){
    return array.map(({ flags, name }) => {
        return  `<p>
        <img src="${flags.svg}" alt="flag" width="20px" height="20px">
        ${name.official}
        </p>`
    }).join('')
};

function createMarkup(data) {
    return data.map(({ name, flags, capital, population, languages }) => {
        return `<h1><img src="${flags.svg}" alt="flag" width="30px" height="25px"/>${name.official}</h1>
    <ul>
        <li>Capital:<span>${capital}</span></li>
        <li>Population:<span>${population}</span></li>
        <li>Languages:<span>${Object.values(languages).join(', ')}</span></li>
    </ul>`
    }).join('');
};

function showError(error) {
        console.log(error)
    return countryInfo.innerHTML = '';
};

function onShowCountry(country) {
    if (country.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (country.length >= 2) {
        return countryInfo.innerHTML= renderCountries(country)
    }
    return countryInfo.innerHTML= createMarkup(country)
};