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

  checkAdminStatus(users) {
    for (let i = 0; i < users.length; i++) {
      if (!users[i].hasOwnProperty('isAdmin')) {
        users[i].isAdmin = false;
      }
    }
  }

  toggleAdminStatus() {
    console.log('true');
  }

}
