import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { authGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
      path: 'quote',
      component: QuoteComponent,
      canActivate: [authGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
