import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
@Component({
  selector: 'app-tests-create',
  templateUrl: './tests-create.component.html',
  styleUrls: ['./tests-create.component.css']
})
export class TestsCreateComponent implements OnInit {
  examForm: FormGroup;
  success = false;
  loading = false;
  constructor(private fb: FormBuilder,
              private api: ApiService,
              private router: Router,
              private dialog: MatDialog) {}

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

  ngOnInit() {
    this.examForm = this.fb.group({
      examType: ['', Validators.required],
      name: ['', Validators.required],
      sections: this.fb.array([], Validators.required)
    });
  }

// Each form is only 1 level deep

  get examType() {
    return this.examForm.get('examType');
  }

  get name() {
    return this.examForm.get('name');
  }

  // control is a variable name,
  // here control is converting this.examForm.controls.section into type FormArray
  // even though we define sections above, we need to explicitly tell angualar it is of type
  // form array.
  // form controls. this.examForm.controls.section- controls contains all the key value form that are
  // part of exam form. Note that we are not starting FormControls because we are using
  // form builder. Everything inside formbuilder is actually form control
  // the sections is part of a formbuilder group therefore we need to use .controls to access it.

  // the 1st layer is the sections.
  // the 2nd layer is the question.
  // the 3rd layer is the answer choice.

  //

  addNewSection() {
    const control = <FormArray> this.examForm.controls.sections;
    control.push(
      this.fb.group({
        // note that here question could be a string but we make it an array so we
        // can pass in validations as another value
        sectionType: ['', Validators.required],
        numberOfQuestions: ['', Validators.required],
        questions: this.fb.array([], Validators.required)
      })
    );
  }

  deleteSection(index) {
    const control = <FormArray>this.examForm.controls.sections;
    control.removeAt(index);
  }

  // note that this control is something we access from the component
  // when we use addNewQuestion in the html we pass in which section this question belongs to
  // so it knows what array to push these questions into.
  addNewQuestion(control) {
    const intNumberOfQuestions = control.numberOfQuestions.value as number;
    for (let i = 0; i < intNumberOfQuestions; i++) {
      control.questions.push(
        this.fb.group({
          answer: ['', Validators.required]
        })
      );
    }
  }

  deleteAllQuestions(control) {
    let index = <number>control.numberOfQuestions.value;
    console.log(index);
    console.log(control);
    while (index >= 0) {
      control.questions.removeAt(index);
      index--;
    }
  }

  // this.examForm.value, with value being the content of the exam form, this is of type js Object.
  // we need to convert it into a JSON to submit it
  // so that is what jsonValue does.
  // this.api.postTest talks to the service API for sending the jsonValues
  //
    // postTest(exam): Observable<any> {
    //   return this.http.post(apiUrl, exam, httpOptions);
    // }
    // apiUrl is defined in the service & it is the endpoint url we want to post the data to.
    // httpOptions just defines the json.
  submitHandler() {
    this.loading = true;
    const rawValue = this.examForm.value;
    const jsonValue = JSON.stringify(rawValue);
    this.api.postTest(jsonValue).subscribe((result) => {
      this.loading = false;
      this.success = true;
      this.dialog.open(SuccessDialogComponent);
      this.router.navigate(['/tests']);
      console.log(result);
    }, (error) => {
      this.loading = false;
    });
  }
}
