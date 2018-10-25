import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-tests-create',
  templateUrl: './tests-create.component.html',
  styleUrls: ['./tests-create.component.css']
})
export class TestsCreateComponent implements OnInit {

  myForm: FormGroup;
  // injecting out formbuilderlib
  // everytime the page loads the constructor will make and empty form with this content
  // constructors initialize data when an object is created.
  constructor( private fb: FormBuilder ) {
    this.myForm = this.fb.group({
      sectionType: '',
      questions: this.fb.array([]),
    });
  }

  addQuestion () {
    const control = <FormArray>this.myForm.controls.questions;
    control.push(this.fb.group([
      {
        answer: ''
      }

    ]));
  }

//   const control = <FormArray>this.myForm.controls.questions;
// not control.push is not actually what push normally does, it is constrainted to only allow pushing of type
// control
// says that control is this.myForm.control.questions & it is a FormArray of these things.
// i.e. an array that contains controls.questions
// are controls part of formbuiler.
// this.myForm refers to the myForm defined above
// this.fb.group refers the fb which is an instance of FormBuilder and
// .group is a method associated with FormBuilder which we can use here.

// questions: this.fb.array([]) means that we are creating an array and setting it to be an empty
//

  ngOnInit() {
  }

}
