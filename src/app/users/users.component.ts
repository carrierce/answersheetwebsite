import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor( private api: UserapiService ) { }

  ngOnInit() {
    this.api.getUser().subscribe((res) => {
      this.users = res;
    });
  }

  delUser(id) {
    this.api.deleteUser(id).subscribe((res) => console.log(res));
  }

}
