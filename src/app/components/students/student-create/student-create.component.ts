import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from './../student.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  addstudentForm:any = FormGroup;
  gender: Array<string> = ["Male", "Female"];
  formData$: Observable<any>;
  constructor(
    private studentservice: StudentService,
    private _fb: FormBuilder
    ) { }

  ngOnInit() {
    this.addstudentForm = this._fb.group({
      studentid: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      section: new FormControl('', Validators.required),
      admission_date: new FormControl('', Validators.required),
      fathername: new FormControl('', Validators.required),
      mothername: new FormControl('', Validators.required),
      class_id: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    })
  }

  addStudent() {
    
    this.formData$ = this.addstudentForm.value;
    console.log(this.formData$);
    this.studentservice.addStudent(this.formData$)
    .subscribe(res => {
      console.log(res);
    })
  }
}
