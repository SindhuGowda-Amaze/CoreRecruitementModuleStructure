
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page containsGet Company Staff Data,Job Description, get list of Selected Candidates from CandidateRegistration Table,Open Pdf in new Window,get data from JobRequirements Table
// and filter code 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dropped-candiadtes-reports',
  templateUrl: './dropped-candiadtes-reports.component.html',
  styleUrls: ['./dropped-candiadtes-reports.component.css']
})
export class DroppedCandiadtesReportsComponent implements OnInit {
     
  //Variable Declerations//

  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  loader:any;
  roleid:any;
  hrlist:any;
  hiringManager:any;
  username:any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }


  refresh(){
    location.reload();
  }

  ngOnInit(): void {

  //Variable Initialisation and Default Method Calls//

    this.GetClientStaff();
    this.GetCandidateReg();

    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
   
  }


 //Method to Get Company Staff Data//

  GetClientStaff(){
  this.RecruitementService.GetClientStaff()
  
.subscribe({
  next: data => {
    this.hrlist = data;
  }, error: (err) => {
    Swal.fire('Issue in GetClientStaff');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.RecruitementService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
  }


 // Methods to  get list of Selected Candidates from CandidateRegistration Table
  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
    
.subscribe({
  next: data => {
    if(this.roleid==2){
      this.joblist = data.filter(x => x.offerAcceptreject == 2 && x.hiringManager==this.username);
    }
    else{
      this.joblist = data.filter(x => x.offerAcceptreject == 2);
    }
   
    this.loader=false;
    this.count = this.joblist.length;
   
  }, error: (err) => {
    Swal.fire('Issue in GetCandidateRegistration ');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.RecruitementService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})
    

  }

  //Method to Open Pdf in new Window//
  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

  fileName = 'DROPPED CANDIDATES REPORT.xlsx';
  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dropped Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  //Method to get data from JobRequirements Table//

  public GetJobRequirements(){
  
  
    this.RecruitementService.GetCandidateRegistration()
    
.subscribe({
  next: data => {
    debugger
     
      this.joblist = data.filter(x => x.offerAcceptreject == 2  && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  }, error: (err) => {
    Swal.fire('Issue in Getting Candidate Registration');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': err.error.message
    }
    this.RecruitementService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})

  }
  }