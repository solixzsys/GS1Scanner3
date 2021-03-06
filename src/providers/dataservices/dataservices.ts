import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataservicesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataservicesProvider Provider');
  }

  getProducts(){
    return this.http.get('assets/data/products.json');
      // .map((response:Response)=>response);
}

}
