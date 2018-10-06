import { Component, OnInit } from '@angular/core';
import { UserapiService } from '../userapi.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id = '5bade67bb7a8938f1cc50f1e';

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private api: UserapiService) { }

  ngOnInit() {
    this.api.getSingleUser(this.id).subscribe((res) => {
      this.user = res;
    });
  }

}
