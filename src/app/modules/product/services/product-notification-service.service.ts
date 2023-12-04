import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/services/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductNotificationService extends NotificationService {

  constructor() { 
    super();
  }


}
