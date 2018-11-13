import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// ActivatedRoute is what we use to get the route for the specific test we want to display
// note it is injected as well
// Actived route looks at website address and grabs the id portion of it.

@Component({
  selector: 'app-tests-detail',
  templateUrl: './tests-detail.component.html',
  styleUrls: ['./tests-detail.component.css']
})
export class TestsDetailComponent implements OnInit {

  test: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private api: ApiService) { }

  ngOnInit() {
    // this is how we the ActivatedRoute we want to use to display the individual page.
    // .paramMap makes a map of parameters then we get the 1 we want 'id'.
    const id = this.route.snapshot.paramMap.get('id'); // this  id = test-detail/:id in the address bar
    this.api.getDetailTest(id).subscribe(res => {
      // now this.test = all the test data so we can display it in the html
      this.test = res;
      console.log(res);
    });
  }

  gotoExams() {
    this.router.navigate(['/tests']);
  }
}
