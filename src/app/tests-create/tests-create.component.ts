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
      sections: this.fb.array([])
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
        questions: this.fb.array([])
      })
    );
  }

  deleteSection(index) {
    const control = <FormArray>this.examForm.controls.sections;
    control.removeAt(index);
  }

  addNewQuestion(control) {
    control.push(
      this.fb.group({
        answer: ['', Validators.required]
      })
    );
  }

  deleteQuestion(control, index) {
    control.removeAt(index);
  }

  submitHandler() {
    const rawValue = this.examForm.value;
    const jsonValue = JSON.stringify(rawValue);
    this.api.postTest(jsonValue).subscribe((result) => {
      this.success = true;
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }
}
