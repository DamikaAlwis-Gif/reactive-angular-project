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
        console.error("failed to load courses", err);
        return throwError({
          message: "failed to load courses",
          error: err
        });
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  saveCourse(courseID: string, changes: Partial<Course>): Observable<any> {
    return this.http.put<any>(`api/courses/${courseID}`, changes).pipe(
      catchError(err => {
        console.error('Failed to save course', err);
        return throwError(() => err);
      })
    );
  }
}