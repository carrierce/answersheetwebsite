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


  // fetchData just gets all the tests from the api and assigns them to 
  // this.tests
  // this is fetdataData() is there so when we deleteExam we can reload fetching the data so it displays the updated data
  fetchData() {
    this.api.getTests().subscribe(res => {
      this.tests = res;
    });
  }


  // we need to pass in the test id
  // examId = test._id 
  // note that in api.deleteTest it removes it from the front & the back
  deleteExam(examId) { 
    this.api.deleteTest(examId)
    .subscribe((result) => {
      this.fetchData();
      console.log(result);
    }, (error) => console.log(error));
  }

}
