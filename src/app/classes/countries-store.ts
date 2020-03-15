import { observable, action } from 'mobx-angular';

export class CountriesStore {

    // FIELDS

    @observable public countries = [];
    @action setCountries(countries) {
        this.countries = countries;
    }
}

export const COUNTRIES_STORE = new CountriesStore ();
