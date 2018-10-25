import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss']
})
export class QuoteDetailComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.quoteDetailPage;

  quote: any;
  comments: any[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.quote = data['quote'];
      this.comments = data['comments'];

      if (this.quote.photoUrl) {
        this.bannerImageUrl = this.quote.photoUrl;
      }
    });
  }

}
