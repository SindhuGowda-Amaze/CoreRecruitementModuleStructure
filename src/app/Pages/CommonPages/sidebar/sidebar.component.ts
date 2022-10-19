import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  client: any;
  scheduled: any;
  selected: any;
  offered: any;
  joined: any;
  report:any;
  adminsetup:number | undefined
  rescheduled:any
  dropped: any;
  clientstaff: any;
  recruitstaff: any;
  vendo: any;
  ManpowerPlanning1: any;
  vendorstaf: any;
  manpower:any;
  home: any;
  Vendorrecruit: any;
  company_name: any;
  temp: any
  roleid: any;
  role: any;
  UserName: any;
  active: any;
  Jobrecruit: any
  applied: any
  shortlist: any
  vendorreport: any
  appliedreport: any
  shortlistedreport: any
  scheduledreport: any
  selectedreport: any
  offeredreport: any
  Jobrecruitreport: any
  joinedreport: any
  droppedreport: any
  closed:any;
  select:any;
  menu:any;
  interview:any;
  manPowerMenu:number |undefined;
  reportmenu:number | undefined;

  jobstaff: boolean | undefined;
  setup: boolean | undefined;
  interviewmenu: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp')
    this.roleid = sessionStorage.getItem('roleid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')
    this.Jobrecruit=false;
  
  }
  logout() {
    sessionStorage.clear();
    location.href = "#/Login";

    // localStorage.clear();
    location.reload();
  }


  public openCity(evt: any) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("nonactive");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    evt.currentTarget.className += " active";
  }

  public openCity1(evt: any) {
    debugger
    var i, tablinks;

    tablinks = document.getElementsByClassName("nonactive");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    evt.currentTarget.className += " active";
  }

  public openCity2(evt: any) {
    var i, tablinks;

    tablinks = document.getElementsByClassName("nonactive");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    evt.currentTarget.className += " active";
  }

  public highlight(evt: any) {
    debugger
    this.menu=5;
    var i, tablinks;
    //  localStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    evt.currentTarget.className += " active";
  }

  
  public Client() {
    localStorage.setItem('Pagename', 'CLIENT')
    this.router.navigate(['admin/Clientdashboard']);
    this.client = true;
    this.clientstaff = false;
    this.recruitstaff = false;
    this.vendorstaf = false;
    this.vendo = false;
    this.jobstaff=false;
    this.menu=false;
    this.active='';
this.menu=0;


  }

  public Clientstaff() {
    localStorage.setItem('Pagename', 'CLIENT STAFF')
    this.router.navigate(['admin/ClientStaffDashBoard']);
    this.client = false
    this.clientstaff = true
    this.home = false
    this.recruitstaff = false
    this.vendorstaf = false
    this.vendo = false
  }
  
  public Recruitstaff() {
    localStorage.setItem('Pagename', 'RECRUITER')
    this.router.navigate(['admin/RecruiterStaffDashboard']);
    this.client = false
    this.clientstaff = false
    this.home = false;
    this.menu=false;
    this.recruitstaff = true
    this.vendorstaf = false
    this.vendo = false
    this.active=''
    this.jobstaff=false
  }
  
  public vendor() {
    localStorage.setItem('Pagename', 'VENDOR')
    this.router.navigate(['admin/VendorDashboard']);
    this.vendo = true
    this.client = false
    this.clientstaff = false
    this.home = false
    this.menu=false;
    this.recruitstaff = false
    this.vendorstaf = false
    this.active=false
    this.jobstaff=false
  }
 
  public ManpowerPlanning() {
    localStorage.setItem('Pagename', 'Manpower Planning')
    this.router.navigate(['/BUHead/ManpowerPlanningandBudgetingdash']);
    this.menu=18;
    // this.vendo = false;
    // this.client = false
    // this.clientstaff = false
    // this.home = false
    // this.recruitstaff = false
    // this.vendorstaf = false
    // this.ManpowerPlanning1 = true;
  }

  public vendorstaff() {
    localStorage.setItem('Pagename', 'VENDOR STAFF')
    this.router.navigate(['admin/VendorStaffDashboard']);
    this.vendorstaf = true
    this.vendo = false
    this.client = false
    this.clientstaff = false
    this.home = false
    this.menu=false;
    this.recruitstaff = false;
    this.active ='';
    this.jobstaff=false;
  }


  public admin() {
    debugger
    this.menu =1 ;
    this.setup=false;
    if (this.roleid == '1') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['admin/AdminDashboard']);
      this.home = true
      this.Jobrecruit = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.selected = false
      this.offered = false
      this.joined = false
      this.manpower=false

      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
      this.active=false
      this.client=false
    }
    else if (this.roleid != '5') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['/hirignmanager/Dashboard']);
      this.home = true
      this.Jobrecruit = false
      this.Vendorrecruit = false

      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.selected = false
      this.offered = false
      this.joined = false
      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
    }
    else if (this.roleid == '6') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['/hirignmanager/Dashboard']);
      this.home = true
      this.Jobrecruit = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = true
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = true
      this.selected = false
      this.offered = false
      this.joined = false
      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
    }
  //  else if (this.roleid == '11') {
    //   localStorage.setItem('Pagename', 'DASHBOARD')
    //   this.router.navigate(['/Dashboard']);
    //   this.home = true
    //   this.Jobrecruit = false
    //   this.Vendorrecruit = false
    //   this.applied = false
    //   this.shortlist = false
    //   this.scheduled = false
    //   this.Vendorrecruit = false
    //   this.applied = false
    //   this.shortlist = false
    //   this.scheduled = false
    //   this.selected = false
    //   this.offered = false
    //   this.joined = false
    //   this.dropped = false
    //   this.vendorreport = false
    //   this.appliedreport = false
    //   this.shortlistedreport = false
    //   this.selectedreport = false
    //   this.offeredreport = false
    //   this.Jobrecruitreport = false
    //   this.joinedreport = false
    //   this.droppedreport = false
    // }
    else if (this.roleid == '3') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['/Dashboard']);
      this.home = true
      this.Jobrecruit = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.selected = false
      this.offered = false
      this.joined = false
      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
    }
    else if (this.roleid == '4') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['/Dashboard']);
      this.Jobrecruit = false
      this.Vendorrecruit = false
      this.home = true
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.selected = false
      this.offered = false
      this.joined = false
      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
    }

    else if (this.roleid == '2') {
      localStorage.setItem('Pagename', 'DASHBOARD')
      this.router.navigate(['/Dashboard']);
      this.Jobrecruit = false
      this.Vendorrecruit = false
      this.home = true
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.Vendorrecruit = false
      this.applied = false
      this.shortlist = false
      this.scheduled = false
      this.selected = false
      this.offered = false
      this.joined = false
      this.dropped = false
      this.vendorreport = false
      this.appliedreport = false
      this.shortlistedreport = false
      this.selectedreport = false
      this.offeredreport = false
      this.Jobrecruitreport = false
      this.joinedreport = false
      this.droppedreport = false
    }
  }
  
  public JobRecruitment() {
    this.manPowerMenu=1;
this.menu=2;
this.reportmenu=0;

    // this.Jobrecruit = true
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['hirignmanager/JobRecruitements']);



  }

  // public JobRecruitment(){
  //   if(this.roleid=='2'){
  //     this.active = 88;
  //     localStorage.setItem('Pagename', 'OPEN POSITIONS')
  //   this.router.navigate(['hiringmanager/JobRecruitements']);
  //   }

  // }

  public ScheduledInterviews() {
    if (this.roleid == '5'||this.roleid=='6') {
      this.active = 99;
      localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS')
      this.router.navigate(['/Interviewpanel/ScheduledInterviews']);
    }

  }


  public SelectedCandidates() {
    debugger
    if (this.roleid == '5') {
      this.manPowerMenu=33;
      this.menu=0;
      this.active = 81;
      localStorage.setItem('Pagename', 'SELECTED CANDIDATES')
      this.router.navigate(['/hiringmanager/SelectedCandidates']);
    }

  }


  public Compensation() {
    debugger
      this.manPowerMenu=33;
      this.menu=0;
      this.active = 90;
      localStorage.setItem('Pagename', 'COMPENSATION REJECTED CANDIDATES')
      this.router.navigate(['hirignmanager/CompensationRejectedCandidate']);
  }

  public RejectedCandidates() {
    if (this.roleid == '5') {
      this.active = 82;
      localStorage.setItem('Pagename', 'REJECTED CANDIDATES')
      this.router.navigate(['InterviewPanel/RejectedCadidates']);
    }

  }


  // public ScheduledInterviewCalender(){
  //   if(this.roleid=='5'){
  //     this.active = 83;
  //     localStorage.setItem('Pagename', 'INTERVIEW CALENDER')
  //     this.router.navigate(['/ScheduledInterviewCalender']);
  //   }

  // }

  public JOBAPPROVAL(){
    localStorage.setItem('Pagename', 'Job Approval')
    this.router.navigate(['admin/JobApprovalConfig']);
    this.jobstaff=true;
    this.active='';
    this.vendo=false;
    this.home=false
    this.client=false;
    this.menu=false;
    this.vendorstaf=false
    this.recruitstaff=false;
  }
  




  public VendorRecruitment(){
    this.menu=2;
    this.reportmenu=0;
    this.manPowerMenu=22
  //   this.Vendorrecruit=true
  //   this.Jobrecruit=false
  //  this.manpower=false
  //   this.home=false
  //   this.applied=false
  //   this.shortlist=false
  //   this.scheduled=false
  
  //   this.applied=false
  //   this.shortlist=false
  //   this.scheduled=false
  //   this.selected=false
  //   this.offered=false
  //   this.joined=false
  //   this.dropped=false
  //   this.vendorreport=false
  //   this.appliedreport=false
  //   this.shortlistedreport=false
  //   this.selectedreport=false
  //   this.offeredreport=false
  //   this.Jobrecruitreport=false
  //   this.joinedreport=false
  //   this.droppedreport=false
  //   this.jobstaff=false
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/recruiter/VendorJobOpenings']);

  }

  public Appliedcandidates() {
    localStorage.setItem('Pagename', 'APPLIED CANDIDATES')
    this.router.navigate(['hirignmanager/AppliedCandidates']);
    this.manPowerMenu=2
    this.menu=2;
    this.reportmenu=0;
    // this.applied = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false

    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false

    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
  }

  

  public Shortlisted() {
    localStorage.setItem('Pagename', 'SHORTLISTED CANDIDATES')
    this.router.navigate(['/recruiter/ShortListed']);
    // this.shortlist = true
    // this.applied = false
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    this.manPowerMenu=3;
this.menu=2;
this.reportmenu=0;

    this.scheduled = false
    this.Vendorrecruit = false


    this.scheduled = false
    this.selected = false
    this.offered = false
    this.joined = false
    this.dropped = false
    this.vendorreport = false
    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false
  }


  public Scheduled() {
    if(this.roleid=='5' || this.roleid=='5'){
      this.manPowerMenu=99;
      localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS')
      this.router.navigate(['/InterviewPanel/ScheduledInterviews']);
    }
   
    // this.scheduled = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false

    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false

    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
  }



  public Selected() {
    debugger
    localStorage.setItem('Pagename', 'SELECTED CANDIDATES')
    this.router.navigate(['hirignmanager/SelectedCandidates']);
    this.manPowerMenu=6;
    this.menu=2;
    this.reportmenu=0;
    this.selected = true
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false
    this.Vendorrecruit = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false

    this.offered = false
    this.joined = false
    this.dropped = false
    this.vendorreport = false
    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false
  }


  public Offered() {
    localStorage.setItem('Pagename', 'OFFERED CANDIDATES')
    this.router.navigate(['/hr/OfferedCandidates']);
    this.manPowerMenu=7;
    this.menu=2;
    this.reportmenu=0;
    // this.offered = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false

    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
  }

  public Joined() {
    localStorage.setItem('Pagename', 'JOINED CANDIDATES')
    this.router.navigate(['/hr/JoinedCandidates']);

this.manPowerMenu=8;
this.menu=2;
this.reportmenu=0;

    // this.joined = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false

    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
  }


  public Dropped() {
    localStorage.setItem('Pagename', 'DROPPED CANDIDATES')
    this.router.navigate(['/hr/DroppedCandidates']);
    this.manPowerMenu=9
    this.menu=2;
    this.reportmenu=0;
//     this.dropped = true
//     this.Jobrecruit = false
//     this.Vendorrecruit = false
//     this.home = false
//     this.applied = false
//     this.shortlist = false
//     this.scheduled = false
//     this.Vendorrecruit = false
//     this.applied = false
//     this.shortlist = false
//     this.scheduled = false
//     this.selected = false
//     this.offered = false
//     this.joined = false
// this.closed=false
//     this.vendorreport = false
//     this.appliedreport = false
//     this.shortlistedreport = false
//     this.selectedreport = false
//     this.offeredreport = false
//     this.Jobrecruitreport = false
//     this.joinedreport = false
//     this.droppedreport = false

  }

  public VendorReport() {
    localStorage.setItem('Pagename', 'VENDOR REPORT')
    this.router.navigate(['/VendorJobOpenings']);
    this.vendorreport = true
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false
    this.Vendorrecruit = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false
    this.selected = false
    this.offered = false
    this.joined = false
    this.dropped = false

    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

  }
  public AppliedReport() {
    localStorage.setItem('Pagename', 'APPLIED CANDIDATES REPORT')
    this.router.navigate(['/report/AppliedCandidatesReports']);
    this.reportmenu=2;
    this.manPowerMenu=0;
    this.menu=3;
    // this.appliedreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false

    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false

  }

  public Shortlistedreport() {
    localStorage.setItem('Pagename', 'SHORTLISTED CANDIDATES REPORT')
    this.router.navigate(['/report/ShortlistedCandidatesReports']);
    this.reportmenu=3;
    this.manPowerMenu=0;
    this.menu=3;
    // this.shortlistedreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false

    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false

  }

  public ScheduledReport() {
    debugger
    localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS REPORT')
    this.router.navigate(['/ScheduledInterviewsReports']);
    this.reportmenu=111;
    this.manPowerMenu=0;
    this.menu=3;


    this.scheduledreport = true
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false
    this.Vendorrecruit = false
    this.applied = false
    this.shortlist = false
    this.scheduled = false
    this.selected = false
    this.offered = false
    this.joined = false
    this.dropped = false
    this.vendorreport = false
    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

  }

  public SelectedReport() {
    localStorage.setItem('Pagename', 'SELECTED CANDIDATES REPORT')
    this.router.navigate(['/report/SelectedCandidatesReports']);
    this.reportmenu=4;
    this.manPowerMenu=0;
    this.menu=3;
    // this.selectedreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false

    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false

  }

  public OfferedReport() {
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/report/OfferedCandidatesReports']);
    this.reportmenu=502;
    this.manPowerMenu=0;
    this.menu=3
    // this.offeredreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false

    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false

  }

  public JobRecruitReport() {
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/report/JobRecruitementReport']);
     this.reportmenu=1;
     this.manPowerMenu=0;
    // this.Jobrecruitreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false

    // this.joinedreport = false
    // this.droppedreport = false

  }

  public JoinedReport() {
    localStorage.setItem('Pagename', 'JOINED CANDIDATES REPORT')
    this.router.navigate(['/report/JoinedCandidatesReport']);
    this.reportmenu=6;
    this.manPowerMenu=0;
    this.menu=3;
    // this.joinedreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false

    // this.droppedreport = false

  }

  public DroppedReport() {
    localStorage.setItem('Pagename', 'DROPPED CANDIDATES REPORT')
    this.router.navigate(['/report/DroppedCandiadtesReports']);
    this.reportmenu=7;
    this.manPowerMenu=0;
    this.menu=3;
    // this.droppedreport = true
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false


  }

  help(){
    this.menu = 4;
    this.active = 'help'
    this.home=false
    this.jobstaff=false;
    this.manPowerMenu=0;
    this.recruitstaff=false
    this.setup=false
    localStorage.setItem("clickname", "HELP")
  }

  help1(){
    this.menu = 333;
    this.active = 'help'
    this.home=false
    this.jobstaff=false
    this.recruitstaff=false
    this.setup=false
    localStorage.setItem("clickname", "HELP")
  }

  public  SupportTickets() {
    this.menu=5;
    this.reportmenu=0;
    this.manPowerMenu=10;
    this.setup=false;
    
    this.client=false;
    localStorage.setItem('Pagename', 'CLOSED POSITION')
    this.router.navigate(['/shared/ClosedPosition']);
    // this.dropped = false
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false
    // this.applied = false
    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.closed=true
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false
    // this.active='SupportTickets'
    // this.jobstaff=false                      

  }

  Supporttickets(){
    this.active = 'SupportTickets'
    this.client=false;
    this.recruitstaff=false;
    this.vendo=false;
    this.jobstaff=false;
      this.manPowerMenu=0;
    this.vendorstaf=false;
    this.router.navigate(['/shared/SupportTicketDashboard'])
   
    localStorage.setItem("Pagename", "support tickets")
  }

  offermanage(){
    this.menu = 17;
    localStorage.setItem("clickname", "offermanage")
    this.router.navigate(['/OfferManagement']);
  }

  reschedule(){
    this.active = 'reschedule'
    localStorage.setItem("clickname", "offermanage")
    this.router.navigate(['/InterviewPanel/ScheduledInterviews']);
  }

  public Description(){
    // localStorage.setItem('Pagename', 'Job Description')
    // this.router.navigate(['/JobDescriptionDash']);

    this.active = 'Description'
    this.vendorstaf=false
    this.jobstaff=false
    this.recruitstaff=false
    this.client=false
    this.vendo=false;
    this.menu=false
    localStorage.setItem("clickname", "Description")
    this.router.navigate(['admin/JobDescriptionDash']);
  }

  activeSetup()
  {
    this.setup=true;
    this.home=false;
    this.active='';
    this.menu=6;
    
  }

  Interview(){
this.menu=100;



  }

  Rescheduled(){
    
  }

  

  Reports(){
this.menu=3;
this.manPowerMenu=0;
//    this.report=true
// this.manpower=false


  }
  SelectedCANDIDATES(){
    this.manPowerMenu=33;
this.menu=0;

  }
  Manpower(){
this.menu=2;
this.reportmenu=0;

    //this.manpower=true
    // this.home=false
    // this.rescheduled=false
    // this.applied = false
    // this.Jobrecruit = false
    // this.Vendorrecruit = false
    // this.home = false

    // this.shortlist = false
    // this.scheduled = false
    // this.Vendorrecruit = false

    // this.shortlist = false
    // this.scheduled = false
    // this.selected = false
    // this.offered = false
    // this.joined = false
    // this.dropped = false
    // this.vendorreport = false
    // this.appliedreport = false
    // this.shortlistedreport = false
    // this.selectedreport = false
    // this.offeredreport = false
    // this.Jobrecruitreport = false
    // this.joinedreport = false
    // this.droppedreport = false

  }
  RescheduledInterview(){
this.menu=2;
this.reportmenu=0;
    this.manPowerMenu=4


  //  this.rescheduled=true
  //  this.manpower=false


  //  this.home=false
  //  this.rescheduled=false
  //  this.applied = false
  //  this.Jobrecruit = false
  //  this.Vendorrecruit = false
  //  this.home = false

  //  this.shortlist = false
  //  this.scheduled = false
  //  this.Vendorrecruit = false

  //  this.shortlist = false
  //  this.scheduled = false
  //  this.selected = false
  //  this.offered = false
  //  this.joined = false
  //  this.dropped = false
  //  this.vendorreport = false
  //  this.appliedreport = false
  //  this.shortlistedreport = false
  //  this.selectedreport = false
  //  this.offeredreport = false
  //  this.Jobrecruitreport = false
  //  this.joinedreport = false
  //  this.droppedreport = false

  }
  Select(){
    debugger
  this.manPowerMenu=5;


  }

  scheduled1(){
    debugger
    this.menu=2;
    this.reportmenu=0;
    this.manPowerMenu=11


  }
  REJECTEDCANDIDATES(){
    debugger
    this.manPowerMenu=56
this.menu=0;

  }

}
