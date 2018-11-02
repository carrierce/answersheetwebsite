import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tests-create',
  templateUrl: './tests-create.component.html',
  styleUrls: ['./tests-create.component.css']
})
export class TestsCreateComponent implements OnInit {
  examForm: FormGroup;
  constructor(private fb: FormBuilder) {}

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
      examType: '',
      name: '',
      sections: this.fb.array([])
    });
  }

  addNewSection() {
    const control = <FormArray>this.examForm.controls.sections;
    control.push(
      this.fb.group({
        sectionType: '',
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
        answer: ''
      })
    );
  }

  deleteQuestion(control, index) {
    control.removeAt(index);
  }
}
