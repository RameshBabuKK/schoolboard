import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SchooldetailsService } from 'src/app/schooldetails.service';
import { forEach } from '@angular/router/src/utils/collection';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.css']
})
export class SchoolDetailsComponent implements OnInit {

  groupSelected: String;
  pickedCategory: any;
  mainCategory: any;
  responseCategory: any;
  students: [];
  selectedId: number;

  constructor(private schooldetails: SchooldetailsService, private router: Router) { }

  ngOnInit() {
    this.mainCategory = [];

    // Getting Main category
    this.schooldetails.getSchoolMainCategory()
    .subscribe(res => {
      this.responseCategory = res[0].category;
      this.mainCategory = this.responseCategory[0];

      const mainCategoryNames = [];
      for (const propName in this.mainCategory) {
        if (propName) {
          mainCategoryNames.push(propName);
        }
      }
      this.mainCategory = mainCategoryNames;
    }, err => {
      console.log(err);
    });
  }

  // Getting list of particluar category
  loadSchoolCategory(category) {
    let selectedCategory;
    this.groupSelected = category;
    console.log(this.responseCategory);
    const getAllList = this.responseCategory[0];
    console.log(this.pickedCategory);
      for (const propName in getAllList) {
        if (propName === category) {
          selectedCategory = getAllList[propName];
        }
      }
      this.pickedCategory = selectedCategory;
  }

  selectedClass(index) {
    console.log(index);
    if (index !== 0) {
      this.router.navigate(['/liststudent', index]);
    } else {
      this.router.navigate(['/listallstudent']);
    }

  }
}
