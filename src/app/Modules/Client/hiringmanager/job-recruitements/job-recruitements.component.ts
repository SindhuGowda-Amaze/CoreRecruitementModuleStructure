
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from GetClientStaff,GetManpowerPlanningandBudgeting,sendemailattachements,InsertNotificationSBU
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-recruitements',
  templateUrl: './job-recruitements.component.html',
  styleUrls: ['./job-recruitements.component.css']
})
export class JobRecruitementsComponent implements OnInit {

  
  //Variable Declerations//
  show: any;
  description: any;
  jobListCopy: any;
  err: any;
  hiringManager: any;
  joblist: any;
  search: any;
  count: any;
  date: any;
  loader: any;
  p: any = 1;
  count1: any = 5;
  dummjoblist1: any;
  Userlist: any;
  Hired: any;
  hrlist: any;
  roleid: any;
  NoofpositionsHired: any;
  dropdownSettings1: any = {};
  dropdownList1: any = [];
  username: any;
  currentUrl: any
  staffdetails:any
  Role: any;
  ID: any;
  Vendor: any;
  Notes: any;
  vendorid: any;
  userid: any;
  skills: any;
  Recruiter: any;
  stafflist: any;
  enddate:any;
  dummjoblist: any;
  empcomments: any;
  even : any
  noofpositions : any

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute, public router: Router,) { }

  ngOnInit(): void {
   
//Variable Initialisation and Default Method Calls//

    this.GetClientStaff();
    this.GetVendor_Dasboard();
    this.GetJob_Requirements();
    this.GetRecruiterStaff();
    this.GetUserslist();
    this.GetJobDescription();

    this.Role=""
    this.currentUrl = window.location.href;
    this.show = 0;
    this.hiringManager = "";
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader = true;

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


// Methods to Displaying Company Staff Details//

  GetClientStaff(){

    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
        debugger
        this.hrlist = data.filter(x => x.role == "Hiring Manager");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Client Staff');
        // Insert error in Db Here//
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


  // public GetRecruiterStaff() {
  //   this.RecruitementService.GetRecruiterStaff().subscribe({
  //     next: data => {
  //       debugger
  //       this.hrlist = data.filter(x => x.role == "Hiring Manager");
  //     }, error: (err: { error: { message: any; }; }) => {
  //       Swal.fire(' Issue in Getting Client Staff');
  //       var obj = {
  //         'PageName': this.currentUrl,
  //         'ErrorMessage': err.error.message
  //       }
  //       this.RecruitementService.InsertExceptionLogs(obj).subscribe(
  //         data => {
  //           debugger
  //         },
  //       )
  //     }
  //   })
  // }
  
// Methods to Displaying Vendor Staff Details//

  GetVendor_Dasboard(){

    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.dropdownList1 = data;
   
      },
      error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Expenses List Web');
          // Insert error in Db Here//
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

  // Methods to Search the Candidates Details//

  GetJob_Requirements(){

    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.hiringManager == this.username);
        }
        else if (this.roleid == 11) {
          this.joblist = data.filter(x => x.status == 'Manager Pending');
        }
        else if (this.roleid == 10) {
          this.joblist = data.filter(x => x.status == 'Manager Approved BU Pending');
        }
        else if (this.roleid == 3) {
          this.joblist = data.filter(x => x.role == 'vendor');
          }
        else {
          this.joblist = data;
        }

        this.jobListCopy = this.joblist
        this.dummjoblist = data;
        this.dummjoblist1 = data.filter(x => x.ID == this.ID);
        this.loader = false;
        debugger
        this.count = this.joblist.length;
      },error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Job Requirements');
          // Insert error in Db Here//
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

//Method to Fliter Job tittle//

  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }

