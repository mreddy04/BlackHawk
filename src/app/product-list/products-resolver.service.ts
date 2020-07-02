import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductData } from '../services/products.service';
import { ProductsService } from '../services/products.service';

@Injectable({ providedIn: 'root'})
export class ProductResolverService implements Resolve<any> {

    constructor(
        private service: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const products = this.service.getProducts();
        if (products.length === 0) {
            return this.service.fetchItems();
        } else {
            return products;
        }
    }
}
