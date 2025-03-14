import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private rootUrl: string;

  constructor(private httpClient: HttpClient) {
    // Construct the full URL
    this.rootUrl = `${Constants.BACKEND_API_URL}`;
   }

  getProductsByCategory(theCategoryId: number): Observable<Product[]>{
    const searchUrl = `${this.rootUrl}/api/products/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
                          .pipe(map(response=> response._embedded.products));
  }


  getProduct(theProductId:number): Observable<Product>{
    const productUrl = `${this.rootUrl}/api/products/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  

  
searchProducts(theKeyword:string) :Observable<Product[]>{
  const searchUrl = `${this.rootUrl}/api/products/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponse>(searchUrl)
                          .pipe(map(response=> response._embedded.products));
}

  private getProducts(): Observable<Product[]>{

    return this.httpClient.get<GetResponse>(`${this.rootUrl}/api/products/`)
                   .pipe(map(response=> response._embedded.products));

  }
}


interface GetResponse{
    _embedded: {
      products: Product[];
    }
}

