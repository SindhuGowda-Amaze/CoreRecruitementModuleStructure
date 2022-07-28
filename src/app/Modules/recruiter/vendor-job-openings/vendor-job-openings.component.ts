//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains R get data from JobRequirements, Get Company Staff Data & Vendor_Dasboard Staff Data, search data by JobTitle, filter the data by Dates,Route with Respect to URL
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
  selector: 'app-vendor-job-openings',
  templateUrl: './vendor-job-openings.component.html',
  styleUrls: ['./vendor-job-openings.component.css']
})
export class VendorJobOpeningsComponent implements OnInit {

    //Variable Declerations//

  Date: any;
  title: any;
  RecruitServiceService: any;
  public Editor = ClassicEditor;
  joblist: any;
  search: any;
  count: any;
  vendorid: any;
  loader :any
jobdescription:any;
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
  endDate: any
  data :any
  Role: any
  staffdetails: any
  even : any;
  ID: any;
  description: any;
  skills: any;
  Vendor: any;
  Notes: any;
  Userlist: any;
  jobdescriptionID: any;
  constructor(private RecruitementService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    debugger;
  
    //Variable Initialisation and Default Method Calls//

    this.GetVendor_Dasboard();
    this.GetRecruiterStaff();
    this.GetJob_Requirements();
    this.GetJobDescription();
    this.GetUserslist();

    this.Role=""
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid')
    this.hiringManager = "";
    this.vendorid = sessionStorage.getItem('vendorid');
    this.username = sessionStorage.getItem('UserName')
    this.roleid = sessionStorage.getItem("roleid")

  }

//Method to get data from JobRequirements Table//

  public GetJob_Requirements(){

  if (this.roleid == '3') {
    debugger;
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.vendor == this.username );
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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
  else {
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.status == 'Manager Approved BU Approved');
        this.jobListCopy = this.joblist
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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

 //Method to Get Company Staff Data//

  public GetRecruiterStaff(){
  this.RecruitementService.GetRecruiterStaff().subscribe({
    next: data => {
      debugger
      this.hrlist = data.filter(x=>x.role=="Hiring Manager");
    }, error: (err: { error: { message: any; }; }) => {
      Swal.fire(' Issue in Getting Client Staff');
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

 //Method to Get Vendor_Dasboard Staff Data/
  
  public GetVendor_Dasboard(){
  this.RecruitementService.GetVendor_Dasboard().subscribe({
    next: data => {
      debugger
      this.dropdownList1 = data;
    }, error: (err: { error: { message: any; }; }) => {
      Swal.fire(' Issue in Getting Vendor Dasboard');
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



  //Method to search data by JobTitle//
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }
  GetId(id: any) {
    this.ID = id
    location.href = "#/recruiter/JobVacancies/" + this.ID
  }
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }
 
  public GEtskills(job: any) {
    this.skills = job.skills
  }

  GetId1(id: any) {
    this.ID = id
    this.Getvendorid(this.ID);
  }
 
    //Method to update Selected Candidate with notes//
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
    this.RecruitementService.UpdateVendor(entity).subscribe({
      next: data => {
        debugger

        Swal.fire('Updated successfully');
        location.reload();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Updating Vendor');
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

 //Method to Dsipalying  Vendor_Dasboard Details//
  public GetUserslist() {
    this.RecruitementService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.Userlist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('  Issue in  Updating Vendor');
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
  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.vendorid = item.id;
    this.RecruitementService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.selectedItems1 = data.filter(x => x.id == this.vendorid);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('  Issue in  Getting  Vendor');
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


 //Click Method to get and VendorID Details//
  Getvendorid(even: any) {
    debugger
    this.vendorid = even;
    debugger
    var list = this.Userlist.filter((x: { id: any; }) => x.id == this.vendorid);
    this.Vendor = list[0].name
  }



  // public GetDate(event: any) {
  //   if (this.Date == 0) {
  //     debugger
  //     this.RecruitementService.GetJob_Requirements().subscribe({
  //       next: data => {
  //         debugger
  //         this.joblist = data.filter(x => x.recruiter == this.userid);
  //         this.count = this.joblist.length;
  //       }, error: (err: { error: { message: any; }; }) => {
  //         Swal.fire(' Issue in Getting Job Requirements');
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.RecruitementService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //             debugger
  //           },
  //         )
  //       }
  //     })
  //   }
  //   else {
  //     debugger
  //     this.RecruitementService.GetJob_Requirements().subscribe({
  //       next: data => {
  //         debugger
  //         this.joblist = data.filter(x => x.recruiter == this.userid && x.date == this.Date);
  //         debugger
  //         this.count = this.joblist.length;
  //       }, error: (err: { error: { message: any; }; }) => {
  //         Swal.fire(' Issue in Getting Job Requirements');
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.RecruitementService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //             debugger
  //           },
  //         )
  //       }
  //     })
  //   }
  // }


  //Method to get data from JobRequirements Table//
  public GetJobRequirements() {
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.hiringManager == this.hiringManager);

        this.count = this.joblist.length;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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

  // public jobTitle() {
  //   debugger;
  //   this.RecruitementService.GetClientStaff().subscribe(data => {
  //     this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.jobTitle == this.title));
  //   });
  // }


  // public CandidateRegistration () {
  //   debugger;
  //   this.RecruitementService.GetCandidateRegistration().subscribe(data => {
  //     // this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
  //     this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);
  //   });
  // }

//Method to filter the data by Dates//
FilterByDate(){
  if (this.roleid == '3') {
    debugger;
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.vendor == this.username && x.date >= this.Date && x.date <= this.endDate);
        this.count = this.joblist.length;
        this.getjobdescription(this.even)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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
  else {
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.status == 'Manager Approved BU Approved'&& x.date >= this.Date && x.date <= this.endDate);
        this.jobListCopy = this.joblist
        this.count = this.joblist.length;
        this.getjobdescription(this.even)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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




  //Method to get Job Description//

public GetJobDescription() {
  this.RecruitementService.GetJobDescriptionMaster().subscribe({
    next: (data) => {
      debugger;
      this.jobdescription = data;
      console.log('jobdescription',this.jobdescription)
      this.loader = false;
      this.count = this.staffdetails.length;
    },
    error: (err: { error: { message: any } }) => {
      Swal.fire('Issue in Getting Job Description Master ');
      // Insert error in Db Here//
      var obj = {
        PageName: this.currentUrl,
        ErrorMessage: err.error.message,
      };
      this.RecruitementService.InsertExceptionLogs(obj).subscribe(
        (data) => {
          debugger;
        }
      );
    },
  });
}


//Method to Get Job Description Details//
public getjobdescription(even:any){
 
  this.jobdescriptionID=even.target.value
  if (this.roleid == '3') {
    debugger;
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.vendor == this.username && x.jobTitle==this.jobdescriptionID);
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue Getting Job Requirements');
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
  else  {
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.status == 'Manager Approved BU Approved' && x.jobTitle==this.jobdescriptionID);
        this.jobListCopy = this.joblist
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' issue in Getting Job Requirements');
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
  if (this.Date == 0) {
    debugger
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.recruiter == this.userid && x.jobTitle==this.jobdescriptionID);
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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
  else {
    debugger
    this.RecruitementService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.recruiter == this.userid && x.date == this.Date && x.jobTitle==this.jobdescriptionID);
        debugger
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Job Requirements');
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
//Method to Route with Respect to URL//
close(){
  location.href="#/recruiter/VendorJobOpenings"
}
}
