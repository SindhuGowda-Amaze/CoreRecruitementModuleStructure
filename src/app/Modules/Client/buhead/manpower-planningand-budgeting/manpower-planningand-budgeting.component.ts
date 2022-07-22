import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manpower-planningand-budgeting',
  templateUrl: './manpower-planningand-budgeting.component.html',
  styleUrls: ['./manpower-planningand-budgeting.component.css'],
})
export class ManpowerPlanningandBudgetingComponent implements OnInit {
  CompanyName: any;
  roletype: any;
  showButton: any;
  holiday: any;
  Role: any;
  Departmentlist: any;
  HeadCount: any;
  Year: any;
  Remarks: any;
  Joborder: any;
  Department: any;
  awardname: any;
  description: any;
  tenure: any;
  id: any;
  iD: any;
  awardlist: any;
  name: any;
  submit: any;
  awardlist1: any;
  constructor(
    private DigipayrollServiceService: RecruitementService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
   

    this.ActivatedRoute.params.subscribe((params: any) => {
      this.id = params['id'];
      debugger;
      if (this.id != undefined) {
        this.showButton = 1;
        this.GetManpowerPlanningandBudgeting();
        this.submit = 'Update';
      } else {
        this.showButton = 0;
        this.submit = 'Submit';
      }
    });

    this.DigipayrollServiceService.GetRoleType().subscribe((data) => {
      debugger;
      this.awardlist1 = data;
    });


    this.DigipayrollServiceService.GetRoleType().subscribe((data) => {
      debugger;
      this.Departmentlist = data;
    });


    this.ActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
      }
    });
  }

  post() {
    debugger;
    if (this.id != undefined) {
      this.Update();
    } else {
      this.insert();
    }
  }

  GetManpowerPlanningandBudgeting() {
    debugger;
    this.DigipayrollServiceService.GetManpowerPlanningandBudgeting().subscribe((data) => {
      debugger;
      // this.studentList = data.filter(x => x.id == this.id);
      debugger
      let temp = data.filter((x) => x.id == this.id);
      console.log('awardlist1', temp);
      (this.CompanyName = temp[0].companyName),
        (this.Department = temp[0].department),
        (this.roletype = temp[0].roletype),
        (this.Joborder = temp[0].joborder),
        (this.HeadCount = temp[0].headCount),
        (this.Year = temp[0].year),
        (this.Remarks = temp[0].remarks);
    });
  }

  insert() {
    debugger;
    var entity = {
      CompanyName: this.CompanyName,
      Department_name: this.Department,
      Joborder: this.Joborder,
      HeadCount: this.HeadCount,
      Year: this.Year,
      Remarks: this.Remarks,
      roletype: this.roletype,
    };
    this.DigipayrollServiceService.InsertManpowerPlanningandBudgeting(
      entity
    ).subscribe((data) => {
      Swal.fire('Saved Successfully');
      location.href = '#/BUHead/ManpowerPlanningandBudgetingdash';
    });
  }

  Update() {
    var entity = {
      ID: this.id,
      CompanyName: this.CompanyName,
      Department: this.Department,
      Joborder: this.Joborder,
      HeadCount: this.HeadCount,
      Year: this.Year,
      Remarks: this.Remarks,
      roletype: this.roletype,
    };
    this.DigipayrollServiceService.UpdateManpowerPlanningandBudgeting(
      entity
    ).subscribe((data) => {
      Swal.fire('Update Successfully');
      location.href = '#/BUHead/ManpowerPlanningandBudgetingdash';
    });
  }

  cancel() {
    location.href = '#/BUHead/ManpowerPlanningandBudgetingdash';
  }
}
