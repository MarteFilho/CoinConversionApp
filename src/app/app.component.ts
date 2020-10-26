import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyserviceService }  from './services/currencyservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoinConversion';
  public form: FormGroup;
  currencies: any = [];
  convertedvalue: any;
  objectKeys = Object.keys;
  success = false;
  isLoaded = false;
  constructor(
    private Service : CurrencyserviceService,
    private fb: FormBuilder,
    ) {
      this.form = this.fb.group({
      amount: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      currencyOrigin: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      currencyDestination: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.Service.getcurriencies().subscribe(
      (data: any) => {
        this.currencies = Object.entries(data.rates);
        console.log(this.currencies);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public submit(){
      this.Service.convert(this.form.value).subscribe(
        (data: any) => {
          console.log(data)
          this.success = data.success;
          this.isLoaded = true;
          console.log(this.success)
          this.convertedvalue = data;
        }
      );
  }
}
