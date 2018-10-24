import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit, OnDestroy {

  @Input() headerClasss = 'blue-gradient';
  @Input() quote: any;

  private tokenSubscription: Subscription;
  private currentUserId: string;

  isLoved: boolean;
  numOfLoves: number;

  constructor(private authService: AuthService,
    private quoteService: QuoteService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.tokenSubscription = this.authService.decodedToken$
      .subscribe(token => {
        if (token) {
          this.currentUserId = token.id;
        }
      });

    this.updateValues();
  }

  loveQuote() {
    if (!this.currentUserId) {
      this.alertService.error('You need to login to love this quote');
      return;
    }

    if (this.isLoved) {
      this.numOfLoves -= 1;
    } else {
      this.numOfLoves += 1;
    }

    this.isLoved = !this.isLoved;

    this.quoteService.loveQuote(this.quote._id)
      .subscribe(quote => {
        this.quote = quote;
        this.updateValues();
      });
  }

  private updateValues() {
    this.isLoved = this.currentUserId && this.quote.loves.includes(this.currentUserId);
    this.numOfLoves = this.quote.loves.length;
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

}
