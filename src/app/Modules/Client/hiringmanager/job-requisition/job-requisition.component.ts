import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
// import { Editor } from 'ngx-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-requisition',
  templateUrl: './job-requisition.component.html',
  styleUrls: ['./job-requisition.component.css']
})
export class JobRequisitionComponent implements OnInit {
  joblist: any;
  awardlist1:any;
  jobno: any;
  public jobtitile: any;
  public skills: any;
  public yearsofexp: any;
  public yearsofrelavantexp: any;
  public jobdescription: any;
  public joblocation: any;
  public noofpositions: any;
  public companyname: any;
  public package: any;
  public hiringmanager: any;
  public otherreqconditions: any;
  public resourcemanager: any;
  public hrlist: any;
  username: any;
  currentUrl: any
  files: any;
  manager: any;
  buHead:any;
  staffdetails: any;
  loader: any;
  count: any;
  constructor(private RecruitmentServiceService: RecruitementService) { }
  editor: any;
  html: any;
  Department: any;
  hrlist1:any;
  hrlist2:any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.username = sessionStorage.getItem('UserName');
    this.RecruitmentServiceService.GetClientStaff()
      .subscribe(data => {
        this.hrlist = data;
        this.hrlist1 = data.filter((x: { role: string; }) => x.role == 'Manager');
        this.hrlist2 = data.filter((x: { role: string; }) => x.role == 'BU Head');
        this.manager = this.hrlist1[0].id
        this.buHead = this.hrlist2[0].id
       
        this.RecruitmentServiceService.GetManpowerPlanningandBudgeting().subscribe((data) => {
          debugger;
          this.awardlist1 = data;
        });


      })
    this.RecruitmentServiceService.GetManpowerPlanningandBudgeting().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.department == sessionStorage.getItem('Department'));

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

  public GetHrName(even: any) {
    this.hiringmanager = even.target.value;
  }

  // public GetClientStaff() {
  //   debugger
  //   this.RecruitmentServiceService.GetClientStaff().subscribe(data=>{
  //     debugger
  //     this.hrlist=data ;

  //    })
  // }
  public insertdetails() {
    debugger;
    if (this.jobtitile == null || this.jobtitile == undefined || this.jobtitile == 0 ||
      this.skills == null || this.skills == undefined || this.skills == 0 ||
      this.yearsofexp == null || this.yearsofexp == undefined || this.yearsofexp == 0 ||
      this.yearsofrelavantexp == null || this.yearsofrelavantexp == undefined || this.yearsofrelavantexp == 0 ||

      this.joblocation == null || this.joblocation == undefined || this.joblocation == 0 ||
      this.noofpositions == null || this.noofpositions == undefined || this.noofpositions == 0 ||
      // this.companyname==null || this.companyname==undefined || this.companyname==0 ||
      this.package == null || this.package == undefined || this.package == 0 ||

      this.otherreqconditions == null || this.otherreqconditions == undefined || this.otherreqconditions == 0)
    // this.resourcemanager==null || this.resourcemanager==undefined || this.resourcemanager==0 
    {
      Swal.fire('Please Fill the Mandatory Fields')
    }
    else {

      var entity = {
        'jobTitle': this.jobtitile,
        'Skills': this.skills,
        'TotalExp': this.yearsofexp,
        'RelaventExp': this.yearsofrelavantexp,
        'JobDescription': this.jobdescription,
        'joblocation': this.joblocation,
        'Noofpositions': this.noofpositions,
        'CompanyName': this.companyname,
        'package': this.package,
        'HiringManager': this.username,
        'OtherRequiredConditions': this.otherreqconditions,
        'ResourceManager': this.resourcemanager,
        'Status': 'Manager Pending'
      }
      this.RecruitmentServiceService.InsertJob_Requirements(entity).subscribe({
        next: data => {
          debugger
          if (data != 0) {
            Swal.fire({
              title: '<strong>Use this link to post in External site<br></strong>',
              icon: 'info',
              html:
                'You can use <b>below link to Apply</b>, ' +
                '<a target="_blank" href="http://23.101.22.93/RecruitementModule/hiringnmanager/ExternalJobApply/53">Apply</a> ',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Save!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
              cancelButtonText:
                '<i class="fa fa-thumbs-down"></i>',
              cancelButtonAriaLabel: 'Thumbs down'
            })


            var sub = 'Hiring Manager has Posted the job'
            var email = 'gmrmadhavreddy416@gmail.com'
            var desc =  'Hiring manager to Manager'
                        'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
                        'Thank You!'             
            this.SendMailEmployee(sub, desc, email);

            var sub = 'Hiring Manager has Posted the job'
            var email = 'sindhugowda.amazeinc@gmail.com'
            var desc =   'Hiring manager to SBU'
                          'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
                          'Thank You!'
            this.SendMailEmployee(sub, desc, email);

            this.InsertNotificationSBU();
            this.InsertNotificationManager();

            // Swal.fire('Saved Successfully');
            // location.href = "#/hirignmanager/JobRecruitements";
          }
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

  }

  public Getjobno(event: any) {
    debugger
    this.jobtitile="";
    this.RecruitmentServiceService.GetManpowerPlanningandBudgeting()
      .subscribe(data => {
        let temp: any = data.filter(x => x.id == event.target.value);
        this.Department = temp[0].department;
        this.noofpositions = temp[0].headCount;
        this.jobtitile = temp[0].roletype;
      })


    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        let temp: any = data.filter(x => x.department == this.Department);
        this.jobdescription = temp[0].description;
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

  public SendMailEmployee(sub: any, desc: any, email: any) {
    debugger
    var entity3 = {
      'emailto': email,
      // 'emailto': 'divyashree@amazeinc.in',
      'emailsubject': sub,
      'emailbody': desc,
      'attachmenturl': [],
      'cclist':[],
      'bcclist': [],
    }
    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      // Swal.fire('Letter Generated and Sent Successfully');
      Swal.fire('Emails Sent');
    })
  }


  public InsertNotificationSBU() {
    debugger
    var event: any = 'Job Post';

    this.RecruitmentServiceService.InsertNotificationSBU(event, this.buHead, 'Your HR Posted new Job,waiting for your approval')
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


  public InsertNotificationManager() {
    debugger
    var event: any = 'Job Post';

    this.RecruitmentServiceService.InsertNotificationSBU(event,  this.manager, 'Your HR Posted new Job,waiting for your approval')
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


  Cancel() {
    location.href = "#/hirignmanager/JobRecruitements";
  }

  // public GetJobDescriptionMaster() {
  //   this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
  //     next: data => {
  //       debugger
  //       this.staffdetails = data;
  //       this.loader=false;
  //       this.count=this.staffdetails.length;
  //     }, error: (err: { error: { message: any; }; }) => {
  //       Swal.fire('Getting Get Job Description Master ');
  //       // Insert error in Db Here//
  //       var obj = {
  //         'PageName': this.currentUrl,
  //         'ErrorMessage': err.error.message
  //       }
  //       this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
  //         data => {
  //           debugger
  //         },
  //       )
  //     }
  //   })

  // }
}
