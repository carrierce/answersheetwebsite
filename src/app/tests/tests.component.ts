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
    this.fetchData();
  }

  fetchData() {
    this.api.getTests().subscribe(res => {
      this.tests = res;
    });
  }

  deleteExam(examId) {
    this.api.deleteTest(examId)
    .subscribe((result) => {
      this.fetchData();
      console.log(result);
    }, (error) => console.log(error));
  }

}
