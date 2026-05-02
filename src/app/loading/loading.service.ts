import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs/internal/observable/of";
import { tap, finalize, concatMap } from "rxjs/operators";

@Injectable()
export class LoadingService{
    private loadingSubject : BehaviorSubject<boolean> = new BehaviorSubject(false);
    loading$ : Observable<boolean> = this.loadingSubject.asObservable();

    showLoaderUntilCompleted<T>(ob$ : Observable<T>) : Observable<T>{
        return of(null)
        .pipe(
            tap(() => this.loadingOn()),
            concatMap(() => ob$),
            finalize(() => this.loadingOff())
        );
    }

    loadingOn(){
        this.loadingSubject.next(true);
    }

    loadingOff(){
        this.loadingSubject.next(false);
    }
}