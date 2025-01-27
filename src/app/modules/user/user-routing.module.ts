import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { authGuard } from '../auth/auth.guard';
import { UserAdminComponent } from './user-admin/user-admin.component';

const routes: Routes = [
  {
  path: 'my-profile',
  component: MyProfileComponent,
  canActivate: [authGuard]
},
{
  path: 'admin',
  component: UserAdminComponent,
  canActivate: [authGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
