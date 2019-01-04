import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from '../students/student-list/student-list.component';
import { StudentCreateComponent } from '../students/student-create/student-create.component';
import { StudentEditComponent } from '../students/student-edit/student-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentService } from './student.service'
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const studentroutes: Routes = [
  { path:'listallstudent', component: StudentListComponent},
  { path:'liststudent', component: StudentListComponent},
  { path:'liststudent/:id', component: StudentListComponent},
  { path:'editstudent/:id', component: StudentEditComponent},
  { path:'editstudent/update/:id', component: StudentEditComponent},
  { path:'liststudent/delete/:id', component: StudentListComponent},
  { path:'createstudent', component: StudentCreateComponent}
]

@NgModule({
  declarations: [
    StudentListComponent, 
    StudentCreateComponent, 
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(studentroutes)
  ],
  providers: [
    StudentService
  ]
})
export class StudentModule { }
