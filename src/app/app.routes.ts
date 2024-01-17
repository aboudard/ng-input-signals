import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    
    { path: 'home', loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES) },
    { path: 'product/:id', component: ProductComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

];
