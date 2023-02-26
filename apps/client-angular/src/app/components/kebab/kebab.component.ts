import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  catchError,
  EMPTY,
  forkJoin,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  pluck,
  repeat,
  retry,
  Subject,
  take,
  tap, timer,
  zip
} from "rxjs";
import {IKebab, KebabInterface} from "../../shared";

@Component({
  selector: 'easy-library-kebab',
  templateUrl: './kebab.component.html',
  styleUrls: ['./kebab.component.scss'],
})
export class KebabComponent implements OnInit {
  resolveRes$: Observable<KebabInterface> | null = null;

  order$ = new Subject<IKebab[]>();
  kebab$: Observable<IKebab[]> | null = null;
  meat$ = new Subject<string>();
  sauce$ = new Subject<string>();
  cheese$ = new Subject<string>();
  pepper$ = new Subject<string>();
  pita$ = new Subject<string>();


  orders: IKebab[] = [];
  meatCount = 0;
  sauceCount = 0;
  cheeseCount = 0;
  pepperCount = 0;
  pitaCount = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.resolveRes$ = this.route.data.pipe(pluck('kebab'), tap(console.log));
    this.kebab$ = zip([this.pita$, this.meat$, this.cheese$, this.pepper$, this.sauce$]).pipe(
      mergeMap(consist => {
        this.orders.push({
          order: this.orders.length + 1,
          consist,
        });

        return of(this.orders);
      }),
      tap(console.log),
      );
  }

  useRetry(): void {
    let state = 2;
    const source$ = interval(1000).pipe(
      map(value => {
        if (value < state) {
          state--;
          throw new Error('Something went wrong!');
        }
        return value;
      }),
      catchError(error => {
        console.error('Error:', error);
        return EMPTY;
      }),
      retry(3),
    );

    source$.subscribe(
      value => console.log(`Value: ${value}`)
    );
  }

  useRepeat(): void {
    const source$ = interval(1000).pipe(take(3));

    const example$ = source$.pipe(repeat(3));

    example$.subscribe(
      value => console.log(`Value: ${value}`)
    );
  }

  useForkJoin(): void {
    const observable = forkJoin([
      timer(4000),
      of(1, 2, 3, 4),
      of(1, 2, 3, 6),
      Promise.resolve(8),
    ]);
    observable.subscribe({
      next: value => console.log(value),
      complete: () => console.log('This is how it ends!'),
    });
  }
}
