import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesService } from '../services/coursers.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private CoursesService: CoursesService, private loadingService: LoadingService, private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses(){
    const courses$ = this.CoursesService.getCourses().pipe(
      map(courses=> courses.sort(sortCoursesBySeqNo)),
      catchError(err => {
        this.messagesService.showMessages(err?.message || 'Could not load courses');
        return of([]);
        // return throwError(()=> err);
      })
      );
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);
    this.beginnerCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );
    this.advancedCourses$ = loadCourses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  }

}




