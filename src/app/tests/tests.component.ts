import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  tests: any;
  constructor( private api: ApiService ) { }

  ngOnInit() {
    this.api.getTests().subscribe(res => {
      this.tests = res;
    });
  }

  deleteExam(examId) {
    this.api.deleteTest(examId)
    .subscribe((result) => console.log('Sucessfully deleted'), (error) => console.log(error));
  }

}
