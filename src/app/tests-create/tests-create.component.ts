import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-tests-create',
  templateUrl: './tests-create.component.html',
  styleUrls: ['./tests-create.component.css']
})
export class TestsCreateComponent implements OnInit {
  examForm: FormGroup;
  success = false;
  loading = false;
  constructor(private fb: FormBuilder, private api: ApiService) {}

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

  get examType() {
    return this.examForm.get('examType');
  }

  get name() {
    return this.examForm.get('name');
  }

  addNewSection() {
    const control = <FormArray>this.examForm.controls.sections;
    control.push(
      this.fb.group({
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

  submitHandler() {
    this.loading = true;
    const rawValue = this.examForm.value;
    const jsonValue = JSON.stringify(rawValue);
    this.api.postTest(jsonValue).subscribe((result) => {
      this.loading = false;
      this.success = true;
      console.log(result);
    }, (error) => {
      this.loading = false;
      console.error(error);
    });
  }
}
