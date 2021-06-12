export default class CountriesApiService {
    constructor({onRejected, onResolved, barSelector}) {
        this.searchQuery = '';
        this.barSelector = this.getLoader(barSelector);
        this.onResolved = onResolved;
        this.onRejected = onRejected;
    }

    getLoader(barSelector) {
        const barElement = document.querySelector(`${barSelector}`);
        return { barElement };
    }

    fetchCountries() {
        this.barSelector.barElement.classList.remove('is-hidden');
        const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;
        
        return fetch(url)
            .then(this.onFetch)
            .then(response => {
                this.barSelector.barElement.classList.add('is-hidden');
                this.onResolved(response);
            })
            .catch(response => {
                this.barSelector.barElement.classList.add('is-hidden');
                this.onRejected(response);
            });
        }

    onFetch(response) {
        if (response.ok) {
        return response.json();
        } else if (response.status === 404) {
        throw "Invalid entry. Please try again.";
        } else {
        throw "It seems there are some server issues.";
        }
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }  
};