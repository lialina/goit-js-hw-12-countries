import './sass/main.scss';
import CountriesApiService from './js/api-countries.js'
import countryListItem from './country-list-item.hbs';
import countryCard from './country-card.hbs';

import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');

const refs = {
  countryInput: document.querySelector('#country-input'),
  searchResultsList: document.querySelector('.js-countries'),
  countriesContainer: document.querySelector('.js-countries'),
};

refs.countryInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.target.value.trim();

  newsApiService.fetchCountries();
};

function appendMarkup(data) {
  clearCountriesContainer();

  if (refs.countryInput.value.length === 0) {
    clearCountriesContainer();
    return;
  }

  if (data.length === 1) {
    refs.countriesContainer.insertAdjacentHTML('beforeend', countryCard(data));
  }

  if (data.length >= 2 && data.length <= 10) {
    refs.countriesContainer.insertAdjacentHTML('beforeend', countryListItem(data));
  }

  if (data.length > 10) {
    specifyAlert();
  }
};

function clearCountriesContainer() {
  refs.countriesContainer.innerHTML = '';
};

const newsApiService = new CountriesApiService({
  barSelector: ".bar",
  onResolved: appendMarkup,
  onRejected: onError,
});

function onError(err) {
  refs.countriesContainer.innerHTML = "";
  const error = document.createElement("h1");
  error.textContent = "Sorry, we couldn't pull up requested data :(";
  refs.countriesContainer.appendChild(error);
  console.warn(err);
}

function specifyAlert() {
  info({
    text:
      "Too many matches found. Please enter the more specific query!",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  })
};