import { Route } from '@angular/router';
import {AppComponent} from "./app.component";
import {KebabComponent} from "./components/kebab/kebab.component";
import {StreamsComponent} from "./components/streams/streams.component";
import {AppResolver} from "./shared";

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: 'kebab',
    component: KebabComponent,
    resolve: {
      kebab: AppResolver
    },
  },
  {
    path: 'streams',
    component: StreamsComponent,
  }
];
