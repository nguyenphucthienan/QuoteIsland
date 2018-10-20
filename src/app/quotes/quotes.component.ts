import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  bannerImageUrl = environment.bannerImageUrls.quotesPage;

  sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
    'Sed velit sem, porta accumsan volutpat in, laoreet sit amet massa. ' +
    'Cras volutpat semper ipsum, at dictum justo scelerisque eget. ' +
    'Vestibulum posuere elit et magna fermentum gravida. ' +
    'Etiam consequat, orci eu porttitor varius, magna urna vestibulum eros, in gravida augue nisi quis est. ' +
    'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ' +
    'Phasellus sed suscipit ex.Donec sodales tellus quis libero molestie vulputate.';


  constructor() { }

  ngOnInit() {
  }

}
