import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
import { RecruitementService } from '../../Services/recruitement.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private RecruitmentServiceService: RecruitementService) { }

  company_name: any;
  temp:any
  roleid:any;
  role:any;
  UserName:any;
  pagename: any;
  showsidebar: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  username: any;
  staffID:any;
  ngOnInit() {
this.GetNotification();
  this.pagename = "DASHBOARD"
  this.staffID = sessionStorage.getItem('userid');
   
    interval(1000).subscribe((x => {
      
      this.pagename = localStorage.getItem('Pagename')


    }));

    
    this.temp=sessionStorage.getItem('temp')
    this.roleid = sessionStorage.getItem('roleid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')

    

    setInterval(() => {
      var time = new Date();
      this.time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
    }, 1000);


  }

  initail: any
  notificationslist: any
  notificationCount: any;

  public GetNotification() {
    debugger

    this.RecruitmentServiceService.GetNotification(sessionStorage.getItem('userid')).subscribe((data: any) => {
      debugger
      this.notificationslist = data;
      this.notificationCount = this.notificationslist.length;
    })
  }

  logout() {
    sessionStorage.clear();
    location.href = "#/login";

    localStorage.clear();
    location.reload();
  }

 
  public ClearNotification() {
    debugger
    this.RecruitmentServiceService.ClearNotificationByID(Number(this.staffID)).subscribe((_data: any) => {
      debugger

    })

    Swal.fire('Cleared Successfully');
    this.GetNotification();

  }

  show: any;
  public changecolor(ID: any) {
    debugger
    var entity = {
      ID: ID
    }
    this.RecruitmentServiceService.UpdateNotificationSeen(entity).subscribe((_data: any) => {
      location.reload();
    })
  }
}

