import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from './quote/quote.component';
import { QuoteAddComponent } from './quote-add/quote-add.component';
import { QuoteChatComponent } from './quote-chat/quote-chat.component';


@NgModule({
  declarations: [
    QuoteComponent,
    QuoteAddComponent,
    QuoteChatComponent
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    FormsModule
  ]
})
export class QuoteModule { }
