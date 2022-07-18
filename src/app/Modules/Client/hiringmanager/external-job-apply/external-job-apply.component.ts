import { Component, OnInit } from '@angular/core';

import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-external-job-apply',
  templateUrl: './external-job-apply.component.html',
  styleUrls: ['./external-job-apply.component.css']
})
export class ExternalJobApplyComponent implements OnInit {

 
  Company_logo: any;
  ID:any;
  Source:any;
  userid:any;
  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userid=sessionStorage.getItem('userid')
    this.Source=sessionStorage.getItem('role')
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        this.joblist = data.filter(x=>x.id==this.ID);
    })
    }
    )


}
  // files: File[] = [];

  // onSelect(event: any) {
  //   console.log(event);
  //   this.files.push(...event.addedFiles);
  // }
  
  // onRemove(event:any) {
  //   console.log(event);
  //   this.files.splice(this.files.indexOf(event), 1);
  // }

  attachments = []
  attachmentsurl: any;
  brochures = [];
  imagesurl: any;
  brochures1 = [];
  jobid:any;
  
  public GetJobID(jobid:any) {
    this.jobid = jobid;
  }

  

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
  ctc:any;
  Expectedctc:any;
 


  public insertdetails() {
    debugger
    if(this.candidatename==null || this.candidatename==undefined || this.candidatename==0||this.phoneno==null || this.phoneno==undefined || this.phoneno==0 ||
      this.email==null || this.email==undefined || this.email==0 ||  this.yearsofexp==null || this.yearsofexp==undefined || this.yearsofexp==0 ||
      this.relaventexp==null || this.relaventexp==undefined || this.relaventexp==0 ||this.city==null || this.city==undefined || this.city==0 
      ||this.Company_logo==null || this.Company_logo==undefined || this.Company_logo==0||this.currentcompany==null || this.currentcompany==undefined || this.currentcompany==0
      ||this.noticeperiod==null || this.noticeperiod==undefined || this.noticeperiod==0|| this.ctc==null || this.ctc==undefined || this.ctc==0
      ||this.servingnotice==null || this.servingnotice==undefined || this.servingnotice==0 ||this.relocate==null || this.relocate==undefined || this.relocate==0
      ||this.Source==null || this.Source==undefined || this.Source==0 ){
      Swal.fire('Please Fill All Mandatory Fields ')
    }
  
    else{
    
    var entity = {
      'JobID': this.jobid,
      'CandidateName': this.candidatename,
      'PhoneNo': this.phoneno,
      'Email': this.email,
      'YearsofExp': this.yearsofexp,
      'RelavantExp': this.relaventexp,
      'City': this.city,
      'ResumeUrl':  this.Company_logo,
      'CurrentCompany': this.currentcompany,
      'NoticePeriod': this.noticeperiod,
      'ctc': this.ctc,
      'ServingNotice': this.servingnotice,
      'Relocate': this.relocate,
      'Source': this.Source,
      'VendorId':this.userid,
      'expectedctc':this.Expectedctc
     
    }
    location.reload();
    this.RecruitmentServiceService.InsertCandidateRegistration(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Applied Successfully");
      }
    })
      location.reload();
  }
  }

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger

    if(event.addedFiles[0].type=="application/pdf")
    {
      console.log(event);
      this.files.push(event.addedFiles[0]);
      this.uploadattachments();
      console.log("content", this.files);
    }
    else{
      Swal.fire("Please Add Pdf Format");
    }
    
  }


  onRemove(event:any)
  {
debugger
console.log(event);
this.files.splice(this.files.indexOf(event),1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe(res => {
      debugger
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
    })
  }
}
