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
  // in edit, we edit an existing test so we need an existing id so we know which test to edit.
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
    // this is exactly the same as test-detail-component
    this.id = this.route.snapshot.paramMap.get('id');

    // this initializes the same form as create, we create an empty form here.
    this.examForm = this.fb.group({
      examType: ['', Validators.required],
      name: ['', Validators.required],
      sections: this.fb.array([], Validators.required)
    });

    // here get the data related to this specific test.
    // so we call to the getDetailTest function
    // so getDetailTest queries the DB and gets all the information for an individual test
    // the data we get is set to 'data'
    // then we data we get back we pass to the function setExamFormData
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

  // this function receives data from a particular test.
  // because of how forms work we need bracket notation not dot notation.
    //THIS IS WHAT WE NEED TO LOOP THROUGH THIS DATA & PUSH IT INTO THE FORM
    // this data comes from the getDetailsTest function
  // Value: { "examType": "SAT", "name": "SAT CRAM 2",
  // "sections": [ { "sectionType": "Reading", "numberOfQuestions": "3",
  // "questions": [ { "answer": "a" }, { "answer": "b" }, { "answer": "c" } ] } ] }

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

  setExamFormData(data) {
    // the 1st two are part of the zeroeth element of the form.
    this.examForm.controls['examType'].setValue(data.examType);
    this.examForm.controls['name'].setValue(data.name);

    // here we get a reference to the empty form array section data.
    // so const control refers back to the empty sections form we made in ngOnIt
    
    const control = <FormArray>this.examForm.controls.sections;
    // Below is a map of the data we get from the db pulling out each individual section.
    data.sections.forEach((section) => {
      // this is not an array push, this is a formArray push
      // inside formArray we can only push formGroup or formControl
      control.push(this.fb.group({
        sectionType: section.sectionType, // sectionType = data.sections[0].sectionType etc etc
        numberOfQuestions: section.numberOfQuestions,
        questions: this.setQuestions(section) // section = data.sections[0]
        // the goal is get questions to be: (this.fb.array[]).push(this.fb.push({data.sections[0].question.answer}))
      }));
    });
  }

  // this function does return something
  setQuestions(section): FormArray {
  
    const questionsArray = new FormArray([]); // this is an empty form array
    section.questions.forEach(question => { // section = data.sections[0]
      
      questionsArray.push(this.fb.group({ 
        // here into the questionsArray we are pushing in an fbGroup,
        // the group has a keyvalue pair with the key as answer & set equal to question.answer,
        // with the question being the instance of each questions we are looping through in our for each
        answer: question.answer // data.section[0].questions[0].question[0]
      }));
    });

    // because inside setExamFormData questions: is equal to this function, this function needs to return something
    // so quesitons can be equal to it.

    return questionsArray;
  }


  // this is baically the same, except we use api.editTest not api.createTest
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
