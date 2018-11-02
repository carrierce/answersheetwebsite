import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getDetailTest(id).subscribe(res => {
      this.test = res;
      console.log(res);
    });
  }

  gotoExams() {
    this.router.navigate(['/tests']);
  }
}
