//  Product : DigiCoreRecrcitment System 1.0
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Get Candidate Data,Get Company Staff Data, get data from JobRequirements Table,get data from Vendor_Dasboard Table,search data by JobTitle,get Job Description.
// and filter code
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-closed-position',
  templateUrl: './closed-position.component.html',
  styleUrls: ['./closed-position.component.css'],
})
export class ClosedPositionComponent implements OnInit {
  //Variable Declerations//

  Date: any;
  title: any;
  RecruitServiceService: any;
  public Editor = ClassicEditor;
  joblist: any;
  search: any;
  count: any;
  vendorid: any;
  term: any;
  userid: any;
  roleid: any;
  jobListCopy: any;
  p: any = 1;
  entry: any = 5;
  dropdownSettings1: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  hrlist: any;
  hiringManager: any;
  username: any;
  currentUrl: any;
  endDate: any;
  data: any = [];
  Role: any;
  joblist4: any;
  err: any;
  staffdetails: any;
  joblist20: any;
  count9: any;
  count10: any;
  joblist10: any;
  count4: any;
  joblist12: any;
  count5: any;
  count1: any;
  Userlist: any;
  noofCVs: any;
  OfferedCandidates: any;
  selectedCandidates: any;
  joinedCandidates: any;
  jobRefernceID: any;
  cv: any;
  description: any;
  skills: any;
  ID: any;
  searchByCtc: any;
  Vendor: any;
  Notes: any;

  constructor(
    private RecruitmentServiceService: RecruitementService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;

    //Variable Initialisation and Default Method Calls//

    this.GetCandidateRegistration();
    this.GetCandidateRegistration1();
    this.GetCandidateRegistration2();
    this.GetCandidateRegistration3();
    this.GetRecruiterStaff();
    this.GetJob_Requirements();
    this.GetVendor_Dasboard();
    this.GetJobDescription();
    this.GetUserslist();
    this.Role = '';
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid');
    this.hiringManager = '';
    this.vendorid = sessionStorage.getItem('vendorid');
    this.username = sessionStorage.getItem('UserName');
    this.roleid = sessionStorage.getItem('roleid');
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'vendor_Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };
  }

  //Method to Get Candidate Data//

