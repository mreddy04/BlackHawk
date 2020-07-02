import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    productList;
    productBackupList;
    start = 0;
    size = 12;
    pageNumber = 0;
    totalCount;
    pageCount;
    pages;

  constructor(private service: ProductsService,
      private router: Router) { }

  ngOnInit() {
      this.service.fetchItems().subscribe( data => {
           this.productBackupList  = data;
           this.productList = { ...this.productBackupList };
           this.start = 0;
           this.pageNumber = 0;
           this.totalCount = Object.keys(data).length;
          this.pageCount = Math.ceil(this.totalCount / this.size);
          this.getArray();

      });
  }

  getPage(v) {
    const nextPage = this.pageNumber + v;
    if (nextPage < 0 || ((nextPage) * this.size) > this.totalCount) {
        return false;
    }
    this.pageNumber = this.pageNumber + v;
  }

    getPageByNumber(no) {
        this.pageNumber = no;
    }

    getArray() {
        this.pages = Array(this.pageCount);
    }

    goToProduceDetails(key) {
        this.router.navigate(['/products', key]);
    }

}
