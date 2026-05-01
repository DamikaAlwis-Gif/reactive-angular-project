import { Component, Input } from '@angular/core';
import { Course } from '../model/course';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'courses-card-list',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.css',
})
export class CoursesCardListComponent {
@Input() courses: Course[];

constructor(private dialog:MatDialog){
  
}

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

  }
}
