import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';
@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  users: any;
  constructor( private api: UserapiService ) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
      this.checkAdminStatus(this.users);
    });
  }
  // fetchUsers function makes a get request that gets all the users from the db and assigns them
  // to the variable users in the front end,
  // within this function checkAdminStatus is called to ensure that any user in the back that lacks
  // an isAdmin status in the backend is assigned on in the front end users var for display purposes.

  checkAdminStatus(users) {
    for (let i = 0; i < users.length; i++) {
      if (!users[i].hasOwnProperty('isAdmin')) {
        users[i].isAdmin = false;
      }
    }
  }
  // checkAdminStatus function simply is used for ensuring that any users object that does not have
  // is isAdmin status in the backend is assigned one as false in the front end for display purposes.

  toggleUserAdminStatus(i) {
    this.api.toggleUserAdminStatus(i, this.users).subscribe((res) => {
    });
  }
  // toggleUserAdminStatus is called onClick and takes all the the index of the given
  // user being clicked on as a parameter & then passes that into the toggleUserAdminStatus
  // api function


}
