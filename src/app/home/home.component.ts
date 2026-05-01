import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesService } from '../services/coursers.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  beginnerCourses: Observable<Course[]>;

  advancedCourses: Observable<Course[]>;


  constructor(private CoursesService: CoursesService) {
  }

  ngOnInit() {
    const courses$ = this.CoursesService.getCourses().pipe(
      map(courses=> courses.sort(sortCoursesBySeqNo))
    );
    this.beginnerCourses = courses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))
    );
    this.advancedCourses = courses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );

  }

}




