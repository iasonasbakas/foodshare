import { Component} from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, tap, catchError
 } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: [ './product-search.component.css' ]
})
export class ProductSearchComponent {
  public model: any;
  searching = false;
  searchFailed = false;

  public products$: Observable<Product[]>;

  constructor(private router: Router,
              private productService: ProductService) {
    this.search = this.search.bind(this);

  }

  // Push a search term into the observable stream.
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
                this.productService.searchProducts(term).pipe(
                  tap(() => this.searchFailed = false),
                  catchError(() => {
                    console.log('Failed!');
                    this.searchFailed = true;
                    return of([]);
                  }))
               ),
      tap(() => {this.searching = false;})
    )

  formatter(n: Product) : string {
    return n.name;
  }

  selectedItem(event) : void {
    var product = event.item;
    var id = product.id;
    this.productService.productId = id;
  }

}