import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Student } from '../student';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  selectedStudentId: string;
  selectedStudentRecord: Student;
  updateStudentRecordFrom: any;
  genderitems: Array<string> = ['Male', 'Female'];
  constructor(
    private route: ActivatedRoute,
    private studentservice: StudentService,
    private _fb: FormBuilder,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
    ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.updateStudentRecordFrom = this._fb.group({
      _id: new FormControl(''),
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

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedStudentId = params.get('id');
      console.log(this.selectedStudentId);
    });

    this.studentservice.getStudentRecord(this.selectedStudentId)
      .subscribe(res => {
        this.selectedStudentRecord = res;
      });
  }

  updateStudentRecord(formData) {
    console.log(formData.value);
    this.studentservice.updateRecord(formData.value).subscribe(res => {
      setTimeout(() => {
        this.toastr.success('You are awesome!', 'Success!');
    }, 2000);
    });
  }

}
