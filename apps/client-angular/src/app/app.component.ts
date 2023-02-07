import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {animationFrameScheduler, interval, Observable, of, take} from "rxjs";

@Component({
  selector: 'easy-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  dataFromServer = '';

  progress$!: Observable<number>;
  progress2$!: Observable<number>;

      constructor(
    private readonly http: HttpClient,
  ) { }

  ngOnInit() {
    this.progress$ = interval(1000/60).pipe(take(1001));
    this.progress2$ = interval(0, animationFrameScheduler).pipe(take(1001));
  }

  getData() {
    this.http
      .get<{ message: string }>('/api')
      .subscribe(({ message }) => (this.dataFromServer = message));
  }

  runAsync(): void {
    setTimeout(()=> {console.log('set Timeout')});
    requestAnimationFrame(()=> console.log('requestAnimationFrame'));
    Promise.resolve('Promise').then(console.log);
    of('Observable').subscribe(console.log);
    queueMicrotask(()=> console.log('queueMicrotask'));
  }
}
