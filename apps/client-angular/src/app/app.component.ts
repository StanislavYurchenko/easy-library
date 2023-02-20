import {Component, OnInit} from '@angular/core';
import {filter, mapTo, merge, Observable, startWith} from "rxjs";
import {ResolveEnd, ResolveStart, Router} from "@angular/router";

@Component({
  selector: 'easy-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean> | null = null;
  private _showLoaderEvents$: Observable<boolean> | null = null;
  private _hiddenLoaderEvents$: Observable<boolean> | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof  ResolveStart),
      mapTo(true)
    );
    this._hiddenLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof  ResolveEnd),
      mapTo(false)
    );
    this.isLoading$ = merge(this._hiddenLoaderEvents$, this._showLoaderEvents$);
  }
}
