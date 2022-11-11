//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Search the  Company Staff,Displaying the ManpowerPlanningandBudgeting,Search Department,Insert the values Job_Requirements,Serach the jobdescription & jobtitile,sending a mail,Insert the data InsertNotificationSBU,
//Insert the data InsertNotificationManager,
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

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
 
  //Variable Declerations//

  joblist: any;
  awardlist1: any;
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
  buHead: any;
  staffdetails: any;
  loader: any;
  count: any;
  editor: any;
  html: any;
  Department: any;
  hrlist1: any;
  hrlist2: any;
  Short : any 
  levelmaster : any
  level : any;
  showorhidecontent : any
  Role : any
  constructor(private RecruitmentServiceService: RecruitementService) { }

  ngOnInit(): void {

       
//Variable Initialisation and Default Method Calls//

    this.GetClientStaff();
  
   
    this.GetManpowerPlanningandBudgeting1();
    this.GetManpowerPlanningandBudgeting();
    this.currentUrl = window.location.href;
    this.username = sessionStorage.getItem('UserName');
    this.Short="";
    this.jobno=""
    this.Level();

 
   
  }




  // Methods to Search the  Company Staff Details//

  GetClientStaff(){
    this.RecruitmentServiceService.GetClientStaff()
    .subscribe(data => {
      this.hrlist = data;
      this.hrlist1 = data.filter((x: { role: string; }) => x.role == 'Manager');
      this.hrlist2 = data.filter((x: { role: string; }) => x.role == 'BU Head');
      this.manager = this.hrlist1[0].id
      this.buHead = this.hrlist2[0].id
    })

  }

    // Method to  Displaying the ManpowerPlanningandBudgeting  Details//

  GetManpowerPlanningandBudgeting1(){
    this.RecruitmentServiceService.GetManpowerPlanningandBudgeting().subscribe((data) => {
      debugger;
      this.awardlist1 = data;
    });


  }
   // Method to  Search Department Details//

 public  GetManpowerPlanningandBudgeting(){
    this.RecruitmentServiceService.GetManpowerPlanningandBudgeting().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.department == sessionStorage.getItem('Department'));

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Manpower Planning and Budgeting');
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


  // Method to Get Hr Name Details//

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

  // Method to Insert the values Job_Requirements table//

  public insertdetails() {
    debugger;
    if (this.jobtitile == null || this.jobtitile == undefined || this.jobtitile == 0 ||
      this.skills == null || this.skills == undefined || this.skills == 0 ||
      this.yearsofexp == null || this.yearsofexp == undefined || this.yearsofexp == 0 ||
      this.yearsofrelavantexp == null || this.yearsofrelavantexp == undefined || this.yearsofrelavantexp == 0 ||
      this.joblocation == null || this.joblocation == undefined || this.joblocation == 0 ||
      this.noofpositions == null || this.noofpositions == undefined || this.noofpositions == 0 ||
      // this.companyname==null || this.companyname==undefined || this.companyname==0 ||
      this.package == null || this.package == undefined || this.package == 0 
      // this.otherreqconditions == null || this.otherreqconditions == undefined || this.otherreqconditions == 0
      )
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
            var desc = 'Hiring manager to Manager'
            'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
            'Thank You!'
            this.SendJobMail(sub, desc, email);

            var sub = 'Hiring Manager has Posted the job'
            var email = 'sindhugowda.amazeinc@gmail.com'
            var desc = 'Hiring manager to SBU'
            'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
            'Thank You!'
            this.SendJobMail(sub, desc, email);

            this.InsertNotificationSBU();
            this.InsertNotificationManager();

            // Swal.fire('Saved Successfully');
            // location.href = "#/hirignmanager/JobRecruitements";
          }
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting Job Requirements');
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


  public insertjobrequisition() {
    debugger;
    if (this.jobtitile == null || this.jobtitile == undefined || this.jobtitile == 0 ||
      this.skills == null || this.skills == undefined || this.skills == 0 ||
      this.yearsofexp == null || this.yearsofexp == undefined || this.yearsofexp == 0 ||
      this.yearsofrelavantexp == null || this.yearsofrelavantexp == undefined || this.yearsofrelavantexp == 0 ||
      this.joblocation == null || this.joblocation == undefined || this.joblocation == 0 ||
      // this.noofpositions == null || this.noofpositions == undefined || this.noofpositions == 0 ||
      this.package == null || this.package == undefined || this.package == 0 ||
      this.otherreqconditions == null || this.otherreqconditions == undefined || this.otherreqconditions == 0)
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
            var desc = 'Hiring manager to Manager'
            'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
            'Thank You!'
            this.SendJobMail(sub, desc, email);

            var sub = 'Hiring Manager has Posted the job'
            var email = 'sindhugowda.amazeinc@gmail.com'
            var desc = 'Hiring manager to SBU'
            'Hello Sir/Madam,I hope you are doing great!I have posted for hiring positions, please give approval for the same. Once you will approve, will update the further information soon! Please let me know if you have any query!'
            'Thank You!'
            this.SendJobMail(sub, desc, email);

            this.InsertNotificationSBU();
            this.InsertNotificationManager();

            // Swal.fire('Saved Successfully');
            // location.href = "#/hirignmanager/JobRecruitements";
          }
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting Job Requirements');
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
 // Method to Serach the jobdescription & jobtitile //

  public Getjobno(event: any) {
    debugger
    this.jobtitile = "";
    this.RecruitmentServiceService.GetManpowerPlanningandBudgeting()
      .subscribe(data => {
        let temp: any = data.filter(x => x.id == event.target.value);
        this.Department = temp[0].department;
        this.noofpositions = temp[0].headCount;
        this.jobtitile = temp[0].roletype;
        this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
          next: data => {
            debugger
            let temp: any = data.filter(x => x.role == this.jobtitile);
            if (temp.length == 0) {
              this.jobdescription = '';
            } else {
              this.jobdescription = temp[0].description;
            }
            
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Manpower Planning and Budgeting');
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
      })
  }

// Method  to sending a mail//

  public SendJobMail(sub: any, desc: any, email: any) {
    debugger
    var entity3 = {
      'emailto': email,
      'emailsubject': sub,
      'emailbody': desc,
      'attachmenturl': [],
      'cclist': [],
      'bcclist': [],
    }
    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      Swal.fire('Emails Sent');
    })
  }


// Method  to  Insert the data InsertNotificationSBU table//

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
          )}
      })
  }



// Method  to  Insert the data InsertNotificationManager table//


  public InsertNotificationManager() {
    debugger
    var event: any = 'Job Post';
    this.RecruitmentServiceService.InsertNotificationSBU(event, this.manager, 'Your HR Posted new Job,waiting for your approval')
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
          )}
      })
  }

  //Method to Route with Respect URL//

  Cancel() {
    location.href = "#/hirignmanager/JobRecruitements";
  }
  // public Level(even : any){
  //   this.RecruitmentServiceService.InsertLevelMaster(even).subscribe(=>{

  //   })
  // }

  public Level() {
    debugger
    this.RecruitmentServiceService.GetLevelMaster()
      .subscribe({
        next: data => {
          debugger
         this.levelmaster= data
        }, error: (err) => {
          Swal.fire('Issue in Getting  LevelMaster');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )}
      })
}

changeStatus(evn: any) {

  if (evn.currentTarget.checked) {
    this.showorhidecontent = false;
  }
  else {
    this.showorhidecontent = true;
  }
}


}






