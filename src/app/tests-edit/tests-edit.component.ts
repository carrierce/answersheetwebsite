import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-tests-edit',
  templateUrl: './tests-edit.component.html',
  styleUrls: ['./tests-edit.component.css']
})
export class TestsEditComponent implements OnInit {

  examForm: FormGroup;
  success = false;
  loading = false;
  id = '';
  constructor(private fb: FormBuilder,
              private api: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

  // data = {
  //   examType: '',
  //   name: '',
  //   sections: [
  //     {
  //       sectionType: '',
  //       numberOfQuestions: '',
  //       questions: [
  //         {
  //           answer: ''
  //         }
  //       ]
  //     }
  //   ]
  // };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.examForm = this.fb.group({
      examType: ['', Validators.required],
      name: ['', Validators.required],
      sections: this.fb.array([], Validators.required)
    });

    this.api.getDetailTest(this.id).subscribe(result => {
      const data = result;
      this.setExamFormData(data);
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
    while (index >= 0) {
      control.questions.removeAt(index);
      index--;
    }
  }

  setExamFormData(data) {
    this.examForm.controls['examType'].setValue(data.examType);
    this.examForm.controls['name'].setValue(data.name);
    const control = <FormArray>this.examForm.controls.sections;
    data.sections.forEach((section) => {
      control.push(this.fb.group({
        sectionType: section.sectionType,
        numberOfQuestions: section.numberOfQuestions,
        questions: this.setQuestions(section)
      }));
    });
  }

  setQuestions(section): FormArray {
    const questionsArray = new FormArray([]);
    section.questions.forEach(question => {
      questionsArray.push(this.fb.group({
        answer: question.answer
      }));
    });
    return questionsArray;
  }

  submitHandler() {
    this.loading = true;
    const rawValue = this.examForm.value;
    const jsonValue = JSON.stringify(rawValue);
    this.api.editTest(this.id, jsonValue).subscribe(result => {
      this.loading = false;
      this.success = true;
      this.dialog.open(SuccessDialogComponent);
      this.router.navigate(['/tests']);
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }
}
