
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  Client Staff Data,get list of Selected Candidates from CandidateRegistration Table,get data from CandidateRegistration Table,
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-selected-candidates-reports',
  templateUrl: './selected-candidates-reports.component.html',
  styleUrls: ['./selected-candidates-reports.component.css']
})
export class SelectedCandidatesReportsComponent implements OnInit {

  //Variable Declerations//
  joblist: any;
  count: any;
  search: any;
  date: any;
  loader: any;
  roleid: any;
  hrlist: any;
  fileName = 'SELECTED CANDIDATES REPORT.xlsx';
  hiringManager: any;
  currentUrl: any;
  Date: any
  endDate: any
  constructor(private RecruitementService: RecruitementService) { }
  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.GetCandidateReg();
    this.GetClientStaff();
    this.roleid = sessionStorage.getItem('roleid');
    this.loader = true;
    this.hiringManager = "";
  }
  //Method to Get Client Staff Data//
  GetClientStaff() {
    this.RecruitementService.GetClientStaff()
      .subscribe({
        next: data => {
          debugger
          this.hrlist = data;
        }, error: (err) => {
          Swal.fire('Issue in Getting  ClientStaff');
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
  refresh() {
    location.reload();
  }

  // Methods to  get list of Selected Candidates from CandidateRegistration Table//
  public GetCandidateReg() {
    this.RecruitementService.GetCandidateRegistration()
      .subscribe({
        next: data => {
          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.loader = false;
          this.count = this.joblist.length;
        }, error: (err) => {
          Swal.fire('Issue in GetCandidate Registration');
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
  exportexcel(): void {
    this.loader = true;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Selected Candidates');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
  //Method to get data from CandidateRegistration Table//
  public GetJobRequirements() {
    this.RecruitementService.GetCandidateRegistration()
      .subscribe({
        next: data => {
          debugger

          this.joblist = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.hiringManager == this.hiringManager);

          this.count = this.joblist.length;
        }, error: (err) => {
          Swal.fire('Issue in GetCandidate Registration');
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
  filterdate() {
    this.RecruitementService.GetCandidateRegistration().subscribe({
      next: data => {
        this.joblist = data.filter(x => x.date >= this.Date && x.date <= this.endDate)
      }
    })
  }

}