//Method to Displaying vendor Dashboard deatils//

  public GetUserslist() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe({
      next: data => {
        debugger
        this.Userlist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Vendor Dasboard');
        // Insert error in Db Here//
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

  GetId(id: any) {
    this.ID = id
    debugger
    this.description = this.joblist.filter((x: { ID: any; }) => x.ID == this.ID);
    this.show = 1;
  }

  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }

 
  public GEtskills(job: any) {
    this.skills = job.skills
  }

  //Method to Update No of Positions Hired in UpdateJobPost table//

  UpdateJobPost() {
    debugger
    var entity = {
      "ID": this.ID,
      "Hired": this.Hired,
      "NoofpositionsHired": this.NoofpositionsHired,
    }
    this.RecruitmentServiceService.UpdateJobPost(entity).subscribe({
      next: data => {
        debugger
        Swal.fire('Job Unposted Successfully');
        location.reload();
      },error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Updating JobPost');
          // Insert error in Db Here//
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


  public  Cancel(){
window.location.reload();

  }
 
  public UpdateVendor() {
    debugger

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
        Swal.fire('Issue in Getting Expenses List Web');
        // Insert error in Db Here//
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
    this.vendorid = even.target.value;
    debugger
    var list = this.Userlist.filter((x: { id: any; }) => x.id == this.vendorid);
    this.Vendor = list[0].name

  }


  public Regularization() {
    debugger
    this.router.navigate(['/AttendanceView']);
  }



  public UpdateRecruiter() {
    debugger

    var entity = {
      "ID": this.ID,
      "Recruiter": this.Recruiter,
      "Notes": this.Notes,

    }
    this.RecruitmentServiceService.AssignRecruiter(entity)
      .subscribe(data => {

        Swal.fire('Updated successfully');
        location.reload();

      })
  }



  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
        debugger
        this.stafflist = data

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Expenses List Web');
        // Insert error in Db Here//
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

  public GetDate(event: any) {
    if (this.date == 0) {
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data;
          debugger
          this.dummjoblist = data;

          this.count = this.joblist.length;
          this.getjobdescription(this.even)
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Job Requirements');
          // Insert error in Db Here//
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
      this.joblist = this.dummjoblist.filter((x: { date: any; }) => x.date >= this.date && x.date <= this.enddate);
      this.count = this.joblist.length;
    }

  }



  public GetJobRequirements() {
    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: data => {
        debugger
     
         if (this.roleid == 11) {
          this.joblist = data.filter(x =>x.vendor == null && x.hiringManager == this.hiringManager && x.status == 'Manager Pending');
        }
        else if (this.roleid == 10) {
          this.joblist = data.filter(x =>x.vendor == null && x.hiringManager == this.hiringManager &&  x.status == 'Manager Approved BU Pending');
        }
        else if (this.roleid == 3) {
          this.joblist = data.filter(x =>x.vendor == null && x.hiringManager == this.hiringManager &&  x.role == 'vendor');
          }
        else {
          this.joblist = data.filter(x=>x.vendor == null && x.hiringManager == this.hiringManager );
        }
      //  this.joblist = data.filter(x => x.vendor == null && x.hiringManager == this.hiringManager && x.status=="Manager Approved BU Pending");
       
        this.count = this.joblist.length;
      },error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Expenses List Web');
          // Insert error in Db Here//
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

  public ApproveId(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Approve it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        if (this.roleid == 11) {
          var entity = {
            "ID": data,
            "Status": 'Manager Approved BU Pending',
          }
          this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe({
            next: data => {
              debugger
              Swal.fire('Approved Successfully')
              location.reload();
              this.InsertNotificationhr();
            }, error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in Getting Expenses List Web');
              // Insert error in Db Here//
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
        else if (this.roleid == 10) {
          var entity = {
            "ID": data,
            "Status": 'Manager Approved BU Approved',

          }
          this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe({
            next: data => {
              debugger
              Swal.fire('Approved Successfully')
              location.reload();
              this.InsertNotificationhr();
            }, error: (err: { error: { message: any; }; }) => {
              Swal.fire('Issue in Updating JobRequirement Status');
              // Insert error in Db Here//
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
    })
  }


  public Reject(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Reject it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          "ID": ID,
          "Status": 'Manager Rejected',

        }
        this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe({
          next: data => {
            debugger
            Swal.fire('Rejected Successfully')
            location.reload();
            this.InsertNotificationhr();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
            // Insert error in Db Here//
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
    })
  }



  jobdescription : any
  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        this.jobdescription = data;
        this.loader=false;
        this.count=this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Get Job Description Master ');
        // Insert error in Db Here//
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
  jobdescriptionID : any
  public getjobdescription(even : any){
this.jobdescriptionID=even.target.value
this.RecruitmentServiceService.GetJob_Requirements().subscribe({
  next: data => {
    debugger
    if (this.roleid == 2) {
      this.joblist = data.filter(x => x.hiringManager == this.username && x.jobTitle==this.jobdescriptionID);
    }
    else if (this.roleid == 11) {
      this.joblist = data.filter(x => x.status == 'Manager Pending' && x.jobTitle==this.jobdescriptionID);
    }
    else if (this.roleid == 10) {
      this.joblist = data.filter(x => x.status == 'Manager Approved BU Pending' && x.jobTitle==this.jobdescriptionID);
    }
    else if (this.roleid == 3) {
    this.joblist = data.filter(x => x.role == 'vendor'&& x.jobTitle==this.jobdescriptionID);
    }
    else {
      this.joblist = data;
    }
  
    this.count = this.joblist.length;

 
  },error: (err: { error: { message: any; }; }) => {
      Swal.fire('Issue in Getting Job Requirements');
      // Insert error in Db Here//
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




   
  public InsertNotificationhr() {
    debugger
    var event: any = 'Recruiter Applied for the job';

    this.RecruitmentServiceService.InsertNotificationSBU(event,  '', '')
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {

          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
          // Insert error in Db Here//
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
