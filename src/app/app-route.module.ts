import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { ProductResolverService } from './product-list/products-resolver.service';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: [ProductResolverService]
    },
    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
