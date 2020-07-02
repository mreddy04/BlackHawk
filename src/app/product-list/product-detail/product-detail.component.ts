import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    productList;
    product;
    id;
    isProductInStock;
    constructor(
        private service: ProductsService,
        private route: ActivatedRoute
        ) { }

    ngOnInit() {
        this.route.params.subscribe((param: Params) => {
            this.id = +param['id'];
            this.product = this.service.getProductById(this.id);
            this.isProductInStock = this.product.Availability.toLowerCase() === 'a';
        });
    }


}
