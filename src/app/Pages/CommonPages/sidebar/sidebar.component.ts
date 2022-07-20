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
  dropped: any;
  clientstaff: any;
  recruitstaff: any;
  vendo: any;
  ManpowerPlanning1: any;
  vendorstaf: any;
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

  jobstaff: boolean | undefined;
  setup: boolean | undefined;
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
    this.active='';



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
    this.home = false
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
    this.recruitstaff = false
    this.vendorstaf = false
    this.active=''
    this.jobstaff=false
  }
 
  public ManpowerPlanning() {
    localStorage.setItem('Pagename', 'Manpower Planning')
    this.router.navigate(['/BUHead/ManpowerPlanningandBudgetingdash']);
    this.vendo = false;
    this.client = false
    this.clientstaff = false
    this.home = false
    this.recruitstaff = false
    this.vendorstaf = false
    this.ManpowerPlanning1 = true;
  }

  public vendorstaff() {
    localStorage.setItem('Pagename', 'VENDOR STAFF')
    this.router.navigate(['admin/VendorStaffDashboard']);
    this.vendorstaf = true
    this.vendo = false
    this.client = false
    this.clientstaff = false
    this.home = false
    this.recruitstaff = false;
    this.active ='';
    this.jobstaff=false;
  }


  public admin() {
    debugger
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
      this.home = false
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
    this.Jobrecruit = true
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
    if (this.roleid == '5') {
      this.active = 80;
      localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS')
      this.router.navigate(['/Interviewpanel/ScheduledInterviews']);
    }

  }


  public SelectedCandidates() {
    if (this.roleid == '5') {
      this.active = 81;
      localStorage.setItem('Pagename', 'SELECTED CANDIDATES')
      this.router.navigate(['/hiringmanager/SelectedCandidates']);
    }

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
    this.client=false
    this.vendorstaf=false
    this.recruitstaff=false;
  }
  




  public VendorRecruitment(){
    this.Vendorrecruit=true
    this.Jobrecruit=false
   
    this.home=false
    this.applied=false
    this.shortlist=false
    this.scheduled=false
  
    this.applied=false
    this.shortlist=false
    this.scheduled=false
    this.selected=false
    this.offered=false
    this.joined=false
    this.dropped=false
    this.vendorreport=false
    this.appliedreport=false
    this.shortlistedreport=false
    this.selectedreport=false
    this.offeredreport=false
    this.Jobrecruitreport=false
    this.joinedreport=false
    this.droppedreport=false
    this.jobstaff=false
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/recruiter/VendorJobOpenings']);

  }

  public Appliedcandidates() {
    localStorage.setItem('Pagename', 'APPLIED CANDIDATES')
    this.router.navigate(['hirignmanager/AppliedCandidates']);
    this.applied = true
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false

    this.shortlist = false
    this.scheduled = false
    this.Vendorrecruit = false

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


  public Shortlisted() {
    localStorage.setItem('Pagename', 'SHORTLISTED CANDIDATES')
    this.router.navigate(['/recruiter/ShortListed']);
    this.shortlist = true
    this.applied = false
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false


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
    localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS')
    this.router.navigate(['/ScheduledInterviews']);
    this.scheduled = true
    this.Jobrecruit = false
    this.Vendorrecruit = false
    this.home = false
    this.applied = false
    this.shortlist = false

    this.Vendorrecruit = false
    this.applied = false
    this.shortlist = false

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



  public Selected() {
    localStorage.setItem('Pagename', 'SELECTED CANDIDATES')
    this.router.navigate(['hirignmanager/SelectedCandidates']);
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
    this.offered = true
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

  public Joined() {
    localStorage.setItem('Pagename', 'JOINED CANDIDATES')
    this.router.navigate(['/hr/JoinedCandidates']);
    this.joined = true
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


  public Dropped() {
    localStorage.setItem('Pagename', 'DROPPED CANDIDATES')
    this.router.navigate(['/hr/DroppedCandidates']);
    this.dropped = true
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

    this.vendorreport = false
    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

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
    this.appliedreport = true
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

    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

  }

  public Shortlistedreport() {
    localStorage.setItem('Pagename', 'SHORTLISTED CANDIDATES REPORT')
    this.router.navigate(['/report/ShortlistedCandidatesReports']);

    this.shortlistedreport = true
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

    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

  }

  public ScheduledReport() {
    localStorage.setItem('Pagename', 'SCHEDULED INTERVIEWS REPORT')
    this.router.navigate(['/ScheduledInterviewsReports']);
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
    this.selectedreport = true
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

  public OfferedReport() {
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/report/OfferedCandidatesReports']);
    this.offeredreport = true
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

    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false

  }

  public JobRecruitReport() {
    localStorage.setItem('Pagename', 'OPEN POSITIONS')
    this.router.navigate(['/report/JobRecruitementReport']);
    this.Jobrecruitreport = true
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

    this.joinedreport = false
    this.droppedreport = false

  }

  public JoinedReport() {
    localStorage.setItem('Pagename', 'JOINED CANDIDATES REPORT')
    this.router.navigate(['/report/JoinedCandidatesReport']);
    this.joinedreport = true
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

    this.droppedreport = false

  }

  public DroppedReport() {
    localStorage.setItem('Pagename', 'DROPPED CANDIDATES REPORT')
    this.router.navigate(['/report/DroppedCandiadtesReports']);
    this.droppedreport = true
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


  }

  help(){
    this.active = 'help'
    this.home=false
    this.jobstaff=false
    this.recruitstaff=false
    this.setup=false
    localStorage.setItem("clickname", "HELP")
  }

  public  SupportTickets() {
    this.setup=false;
    localStorage.setItem('Pagename', 'CLOSED POSITION')
    this.router.navigate(['/shared/ClosedPosition']);
    this.dropped = false
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

    this.vendorreport = false
    this.appliedreport = false
    this.shortlistedreport = false
    this.selectedreport = false
    this.offeredreport = false
    this.Jobrecruitreport = false
    this.joinedreport = false
    this.droppedreport = false
    this.active='SupportTickets'
    this.jobstaff=false                      

  }

  Supporttickets(){
    this.active = 'SupportTickets'
    this.router.navigate(['/shared/SupportTicketDashboard'])
   
    localStorage.setItem("Pagename", "support tickets")
  }

  offermanage(){
    this.active = 'offermanage'
    localStorage.setItem("clickname", "offermanage")
    this.router.navigate(['/OfferManagement']);
  }

  public Description(){
    // localStorage.setItem('Pagename', 'Job Description')
    // this.router.navigate(['/JobDescriptionDash']);

    this.active = 'Description'
    this.vendorstaf=false
    this.jobstaff=false
    this.recruitstaff=false
    this.client=false
    this.vendo=false
    localStorage.setItem("clickname", "Description")
    this.router.navigate(['admin/JobDescriptionDash']);
  }

  activeSetup()
  {
    this.setup=true;
    this.home=false;
    this.active='';
  }

  

}
