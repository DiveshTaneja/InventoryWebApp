import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactoryComponent } from './pages/factory/factory.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path:'',
    component:FactoryComponent,
  },
  {
    path:'factory/:id',
    component:ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
