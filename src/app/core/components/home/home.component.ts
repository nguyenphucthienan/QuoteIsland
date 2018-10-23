import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: any = [
    'https://images.pexels.com/photos/1170572/pexels-photo-1170572.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1492239/pexels-photo-1492239.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/450301/pexels-photo-450301.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1436129/pexels-photo-1436129.jpeg?auto=compress&cs=tinysrgb',
    'https://images.pexels.com/photos/1053775/pexels-photo-1053775.jpeg?auto=compress&cs=tinysrgb'
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getBackgroundIndex(index: number) {
    return this.sanitizer
      .bypassSecurityTrustStyle(`url(${this.images[index]})`);
  }

}
