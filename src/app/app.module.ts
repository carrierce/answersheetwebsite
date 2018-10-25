import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestsComponent } from './tests/tests.component';
import { HttpClientModule } from '@angular/common/http';
import { UserapiService } from './userapi.service';
import { ApiService } from './api.service';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { TestsCreateComponent } from './tests-create/tests-create.component';

// Below we specify the frontend routes,
// this is an array of all front-end routes.
const appRoutes: Routes = [
  {
    path: 'tests',
    component: TestsComponent
  },
  {
    path: 'tests-create',
    component: TestsCreateComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user-detail',
    component: UserDetailComponent
  },
  {
    path: 'user-create',
    component: UserCreateComponent
  },
  // below we define the default route if no route is given
  // pathMatch
  {
    path: '',
    redirectTo: '/tests',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TestsComponent,
    UsersComponent,
    UserDetailComponent,
    UserCreateComponent,
    TestsCreateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ ApiService, UserapiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
