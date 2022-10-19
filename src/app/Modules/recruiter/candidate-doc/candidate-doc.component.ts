import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-candidate-doc',
  templateUrl: './candidate-doc.component.html',
  styleUrls: ['./candidate-doc.component.css']
})
export class CandidateDocComponent implements OnInit {
  userid: any;
  roleid: any;
  username: any;

  public attachments1: any = [];
  public attachments1url: any = [];

  public attachments2: any = [];
  public attachments2url: any = [];

  public attachments3: any = [];
  public attachments3url: any = [];

  public attachments4: any = [];
  public attachments4url: any = [];
  id: any;
  currentUrl: any;
  CandidateList: any;
  constructor(private RecruitementService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('UserName');
    this.ActivatedRouterCall();
  }

  public ActivatedRouterCall() {
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.id = params['id'];
      
      this.RecruitementService.GetCandidateRegistration()
        .subscribe({
          next: data => {
            debugger
            this.CandidateList = data.filter(x => x.id == this.id);
           
           
          }, error: (err) => {
            Swal.fire('Issue in Getting Employee Transfer');
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
    //   this.DigiofficeService.GetOnboardingEmployeeDocuments()
    //     .subscribe({
    //       next: data => {
    //         debugger
    //         let filearray :  any [] = data.filter(x => x.staffId == this.id);

     


    //         if (filearray[0].sssid != null) {

    //           this.sssid1 = filearray[0].sssid

    //         }
    //         if (filearray[0].philhealth != null) {
    //           this.Philhealth1 = filearray[0].philhealth
    //         }
    //         if (filearray[0].birthCertificate != null) {
    //           this.BirthCertificate1 = filearray[0].birthCertificate
    //         }
    //         if (filearray[0].tin != null) {
    //           this.TIN1 = filearray[0].tin
    //         }
    //         if (filearray[0].hdmf_form != null) {
    //           this.hdmf_form1 = filearray[0].hdmf_form
    //         }
    //         if (filearray[0].bir_form_2316 != null) {
    //           this.bir_form_23161 = filearray[0].bir_form_2316
    //         }
    //         if (filearray[0].marriageCertificate != null) {
    //           this.MarriageCertificate1 = filearray[0].marriageCertificate
    //         }
    //         if (filearray[0].valid_Govt_ID != null) {
    //           this.Valid_Govt_ID1 = filearray[0].valid_Govt_ID
    //         }
    //         if (filearray[0].nbI_Clearance != null) {
    //           this.NBI_Clearance1 = filearray[0].nbI_Clearance
    //         }
    //         if (filearray[0].photos != null) {
    //           this.Photos1 = filearray[0].photos
    //         }
    //         if (filearray[0].payroll_bank_acc != null) {
    //           this.Payroll_bank_acc1 = filearray[0].payroll_bank_acc
    //         }
    //         if (filearray[0].validID2 != null) {
    //           this.ValidID21= filearray[0].validID2
    //         }
    //         if (filearray[0].acknowledgementForms != null) {
    //           this.AcknowledgementForms1 = filearray[0].acknowledgementForms
    //         }
    //         if (filearray[0].parkingForms != null) {
    //           this.ParkingForms1 = filearray[0].parkingForms

    //         } if (filearray[0].personalInfoSheet != null) {
    //           this.PersonalInfoSheet1 = filearray[0].personalInfoSheet
    //         }
    //         if (filearray[0].hmoForms != null) {
    //           this.HMOForms1 = filearray[0].hmoForms
    //         }
    //         if (filearray[0].groupLifeInsurenceForm != null) {
    //           this.GroupLifeInsurenceForm1 = filearray[0].groupLifeInsurenceForm
    //         }
    //         if (filearray[0].idForm != null) {
    //           this.IDForm1 = filearray[0].idForm
    //         }
    //         if (filearray[0].idPhoto2 != null) {
    //           this.IDPhoto21 = filearray[0].idPhoto2
    //         }

    //         if (filearray[0].clearnce_form != null) {
    //           this.Clearnce_form1 = filearray[0].clearnce_form
    //         }
    //       }, error: (err) => {
    //         Swal.fire('Issue in Getting Employee Documents');
    //         // Insert error in Db Here//
    //         var obj = {
    //           'PageName': this.currentUrl,
    //           'ErrorMessage': err.error.message
    //         }
    //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
    //           data => {
    //             debugger
    //           },
    //         )
    //       }
    //     })
     })
      
    
  }


  onSelect1(event: any) {
    debugger
    console.log(event);
    this.attachments1.push(...event.addedFiles);
  }

  onRemove1(event: any) {
    debugger
    console.log(event);
    this.attachments1.splice(this.attachments1.indexOf(event), 1);
  }

  onSelect2(event: any) {
    debugger
    console.log(event);
    this.attachments2.push(...event.addedFiles);
  }

  onRemove2(event: any) {
    debugger
    console.log(event);
    this.attachments2.splice(this.attachments2.indexOf(event), 1);
  }

  onSelect3(event: any) {
    debugger
    console.log(event);
    this.attachments3.push(...event.addedFiles);
  }

  onRemove3(event: any) {
    debugger
    console.log(event);
    this.attachments3.splice(this.attachments3.indexOf(event), 1);
  }

  onSelect4(event: any) {
    debugger
    console.log(event);
    this.attachments4.push(...event.addedFiles);
  }

  onRemove4(event: any) {
    debugger
    console.log(event);
    this.attachments4.splice(this.attachments4.indexOf(event), 1);
  }


  public Save() {
    debugger
    this.RecruitementService.ProjectAttachments(this.attachments1).subscribe(res => {
      debugger
      this.attachments1url.push(res);
      this.RecruitementService.ProjectAttachments(this.attachments2).subscribe(res => {
        debugger
        this.attachments2url.push(res);
        this.attachments2.length = 0;
        // this.InsertEmployeedocuments();
        debugger
      })
      this.attachments1.length = 0;
      debugger
    })

    this.RecruitementService.ProjectAttachments(this.attachments3).subscribe(res => {
      debugger
      this.attachments3url.push(res);
      this.attachments3.length = 0;
      debugger
    })

    this.RecruitementService.ProjectAttachments(this.attachments4).subscribe(res => {
      debugger
      this.attachments4url.push(res);
      this.attachments4.length = 0;
      debugger
    })
  }

  public cancel(){
    location.reload();
  }
}