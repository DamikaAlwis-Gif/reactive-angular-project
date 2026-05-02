import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
    standalone: false
})
export class MessagesComponent implements OnInit {
  
  showMessages = false;
  errors$ : Observable<string[]>;

  constructor(public msgService: MessagesService) {

  }

  ngOnInit() {
    this.errors$ = this.msgService.errors$.pipe(
      tap((errors) => {
        this.showMessages = errors?.length > 0;
      })
    );


  }


  onClose() {
    this.showMessages = false;

  }

}
