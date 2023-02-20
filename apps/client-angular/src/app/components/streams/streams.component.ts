import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  combineLatest,
  concat,
  debounceTime,
  delay,
  forkJoin,
  fromEvent,
  map,
  Observable,
  pluck,
  shareReplay,
  Subject,
  tap,
  zip,
} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'easy-library-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.scss'],
})
export class StreamsComponent implements OnInit, AfterViewInit {
  @ViewChild('inputElement') inputElement: ElementRef | null = null;
  @ViewChild('selectElement') selectElement: ElementRef | null = null;
  title = 'client-angular';
  dataFromServer = '';

  input$: Observable<string> | null = null;
  select$: Observable<string> | null = null;
  mergeStream$: any;
  combineLatest$: Observable<[string, string]> | null = null;
  concatLatest$: Observable<Observable<string>> | null = null;
  buffer$ = new Subject<void>();

  timer$!: Observable<number>;
  timerAsync$!: Observable<number>;

  coldStream$: Observable<number> = new Observable<number>(observer => {
    observer.next(new Date().getSeconds());
  });
  hotStream$: Observable<number> = (() => {
    const date = new Date().getSeconds();
    return new Observable<number>(observer => {
      observer.next(date);
    });
  })();

  constructor(
    private readonly http: HttpClient,
    private route: Router,
  ) { }

  ngOnInit() {
    const nation$ = this.http
      .get<any>('https://random-data-api.com/api/nation/random_nation')
      .pipe(pluck('capital'), shareReplay(1));
    const food$ = this.http
      .get<any>('https://random-data-api.com/api/food/random_food')
      .pipe(pluck('dish'), delay(1000), shareReplay(1));
    const user$ = this.http
      .get<any>('https://random-data-api.com/api/name/random_name')
      .pipe(pluck('first_name'), shareReplay(1));

    this.mergeStream$ = forkJoin([nation$, food$, user$]).pipe(tap(console.log));
    forkJoin([nation$, food$, user$]).pipe(tap((res) => console.log('forkjoin', res))).subscribe();
    zip([nation$, food$, user$]).pipe(tap((res) => console.log('zip', res))).subscribe();
    combineLatest([nation$, food$, user$]).pipe(tap((res) => console.log('combineLatest', res))).subscribe();

  }

  ngAfterViewInit(): void {
    const input = this.inputElement?.nativeElement;
    const select = this.selectElement?.nativeElement;
    this.input$ = fromEvent(input, 'keyup').pipe(debounceTime(1000), map((e: any) => e.target.value), tap(console.log));
    this.select$ = fromEvent(select, 'click').pipe(map((e: any) => e.target.value));

    this.combineLatest$ = combineLatest([this.input$, this.select$]);
    this.concatLatest$ = concat([this.input$, this.select$]);
  }

  getObservable() {
    this.coldStream$.subscribe(res => console.log('Our cold observable', res));
    this.hotStream$.subscribe(res => console.log('Our hot observable', res));
  }

  getMergeStream() {
    this.mergeStream$.subscribe(console.log);
  }

  createCancellableRequest(url: string): Observable<any> {
    // создаем контроллер для возможности отмены
    const controller = new AbortController();
    const signal = controller.signal;
    return new Observable(observer => {
      fetch(url, { signal })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Ошибка');
        })
        // передаем успешный ответ наблюдателю
        .then(result => observer.next(result))
        // завершаем поток
        .then(() => observer.complete())
        // в случае ошибки, оповещаем об этом наблюдателя
        .catch(error => observer.error(error));
      // функция, вызывающаяся при отписке
      return () => {
        // отменяем запрос
        controller.abort();
      };
    });
  }
}
