import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input() headerClasss = 'blue-gradient';
  @Input() author: any;

  private photoHover = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getSanitizedImageUrl() {
    if (this.photoHover) {
      return this.sanitizer.bypassSecurityTrustStyle(`url(${this.author.photoUrl})`);
    }

    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.author.photoUrl})`);
  }

}
