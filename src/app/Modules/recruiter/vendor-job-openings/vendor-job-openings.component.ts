import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-vendor-job-openings',
  templateUrl: './vendor-job-openings.component.html',
  styleUrls: ['./vendor-job-openings.component.css']
})
export class VendorJobOpeningsComponent implements OnInit {
  Date: any;
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
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
  count1: any = 5;
  dropdownSettings1: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  hrlist: any;
  hiringManager: any
  username: any;
  currentUrl: any
  ngOnInit(): void {
    debugger;
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid')
    this.hiringManager = "";
    this.vendorid = sessionStorage.getItem('vendorid');
    this.username = sessionStorage.getItem('UserName')
    this.roleid = sessionStorage.getItem("roleid")
    this.RecruitmentServiceService.GetClientStaff().subscribe({
      next: data => {
        debugger
        this.hrlist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Client Staff');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

    if (this.roleid == '3') {
      debugger;
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.vendor == this.username);
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }
    else {
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.status == 'Manager Approved BU Approved');
          this.jobListCopy = this.joblist
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'vendor_Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,
    };
    this.GetUserslist();
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.dropdownList1 = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Vendor Dasboard');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }
  GetId(id: any) {
    this.ID = id
    location.href = "#/JobVacancies/" + this.ID
  }

  description: any;
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }
  skills: any;
  public GEtskills(job: any) {
    this.skills = job.skills
  }

  GetId1(id: any) {
    this.ID = id
    this.Getvendorid(this.ID);
  }
  ID: any;
  searchByCtc: any
  Vendor: any;
  Notes: any;
  public UpdateVendor() {
    debugger
    for (let i = 0; i < this.selectedItems1.length; i++) {
      this.Vendor = this.selectedItems1[i].vendor_Name;

    }
    var entity = {
      "ID": this.ID,
      "Vendor": this.Vendor,
      "Notes": this.Notes,
      "VendorId": 1
    }
    this.RecruitmentServiceService.UpdateVendor(entity).subscribe({
      next: data => {
        debugger

        Swal.fire('Updated successfully');
        location.reload();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
  Userlist: any;
  public GetUserslist() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.Userlist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.vendorid = item.id;
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.selectedItems1 = data.filter(x => x.id == this.vendorid);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Getting Update Vendor');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
  Getvendorid(even: any) {
    debugger
    this.vendorid = even;
    debugger
    var list = this.Userlist.filter((x: { id: any; }) => x.id == this.vendorid);
    this.Vendor = list[0].name
  }
  public GetDate(event: any) {
    if (this.Date == 0) {
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.recruiter == this.userid);
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }
    else {
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.recruiter == this.userid && x.date == this.Date);
          debugger
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Job Requirements');
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
    }

  }
  public GetJobRequirements() {
    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.hiringManager == this.hiringManager);

        this.count = this.joblist.length;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Job Requirements');
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }
}
