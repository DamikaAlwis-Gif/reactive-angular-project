import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Course } from '../model/course';
import { catchError, map, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("api/courses").pipe(
      map(res => res["payload"]),
      catchError(err => {
        console.error('Failed to load courses', err);
        return throwError(() => err);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}