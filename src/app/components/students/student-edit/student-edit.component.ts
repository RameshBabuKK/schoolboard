import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  updatestudentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private studentservice: StudentService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('id'));
      // tslint:disable-next-line:radix
      const getId = parseInt(params.get('id'));
      this.studentservice.findStudentRecord(getId).subscribe(res => {
        console.log(res);
      });
    });
    this.updatestudentForm = this._fb.group({
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
    });
  }

  updateStudentRecord() {
    console.log('updateStudentRecord');
  }


}
