import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tests-create-practice',
  templateUrl: './tests-create-practice.component.html',
  styleUrls: ['./tests-create-practice.component.css']
})
export class TestsCreatePracticeComponent implements OnInit {
  examsForm: FormGroup;
  success = false;

  // constructor is where we inject services
  constructor(private fb: FormBuilder, private api: ApiService) { }

  // here we create the form template
  ngOnInit() {
    this.examsForm = this.fb.group({
      testType: [''],
      testName: [''],
      sections: this.fb.array([])
    });
  }

 // data = {
  //   examType: '',
  //   name: '',
  //   sections: [
  //     {
  //       sectionType: '',
  //       questions: [
  //         {
  //           answer: ''
  //         }
  //       ]
  //     }
  //   ]
  // };


  addTestSection() {
    // IDing the part of the examform we want to push to
    const control = this.examsForm.controls.sections as FormArray;
    // note that we only push things, 1 layer deep. So when want to push in another layer
    // we need to create a new function to do so
    control.push(this.fb.group({
      sectionType: [''],
      questions: this.fb.array([])
    }));
  }

  addNewQuestion(questionControl) {
    questionControl.push(this.fb.group({
      answer: ['']
    }));
  }

  deleteSection(index) {
    const control = <FormArray> this.examsForm.controls.sections;
    control.removeAt(index);
  }

  deleteQuestion(control, index) {
    control.removeAt(index);
  }

}
