import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-tests-create',
  templateUrl: './tests-create.component.html',
  styleUrls: ['./tests-create.component.css']
})
export class TestsCreateComponent implements OnInit {

  examForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.examForm = this.fb.group({
      examType: '',
      name: '',
      sections: this.fb.array([
        this.fb.group({
          sectionType: '',
          questions: this.fb.array([
            this.fb.group({
              answer: ''
            })
          ])
        })
      ])
      // sections: this.fb.array([{
      //   sectionType: 'Section Type',
      //   questions: this.fb.array([{
      //     answer: 'Answer'
      //   }])
      // }])
    });
    // this.examForm.valueChanges.subscribe(console.log);
  }

  get examSections() {
    return this.examForm.get('sections') as FormArray;
  }



}

// const examSchema = mongoose.Schema({
//   examType: String,
//   name: String,
//   sections: [
//     {
//       sectionType: String,
//       questions: [
//         {
//           answer: String
//         }
//       ]
//     }
//   ]
// })
