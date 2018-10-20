import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-quote-manager',
  templateUrl: './admin-quote-manager.component.html',
  styleUrls: ['./admin-quote-manager.component.scss']
})
export class AdminQuoteManagerComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.adminPage;

  elements: any = [];
  headElements = ['ID', 'Author', 'Text', 'Love'];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuotes()
      .subscribe(quotes => { this.elements = quotes;);
  }

}
