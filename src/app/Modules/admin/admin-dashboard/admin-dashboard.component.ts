import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public router: Router, private datePipe: DatePipe,
    private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
    clientlist:any;
    clientlist1:any;
    count:any;
    clientstafflist:any;
    clientstafflist1:any;
    count1:any;
    Vendorlist:any;
    Vendorlist1:any;
    count2:any;
    CompanyStaffList:any;
    CompanyStaffList1:any;
    count3:any;
    vendorstafflist:any;
    vendorstafflist1:any;
    count4:any;
    temp:any;
  ngOnInit(): void {
    this.temp=sessionStorage.getItem('temp')
    this.RecruitmentServiceService.GetClientMaster().subscribe(data => {
      debugger
      this.clientlist = data;
      // this.clientlist1 = this.clientlist.slice(0, 4);
      this.count = this.clientlist.length
      debugger
     
    })
    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      debugger
      this.clientstafflist = data;
      // this.clientstafflist1 = this.clientstafflist.slice(0, 4);
      this.count1 = this.clientstafflist.length
      debugger
     
    })

    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      debugger
      this.Vendorlist = data;
      this.Vendorlist1 = this.Vendorlist.slice(0, 4);
      this.count2 = this.Vendorlist.length
      debugger
     
    })

    this.RecruitmentServiceService.GetRecruiterStaff().subscribe(data => {
      debugger
      this.CompanyStaffList = data;
      this.CompanyStaffList1 = this.CompanyStaffList.slice(0, 4);
      this.count3 = this.CompanyStaffList.length
      debugger
     
    })

    this.RecruitmentServiceService.GetVendor_Staff().subscribe(data => {
      debugger
      this.vendorstafflist = data;
      this.vendorstafflist1 = this.vendorstafflist.slice(0, 4);
      this.count4 = this.vendorstafflist.length
      debugger
    })  
  }

  


  public Regularization() {
    debugger
    this.router.navigate(['/ClientDashBoard']);
  }

  public Regularization1() {
    debugger
    this.router.navigate(['/ClientStaffDashBoard']);
  }

  public Regularization2() {
    debugger
    this.router.navigate(['/VendorStaffDashboard']);
    
  }

  public Regularization3() {
    debugger
    this.router.navigate(['/VendorDashboard']);
  }

  public Regularization4() {
    debugger
    this.router.navigate(['/RecruiterStaffDashboard']);
  }

  

  public flip(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };


  public flip1(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card1") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };


}
