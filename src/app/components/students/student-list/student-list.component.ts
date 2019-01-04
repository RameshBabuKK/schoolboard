import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { StudentService } from './../student.service';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastsManager } from 'ng6-toastr/ng2-toastr';

export interface StudentDataTableListItem {
  name: String;
  age: number;
  fathername: String;
  mothername: String;
  class: Number;
  phone: String;
  actions: any;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  studentList$: Observable<any>;
  classid: Number;

  displayedColumns = ['name', 'age', 'fathername', 'mothername', 'class_id', 'phone', 'actions'];
  dataSource: any = new MatTableDataSource<StudentDataTableListItem>();
  listStudent: any = new MatTableDataSource<StudentDataTableListItem>();

  constructor(
    private studentservice: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    private location: Location,
    private vcr: ViewContainerRef) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    console.log('Student List');
    // Get state param from one component to another compoent
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      this.classid = parseInt(params.get('id'));
      console.log(this.classid);
    });

    if (this.classid) {
      const rr = this.studentservice.getListOfClassStudent(this.classid)
      .subscribe(res => {
        this.studentList$ = res;
        this.dataSource.data = this.studentList$;
        this.listStudent = new MatTableDataSource(this.dataSource.data);
        this.listStudent.sort = this.sort;
        rr.unsubscribe();
      });
    } else {
      const rr = this.studentservice.getStudentList()
        .subscribe(res => {
          this.studentList$ = res;
          this.dataSource.data = this.studentList$;
          this.listStudent = new MatTableDataSource(this.dataSource.data);
          this.listStudent.sort = this.sort;
          rr.unsubscribe();
        });
    }
  }

    addNewStudent() {
      this.router.navigate(['/createstudent']);
    }

    startEdit(editId) {
      console.log(editId);
      this.router.navigate(['/editstudent', editId]);
    }

    deleteRecord(deleteId) {
      const deleteSubscription = this.studentservice.deleteStudentRecord(deleteId).subscribe( res => {
        this.toastr.success( 'Record deleted successfully...', 'Deleted...');
        setTimeout(() => {
          this.router.navigate(['/schooldetails']);
        }, 2000);
      });
      deleteSubscription.unsubscribe();
    }
}
