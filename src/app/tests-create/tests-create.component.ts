import { Component, OnInit } from '@angular/core';
// note that we have to add in Validators from @angular/forms
// with Validators imported we can then make validators required for any part of functions.
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
              // note that here we add in MatDialog

  // data = {
  //   examType: '',
  //   name: '',
  //   sections: [
  //     {
  //       sectionType: '',
  //        numberOfQuestions: '',
  //       questions: [
  //         {
  //           answer: ''
  //         }
  //       ]
  //     }
  //   ]
  // };


  // note that the ngOnInit sections this.fb.array([] also have validators required.)
  // Here are initializing an empty form, but we dont want people to be able to submit this form.
  // So we need to intialize the form with our validators
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

  // Here the field numberOfQuestions and making this string required.
  // note that the question has a Validators.required
  // this prevents the user submitting empty forms.
  // thus every exam must have at least 1 section.
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
    // CONTROL is section.controls
    // it contains all the data about the secton.
    // here thing of control as section
    // intNumberOfQuestions takes the value for numberOfQuestions and returns it as a number.
    const intNumberOfQuestions = control.numberOfQuestions.value as number;
    // then control.numberOfQuestions.value filters through a bunch of data, getting only what we care.


    // this has a for loop that for the length of intNumberOfQuestions and pushes answer groups to the questions
    // note that questions is an array that contains an each object for each individual question.
    for (let i = 0; i < intNumberOfQuestions; i++) {
      control.questions.push(
        this.fb.group({
          answer: ['', Validators.required]
        })
      );
    }
  }


// control.questions.pop();
// control['numberOfQuestions'].setValue(control.numberOfQuestions - 1);

  deleteAllQuestions(control) {
    // control = section.controls
    // note that if I do pop it will change the # of questions
    // so I will need to reset the # of questions
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
      // this.dialog.open(SuccessDialogCompoent)
      // means that we running a component 
      // we need to use the constructor to inject matdialogu
      this.dialog.open(SuccessDialogComponent);
      // router.navigate takes you the tests route. so a new page.
      // note that routes are defined in app.module.ts
      this.router.navigate(['/tests']);
      console.log(result);
    }, (error) => {
      this.loading = false;
    });
  }
}
