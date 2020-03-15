import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  // FIELDS

  private roundUpCountries: string = 'France,Italy,Hungary,Greece,Latvia';
  private fivePercentTipCountries: string = 'Ecuador,Argentina,Austria,Albania,Turkey,India,Slovenia,Romania,Lithuania,Russia';
  private tenPercentTipCountries: string = 'Colombia,Slovakia,Estonia,Cuba,Uruguay,Bulgaria';
  private fifteenPercentTipCountries: string = 'Serbia,Canada,Mexico,Chile,Poland,Ukraine,Egypt,Armenia';

  // CONSTRUCTOR

  constructor(private httpClient: HttpClient) { }

  // HELPER FUNCTIONS

  public getCountries() {
    return this.httpClient.get ('https://restcountries.eu/rest/v2/all');
  }

  public getTipRates(country: string) {
    const ROUND_UP_COUNTRIES = this.roundUpCountries.split (',').map (country => country.trim ());
    const FIVE_PERCENT_TIP_COUNTRIES = this.fivePercentTipCountries.split (',').map (country => country.trim ());
    const TEN_PERCENT_TIP_COUNTRIES = this.tenPercentTipCountries.split (',').map (country => country.trim ());
    const FIFTEEN_PERCENT_TIP_COUNTRIES = this.fifteenPercentTipCountries.split (',').map (country => country.trim ());
    const TWENTY_PERCENT_TIP_COUNTRIES = ['United States'];
    
    if (TWENTY_PERCENT_TIP_COUNTRIES.includes (country)) {
      return 0.2;
    }
    
    if (FIFTEEN_PERCENT_TIP_COUNTRIES.includes (country)) {
      return 0.15;
    }
    
    if (TEN_PERCENT_TIP_COUNTRIES.includes (country)) {
      return 0.1;
    }
    
    if (FIVE_PERCENT_TIP_COUNTRIES.includes (country) || ROUND_UP_COUNTRIES.includes (country)) {
      return 0.05;
    }

    return 0;
  }
}
