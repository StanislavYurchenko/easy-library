import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {KebabInterface} from "../interfaces/kebab.interface";
import {catchError, delay, EMPTY, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AppResolver implements Resolve<KebabInterface> {
  constructor(private route: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KebabInterface | never> {
    return of({
      meat: 'cow',
      salad: 'rukkola',
    }).pipe(
      delay(1000),
      catchError(() => {
        this.route.navigate(['']);
        return EMPTY;
      })
    );
  }
}
