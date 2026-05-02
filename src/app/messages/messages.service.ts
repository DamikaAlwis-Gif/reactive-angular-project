import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Observable} from 'rxjs';
import { filter } from 'rxjs/operators';
@Injectable()
export class MessagesService{

    private subject = new BehaviorSubject<string[]>([]);
    errors$ : Observable<string[]> = this.subject.asObservable().pipe(
        filter(errors => errors?.length > 0)
    );
    
    constructor() {
        
    }

    showMessages(...errors: string[]) {
        this.subject.next(errors);
    }
}