import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyserviceService {
  
  constructor(private http: HttpClient) { }

  public getcurriencies() {
    return this.http.get<any>(
      `${environment.url}v1/currency`
    );
  }

  public convert(data) {
    return this.http.post(
       `${environment.url}v1/currency`,
       data
    );
  }
}
