import { Component, Input, OnInit } from '@angular/core';

const STAR_COUNT = 5;

@Component({
  selector: 'easy-library-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() rating: number | undefined = 0;
  @Input() starCount = 5;
  ratingArr: number[] = [];

  ngOnInit() {
     for (let index = 0; index < STAR_COUNT; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number) {
    let rating = this.rating ?? 0;

    rating = Math.ceil(rating / (this.starCount / STAR_COUNT));

     if (rating >= index + 1) {
        return 'star';
     }

     return 'star_border';
  }
}
