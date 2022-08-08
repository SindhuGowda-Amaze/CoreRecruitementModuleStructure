//  Product : DigiCoreRecrcitment System 1.0
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains displaying the SupportTickets Details,upload Attachmnet,Insert the Data by InsertSupportTickets,upload the multiple images by InsertSupportTickets.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css'],
})
export class SupportTicketsComponent implements OnInit {
  constructor(private RecruitmentServiceService: RecruitementService,private ActivatedRoute: ActivatedRoute) {}

 //Variable Declerations//

  date: any;
  time: any;
  ticketid: any;
  typeofissue: any;
  prority: any;
  screenShot: any = [];
  comments: any;
  status: any;
  companyname: any;
  applicationName: any;
  id: any;
  ticketlist: any;
  currentUrl: any;
  files: File[] = [];
  files1: File[] = [];
  
  ngOnInit(): void {

   //Variable Initialisation and Default Method Calls//
   this.date = new Date().toISOString().split("T")[0];
    this.GetSupportTickets();

    this.currentUrl = window.location.href;
    this.typeofissue = '0';
    this.prority = '0';
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.id = params['id'];
      if (this.id != null && this.id != undefined) {
      }
    });
  }


  //Method to displaying the SupportTickets Details//

  public GetSupportTickets() {
    this.RecruitmentServiceService.GetSupportTickets().subscribe({
      next: (data) => {
        debugger;
        this.ticketlist = data.filter(
          (x) => x.applicationName == 'Recruitment System' && x.id == this.id
        );
        (this.date = this.ticketlist[0].date),
          (this.time = this.ticketlist[0].time1),
          (this.typeofissue = this.ticketlist[0].typeOfApplicationIssues),
          (this.prority = this.ticketlist[0].priority),
          (this.screenShot[0] = this.ticketlist[0].screenShot),
          (this.comments = this.ticketlist[0].comment);
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Getting Support Tickets');
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

  //Method to upload Attachmnet//

  onSelect(event: { addedFiles: any }) {
    debugger;
    console.log(event);
    // this.files.push(event.addedFiles[0]);
    this.files1.push(event.addedFiles[0]);

    console.log('content', this.files);
    this.AttachmentsUpload();
  }

  onRemove(event: any) {
    debugger;
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  //Method to upload Attachmnet//

  AttachmentsUpload() {
    this.RecruitmentServiceService.AttachmentsUploadsss(this.files).subscribe({
      next: (data) => {
        debugger;
        this.screenShot.push(data);
        console.log('data', this.screenShot);
        this.files.length = 0;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire(' Getting Attachments ');
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

 

 //Method to Insert the Data by InsertSupportTickets table //
  save() {
    debugger;
    var entity = {
      Date: this.date,
      Time: this.time,
      TypeOfApplicationIssues: this.typeofissue,
      Priority: this.prority,
      ScreenShot: this.screenShot[0],
      Comment: this.comments,
      Status: 'Raised',
      Companyname: 'Amazeinc.in',
      ApplicationName: 'Recruitment System',
    };
    this.RecruitmentServiceService.InsertSupportTickets(entity).subscribe({
      next: (data) => {
        debugger;
        this.ticketid = data;
        this.uploadmultipleimages();
        Swal.fire('Saved Sucessfully');
        location.href = '#shared/SupportTicketDashboard';

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Insert Support Tickets ');
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
 
 //Method to upload the multiple images by InsertSupportTickets table //

  public uploadmultipleimages() {
    debugger;
    for (let i = 0; i < this.screenShot.length; i++) {
      var entity = {
        Attachment: this.screenShot[i],
        TicketID: this.ticketid,
      };
      this.RecruitmentServiceService.InsertAttachment(entity).subscribe({
        next: (data) => {
          debugger;
          Swal.fire('Uploaded Successfully');
        },
        error: (err: { error: { message: any } }) => {
          Swal.fire('Issue in Insert Attachment ');
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
  }

//Method to Update the Data by UpdateSupportTickets table //
  public Update() {
    var entity = {
      id: this.id,
      Date: this.date,
      Time: this.time,
      TypeOfApplicationIssues: this.typeofissue,
      Priority: this.prority,
      ScreenShot: this.screenShot[0],
      Comment: this.comments,
      Status: 'Open',
      Companyname: 'Amazeinc.in',
      ApplicationName: 'Recruitment System',
    };
    this.RecruitmentServiceService.UpdateSupportTickets(entity).subscribe({
      next: (data) => {
        debugger;
        this.ticketid = data;
        // this.uploadmultipleimages()
        Swal.fire('Updated Sucessfully');
        location.href = '#/SupportTicketDashboard';

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in Update Support Tickets');
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


  public cancel() {
    location.href = '#shared/SupportTicketDashboard';
  }
}
