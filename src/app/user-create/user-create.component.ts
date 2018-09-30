


import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private api: UserapiService) { }
  ngOnInit() {
  }

  onSubmit(): any {
    this.api.postUser(this.user).subscribe((res) => console.log(res) );
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }
}
