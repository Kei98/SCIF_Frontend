import {
  Component,
  OnInit,
} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    protected existingUser = false;
  ngOnInit(): void {
    //load User roles
  }

  denyExistingUser() {
    this.existingUser = !this.existingUser;
  }


}
