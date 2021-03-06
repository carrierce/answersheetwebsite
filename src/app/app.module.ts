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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
} from '@angular/material';
import { TestsDetailComponent } from './tests-detail/tests-detail.component';
import { IncorrectRouteComponent } from './incorrect-route/incorrect-route.component';
import { TestsEditComponent } from './tests-edit/tests-edit.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { LoginerrorDialogComponent } from './loginerror-dialog/loginerror-dialog.component';

// Below we specify the frontend routes,
// this is an array of all front-end routes.
const appRoutes: Routes = [
  {
    path: 'tests',
    component: TestsComponent
  },
  {
    path: 'test-detail/:id',
    component: TestsDetailComponent
  },
  {
    path: 'tests-create',
    component: TestsCreateComponent
  },
  {
    path: 'test-edit/:id',
    component: TestsEditComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
  {
    path: 'user-admin',
    component: UserAdminComponent
  },
  // below we define the default route if no route is given
  // pathMatch
  {
    path: '',
    redirectTo: '/tests',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: IncorrectRouteComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TestsComponent,
    UsersComponent,
    UserDetailComponent,
    UserCreateComponent,
    TestsCreateComponent,
    TestsDetailComponent,
    IncorrectRouteComponent,
    TestsEditComponent,
    SuccessDialogComponent,
    RegisterComponent,
    LoginComponent,
    UserAdminComponent,
    LoginerrorDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
  ],
  providers: [ApiService, UserapiService],
  bootstrap: [AppComponent],
  entryComponents: [SuccessDialogComponent, LoginerrorDialogComponent]
})
export class AppModule {}
