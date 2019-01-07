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
    this.api.getUser().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

}
