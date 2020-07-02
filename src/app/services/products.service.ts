import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs/operators';

export interface ProductData {
    availability: string;
    descriptions: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private products: ProductData[] = [];
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    fetchItems() {
        return this.http.get('https://blackhawk-298b9.firebaseio.com/fashion.json')
        .pipe(
            map((items: [ProductData]) => {
                return items.reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {});
            }),
            tap((data) => {
                this.setProducts(data);
            })
        );
    }

    setProducts(data) {
        this.products = data;
    }

    getProducts(data) {
        return this.products.slice();
    }

    getProductById(id) {
        return this.products[id];
    }
}
