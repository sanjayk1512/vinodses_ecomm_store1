import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private rootUrl: string;


  constructor(private httpClient: HttpClient) { 
    this.rootUrl = `${Constants.BACKEND_API_URL}`;
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(`${this.rootUrl}/api/product-category`)
      .pipe(map(response => response._embedded.productCategories));
  }
}

// Interface for mapping the response
interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  };
}