  public GetCandidateRegistration() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 2) {
          this.joblist10 = data.filter(
            (x) =>
              x.offered == 1 &&
              x.offerAcceptreject == 0 &&
              x.hiringManager == this.username
          );
          this.count4 = this.joblist10.length;
        } else if (this.roleid == 3) {
          this.joblist10 = data.filter(
            (x) =>
              x.offered == 1 &&
              x.offerAcceptreject == 0 &&
              x.vendor == this.username
          );
          this.count4 = this.joblist10.length;
        } else {
          this.joblist10 = data.filter(
            (x) => x.offered == 1 && x.offerAcceptreject == 0
          );
          this.count4 = this.joblist10.length;
        }

        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: this.err.error.message,
        };
        Swal.fire('Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  //Method to Get Candidate Data//

  public GetCandidateRegistration1() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 2) {
          this.joblist10 = data.filter(
            (x) =>
              x.offered == 1 &&
              x.offerAcceptreject == 0 &&
              x.hiringManager == this.username
          );
          this.count4 = this.joblist10.length;
        } else if (this.roleid == 3) {
          this.joblist10 = data.filter(
            (x) =>
              x.offered == 1 &&
              x.offerAcceptreject == 0 &&
              x.vendor == this.username
          );
          this.count4 = this.joblist10.length;
        } else {
          this.joblist10 = data.filter(
            (x) => x.offered == 1 && x.offerAcceptreject == 0
          );
          this.count4 = this.joblist10.length;
        }

        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: this.err.error.message,
        };
        Swal.fire('Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
  //Method to Get Candidate Data//

  public GetCandidateRegistration2() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 2) {
          this.joblist20 = data.filter(
            (x) =>
              x.accept == 1 &&
              x.scheduled == 0 &&
              x.hiringManager == this.username
          );
          this.count9 = this.joblist20.length;
        } else if (this.roleid == 3) {
          this.joblist20 = data.filter(
            (x) =>
              x.accept == 1 && x.scheduled == 0 && x.vendor == this.username
          );
          this.count9 = this.joblist20.length;
        } else {
          this.joblist20 = data.filter(
            (x) => x.accept == 1 && x.scheduled == 0
          );
          this.count9 = this.joblist20.length;
        }
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
  //Method to Get Candidate Data//

  public GetCandidateRegistration3() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 2) {
          this.joblist4 = data.filter(
            (x) =>
              x.accept == 0 && x.reject == 0 && x.hiringManager == this.username
          );
          this.count1 = this.joblist4.length;

          debugger;
        } else if (this.roleid == 3) {
          this.joblist4 = data.filter(
            (x) => x.accept == 0 && x.reject == 0 && x.vendor == this.username
          );
          this.count1 = this.joblist4.length;
        } else {
          this.joblist4 = data.filter((x) => x.accept == 0 && x.reject == 0);
          this.count1 = this.joblist4.length;

          debugger;
        }

        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: this.err.error.message,
        };
        Swal.fire('Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  //Method to Get Company Staff Data//

  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: (data) => {
        debugger;
        this.hrlist = data.filter((x) => x.role == 'Hiring Manager');
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Client Staff');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
  //Method to get data from JobRequirements Table//
  public GetJob_Requirements() {
    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: (data) => {
        debugger;
        this.joblist = data;
        this.cv = this.joblist[0].noofCVs;
        this.jobListCopy = this.joblist;
        this.count = this.joblist.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Job Requirements');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  //Method to get data from Vendor_Dasboard Table//
  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: (data) => {
        debugger;
        this.dropdownList1 = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Vendor Dasboard');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  //Method to search data by JobTitle//
  public Filterjobs() {
    debugger;
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter(
      (x: { jobRefernceID: string; jobTitle: string }) =>
        x.jobRefernceID.toString().includes(searchCopy) ||
        x.jobTitle.toLowerCase().includes(searchCopy)
    );
  }
  GetId(id: any) {
    this.ID = id;
    location.href = '#/recruiter/JobVacancies/' + this.ID;
  }

  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription;
  }

  public GEtskills(job: any) {
    this.skills = job.skills;
  }

  GetId1(id: any) {
    this.ID = id;
    this.Getvendorid(this.ID);
  }

  //Method to Update Vendor Deatils in UpdateVendor table//
  public UpdateVendor() {
    debugger;
    for (let i = 0; i < this.selectedItems1.length; i++) {
      this.Vendor = this.selectedItems1[i].vendor_Name;
    }
    var entity = {
      ID: this.ID,
      Vendor: this.Vendor,
      Notes: this.Notes,
      VendorId: 1,
    };
    this.RecruitmentServiceService.UpdateVendor(entity).subscribe({
      next: (data) => {
        debugger;

        Swal.fire('Updated successfully');
        location.reload();
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
 
  // Method to Displaying Vendor Details//

  public GetUserslist() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: (data) => {
        debugger;
        this.Userlist = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

  onItemSelect1(item: any) {
    debugger;
    console.log(item);
    this.vendorid = item.id;
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: (data) => {
        debugger;
        this.selectedItems1 = data.filter((x) => x.id == this.vendorid);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }
  //Click Method to get vendor NAMES//
  Getvendorid(even: any) {
    debugger;
    this.vendorid = even;
    debugger;
    var list = this.Userlist.filter((x: { id: any }) => x.id == this.vendorid);
    this.Vendor = list[0].name;
  }
  public GetDate(event: any) {
    if (this.Date == 0) {
      debugger;
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: (data) => {
          debugger;
          this.joblist = data.filter((x) => x.recruiter == this.userid);
          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            (data) => {
              debugger;
            }
          );
        },
      });
    } else {
      debugger;
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: (data) => {
          debugger;
          this.joblist = data.filter(
            (x) => x.recruiter == this.userid && x.date == this.Date
          );
          debugger;
          this.count = this.joblist.length;
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            (data) => {
              debugger;
            }
          );
        },
      });
    }
  }
    //Method to get data from JobRequirements Table//
  public GetJobRequirements() {
    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: (data) => {
        debugger;
        this.joblist = data.filter(
          (x) => x.hiringManager == this.hiringManager
        );

        this.count = this.joblist.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Job Requirements');
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          (data) => {
            debugger;
          }
        );
      },
    });
  }

    //Method to search data by JobTitle//

  public jobTitle() {
    debugger;

    this.RecruitmentServiceService.GetClientStaff().subscribe((data) => {
      this.joblist = data.filter(
        (x) => x.accept == 1 && x.scheduled == 0 && x.jobTitle == this.title
      );
    });
  }

   //Method to Get Company Staff Data//
  public CandidateRegistration() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(
      (data) => {
        // this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
        this.joblist = data.filter(
          (x: { date: any }) => x.date >= this.Date && x.date <= this.endDate
        );
      }
    );
  }

  //Method to get Job Description//

  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe(
      (data) => {
        this.staffdetails = data;
      }
    );
  }
}
