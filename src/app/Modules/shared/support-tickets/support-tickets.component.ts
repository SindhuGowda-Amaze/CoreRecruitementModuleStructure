import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent implements OnInit {
  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute:ActivatedRoute) { }

  date: any;
  time: any;
  typeofissue: any;
  prority: any;
  screenShot:any=[]
  comments: any;
  status: any;
  companyname: any;
  applicationName: any;
  id:any;
  ticketlist: any;
  ngOnInit(): void {
    this.typeofissue="0";
    this.prority="0"

    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetSupportTickets();
      }
    })
  }

  public GetSupportTickets() {
    this.RecruitmentServiceService.GetSupportTickets().subscribe(
      data => {
        this.ticketlist = data.filter(x => x.applicationName == 'Recruitment System'&& x.id==this.id);
        this.date = this.ticketlist[0].date,
          this.time = this.ticketlist[0].time1,
          this.typeofissue = this.ticketlist[0].typeOfApplicationIssues,
          this.prority = this.ticketlist[0].priority,
          this.screenShot[0] = this.ticketlist[0].screenShot,
          this.comments = this.ticketlist[0].comment

      }
    )
  }


  files: File[] = [];
  files1: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.files1.push(event.addedFiles[0]);

    console.log("content", this.files);
    this.AttachmentsUpload()
  }


  AttachmentsUpload() {
    this.RecruitmentServiceService.AttachmentsUploadsss(this.files).subscribe(data => {
      debugger
      this.screenShot.push(data);
      console.log( "data",this.screenShot);
      this.files.length=0;
    })
  }

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {
    debugger
    var entity = {
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Raised',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'Recruitment System'
    }
    this.RecruitmentServiceService.InsertSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        this.uploadmultipleimages()
        Swal.fire("Saved Sucessfully");
        location.href="#/SupportTicketDashboard";

        this.date='';
        this.time='';
        this.typeofissue='';
        this.prority='';
        this.comments='';

      }
    )
  }
  ticketid: any
  public uploadmultipleimages() {
      debugger
    for (let i = 0; i<this.screenShot.length; i++) {
      var entity = {
        "Attachment": this.screenShot[i],
        "TicketID": this.ticketid,
      }
      this.RecruitmentServiceService.InsertAttachment(entity).subscribe(
        data => {
          Swal.fire("Uploaded Successfully");

        }
      )
    }
  }

  public Update() {
    var entity = {
      "id": this.id,
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Open',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'Recruitment System'
    }
    this.RecruitmentServiceService.UpdateSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        // this.uploadmultipleimages()
        Swal.fire("Updated Sucessfully");
        location.href = "#/SupportTicketDashboard";

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';

      }
    )
  }

  public cancel(){
    location.href="#/SupportTicketDashboard";
  }
}
