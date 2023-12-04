import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private successSubject = new Subject<void>();

  notifySuccess(): void {
    this.successSubject.next();
  }

  onSuccess(): Observable<void> {
    return this.successSubject.asObservable();
  }
}
