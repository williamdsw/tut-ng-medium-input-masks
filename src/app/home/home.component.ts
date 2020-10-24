import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TipsService } from '../services/tips.service';

import { COUNTRIES_STORE } from '../classes/countries-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // FIELDS

  public form: FormGroup;
  public store = COUNTRIES_STORE;
  public countries: any[] = [];
  public amountAfterTip = 0;
  public splitAmountAfterTip = 0;
  public currency = '';

  // CONSTRUCTOR

  constructor(
    private tipsService: TipsService,
    private formBuilder: FormBuilder) { }

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    this.form = this.formBuilder.group ({
      amount: [null],
      numberOfPeople: [null],
      country: [null],
    });

    if (this.store.countries.length === 0) {
        this.tipsService.getCountries ().subscribe (response => {
        this.store.setCountries (response);
      });
    }
  }

  // HELPER FUNCTIONS

  public calculate() {

    if (this.form.invalid) {
      return;
    }

    const country = this.form.get ('country').value;
    const amount = this.form.get ('amount').value;
    const numberOfPeople = this.form.get ('numberOfPeople').value;

    const COUNTRY = this.store.countries.find (c => c.name === country);
    this.currency = (COUNTRY ? COUNTRY.currencies[0].code : '');
    this.amountAfterTip = (amount * (1 + this.tipsService.getTipRates (country)));
    this.splitAmountAfterTip = (this.amountAfterTip / numberOfPeople);
  }
}
