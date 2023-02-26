import { Route } from '@angular/router';
import {AppComponent} from "./app.component";
import {AppResolver} from "./shared";
import {KebabComponent, RegistrationFormComponent, StreamsComponent, ValueAccessorComponent} from "./components";

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
  },
  {
    path: 'valueAccessor',
    component: ValueAccessorComponent,
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
  }
];
