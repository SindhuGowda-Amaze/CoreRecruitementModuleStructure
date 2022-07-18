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

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid')
    this.Source = sessionStorage.getItem('role')
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
      || this.servingnotice == null || this.servingnotice == undefined || this.servingnotice == 0 || this.relocate == null || this.relocate == undefined || this.relocate == 0
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
      location.reload();
      this.RecruitmentServiceService.InsertCandidateRegistration(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Applied Successfully");

          this. SendMailEmployee();

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
      location.reload();
    }
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
        alert("ATTACHMENT UPLOADED");
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

      'emailto': 'gmrmadhavreddy416@gmail.com',

      // 'emailto': 'divyashree@amazeinc.in',

      'emailsubject': 'Recruiter has uploaded a Resume',

      'emailbody': 'Dear    Hiring Manager  Candidates resume has been uploaded  Applicant,<br><br><br>We would like to extend a warm welcome to you into ALI family.<br><br> We thank you for choosing to work for ALI. We are delighted to have you join us and support us in our journey - "Make the most of your Energy"<br><br>  <br>We strongly believe that an Organization is made up of People and ultimately its the People, who will make the difference between success and failure. We believe that you have the potential and enthusiasm that will bring in fresh blood into our organization. <br>You may login to fill joining form and see other details  with below link -<br>Url - @@OnboardingPortalURL@@<br>User Name - @@UserName@@<br>Password -  @@Password@@<br><br>Note: If any of the links is not opening on a click, please copy the link in Internet Explorer and then access the same.<br>',

      'attachmenturl': this.files,

      'cclist': 'sindhugowda.amazeinc@gmail.com',

      'bcclist': 'sindhugowda.amazeinc@gmail.com',

    }



    this.RecruitmentServiceService.sendemailattachements(entity3).subscribe(res => {

      debugger;



      // Swal.fire('Letter Generated and Sent Successfully');

      Swal.fire('Checklist Sent to Respective Department');

    })



  }


  Cancle(){
    location.href = "#/recruiter/VendorJobOpenings";
  }
  
}
