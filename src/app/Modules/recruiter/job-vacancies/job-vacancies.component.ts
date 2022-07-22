import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-job-vacancies',
  templateUrl: './job-vacancies.component.html',
  styleUrls: ['./job-vacancies.component.css']
})
export class JobVacanciesComponent implements OnInit {

  Company_logo: any;
  ID: any;
  Source: any;
  userid: any;
  currentUrl: any
  currentcompany: any;
  noticeperiod: any;
  servingnotice: any;
  relocate: any;
  joblist: any;
  candidatename: any;
  phoneno: any;
  email: any;
  yearsofexp: any;
  relaventexp: any;
  city: any;
  ctc: any;
  Expectedctc: any;
  hrlist:any;
  hirirngmanger:any;
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid')
    this.Source = sessionStorage.getItem('role')

    this.RecruitmentServiceService.GetClientStaff()
    .subscribe(data => {
      this.hrlist = data.filter((x: { role: string; }) => x.role == 'Hiring Manager');

      this.hirirngmanger = this.hrlist[0].id




    })


    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.id == this.ID);

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
    )
  }
  attachments = []
  attachmentsurl: any;
  brochures = [];
  imagesurl: any;
  brochures1 = [];
  jobid: any;
  roleid : any

  public GetJobID(jobid: any) {
    this.jobid = jobid;
  }
  public insertdetails() {
    debugger
    if (this.candidatename == null || this.candidatename == undefined || this.candidatename == 0 || this.phoneno == null || this.phoneno == undefined || this.phoneno == 0 ||
      this.email == null || this.email == undefined || this.email == 0 || this.yearsofexp == null || this.yearsofexp == undefined || this.yearsofexp == 0 ||
      this.relaventexp == null || this.relaventexp == undefined || this.relaventexp == 0 || this.city == null || this.city == undefined || this.city == 0
      || this.Company_logo == null || this.Company_logo == undefined || this.Company_logo == 0 || this.currentcompany == null || this.currentcompany == undefined || this.currentcompany == 0
      || this.noticeperiod == null || this.noticeperiod == undefined || this.noticeperiod == 0 || this.ctc == null || this.ctc == undefined || this.ctc == 0
      || this.servingnotice == null || this.servingnotice == undefined || this.relocate == null || this.relocate == undefined 
      || this.Source == null || this.Source == undefined || this.Source == 0) {
      Swal.fire('Please Fill All Mandatory Fields ')
    }
    else {
      var entity = {
        'JobID': this.jobid,
        'CandidateName': this.candidatename,
        'PhoneNo': this.phoneno,
        'Email': this.email,
        'YearsofExp': this.yearsofexp,
        'RelavantExp': this.relaventexp,
        'City': this.city,
        'ResumeUrl': this.Company_logo,
        'CurrentCompany': this.currentcompany,
        'NoticePeriod': this.noticeperiod,
        'ctc': this.ctc,
        'ServingNotice': this.servingnotice,
        'Relocate': this.relocate,
        'Source': this.Source,
        'VendorId': this.userid,
        'expectedctc': this.Expectedctc
      }
      // location.reload();
      debugger
      this.RecruitmentServiceService.InsertCandidateRegistration(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Applied Successfully");

          this.SendMailEmployee();
          this.InsertNotificationhr();
          location.href='#/recruiter/VendorJobOpenings'

        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Applied');
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
      // location.reload();
    }
  }

  
  public InsertNotificationhr() {
    debugger
    var event: any = 'Recruiter Applied for the job';

    this.RecruitmentServiceService.InsertNotificationSBU(event,  this.hirirngmanger, 'Your Recruiter Applied for new Job')
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

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    if (event.addedFiles[0].type == "application/pdf") {
      console.log(event);
      this.files.push(event.addedFiles[0]);
      this.uploadattachments();
      console.log("content", this.files);
    }
    else {
      Swal.fire("Please Add Pdf Format");
    }
  }
  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe({
      next: (res: any) => {
        debugger
        this.Company_logo = res;
        Swal.fire("Attachment Uploaded");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in ATTACHMENT ');
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



  public SendMailEmployee() {
    debugger
    var entity3 = {
      'emailto': 'sindhugowda.amazeinc@gmail.com',
      // 'emailto': 'divyashree@amazeinc.in',
      'emailsubject': 'Recruiter has uploaded a Resume',
      'emailbody': 'Dear Hiring Manager  Candidate resume has been uploaded ', 
      'attachmenturl': [],
      'cclist': [],
      'bcclist': [],
    }
    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      // Swal.fire('Letter Generated and Sent Successfully');
      Swal.fire('Email sent');

    })



  }


  Cancle(){
    location.href = "#/recruiter/VendorJobOpenings";
  }
  
}
