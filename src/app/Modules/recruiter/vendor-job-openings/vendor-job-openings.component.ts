import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-angular';


@Component({
  selector: 'app-vendor-job-openings',
  templateUrl: './vendor-job-openings.component.html',
  styleUrls: ['./vendor-job-openings.component.css']
})
export class VendorJobOpeningsComponent implements OnInit {

  Date: any;
  title: any;
  
  
  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }
  public Editor = ClassicEditor;
  joblist: any;
  search: any;
  count: any;
  vendorid: any;
  term:any;
  userid:any;
  roleid:any;
  jobListCopy:any;
  p: any = 1;
  count1: any = 5;
  dropdownSettings1: any = {};
  dropdownList1: any = [];
  selectedItems1: any = [];
  hrlist:any;
  hiringManager:any
  username:any;
  ngOnInit(): void {
    debugger;
    this.userid=sessionStorage.getItem('userid')
    this.hiringManager="";
    this.vendorid = sessionStorage.getItem('vendorid');
    this.username= sessionStorage.getItem('UserName')
    this.roleid = sessionStorage.getItem("roleid")

    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })
    if(this.roleid=='3'){
      debugger;
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        this.joblist = data.filter(x => x.vendor == this.username);
        this.count = this.joblist.length;
      })
  
    }
    else {
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        this.joblist = data.filter(x=>x.status=='Manager Approved BU Approved');
        this.jobListCopy = this.joblist
        this.count = this.joblist.length;
      })
    }

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'vendor_Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,

    };



    this.GetUserslist();

    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      debugger
      this.dropdownList1 = data;
    })

  

  }
  // Userlist: any;
  // public GetUserslist() {
  //   this.RecruitmentServiceService.GetUserslist().subscribe(data => {
  //     this.Userlist = data.filter(x => x.userRoleID == 7);
  //     this.count = this.joblist.length;
  //   })
  // }
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
  }
  GetId(id: any) {
    this.ID = id
    location.href = "#/recruiter/JobVacancies/" + this.ID
  }


  description: any;
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }

  skills: any;
  public GEtskills(job: any) {
    this.skills = job.skills
  }

  GetId1(id: any) {
    this.ID = id
    this.Getvendorid(this.ID);
  }
  ID: any;
  searchByCtc: any
  Vendor:any;
  Notes:any;
  public UpdateVendor() {
    debugger
  for (let i = 0; i < this.selectedItems1.length; i++) {
    this.Vendor =  this.selectedItems1[i].vendor_Name;
     
    }
    var entity = {
      "ID": this.ID,
      "Vendor": this.Vendor,
      "Notes": this.Notes,
      "VendorId": 1
    }
    this.RecruitmentServiceService.UpdateVendor(entity).subscribe(data => {

      Swal.fire('Updated successfully');
      location.reload();

    })
  }

  Userlist: any;
  public GetUserslist() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      this.Userlist = data;

    })
  }


  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.vendorid = item.id;
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      debugger
      this.selectedItems1 = data.filter(x=>x.id==this.vendorid);
    })
  }



  Getvendorid(even: any) {
    debugger
    this.vendorid = even;
    debugger
    var list = this.Userlist.filter((x: { id: any; })=>x.id==this.vendorid);
    this.Vendor=list[0].name

  }
  
  





  public GetDate(event:any) {
    if(this.Date==0){
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        this.joblist = data.filter(x => x.recruiter == this.userid);
        this.count = this.joblist.length;
      })
    }
    else{
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        debugger
        this.joblist = data.filter(x => x.recruiter == this.userid && x.date==this.Date);
      debugger
        this.count = this.joblist.length;
      })
    }
    
  }

  public GetJobRequirements(){
  
  
    this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x => x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })
  
   
  
  
  }

  public jobTitle() {
    debugger;

    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.jobTitle == this.title));
    });
  }



  public CandidateRegistration () {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe(data => {

      this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
    });
  }










}
