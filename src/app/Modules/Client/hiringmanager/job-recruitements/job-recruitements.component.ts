import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-recruitements',
  templateUrl: './job-recruitements.component.html',
  styleUrls: ['./job-recruitements.component.css']
})
export class JobRecruitementsComponent implements OnInit {

  jobListCopy: any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute, public router: Router,) { }
  joblist: any;
  search: any;
  count: any;
  date: any;
  loader: any;
  p: any = 1;
  count1: any = 5;
  dummjoblist1: any;
  Userlist: any;
  Hired: any;
  hrlist:any;
  roleid:any;
  NoofpositionsHired: any;
  dropdownSettings1: any = {};
  dropdownList1: any = [];
  username:any;
  ngOnInit(): void {
    this.show=0;
    this.hiringManager="";
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName'); 
    this.loader = true;
  
    this.GetRecruiterStaff();
    this.GetUserslist();
    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })

    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      debugger
      this.dropdownList1 = data;
    })


    this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
      if(this.roleid==2){
        this.joblist = data.filter(x=>x.hiringManager==this.username);
      }
      else if(this.roleid==11){
        this.joblist = data.filter(x=>x.status=='Manager Pending');
      }
      else if(this.roleid==10){
        this.joblist = data.filter(x=>x.status=='Manager Approved BU Pending');
      }
      else
      {
        this.joblist = data;
      }
     
      this.jobListCopy = this.joblist
      this.dummjoblist = data;
      this.dummjoblist1 = data.filter(x => x.ID == this.ID);
      this.loader = false;
      debugger
      this.count = this.joblist.length;
    })


    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'vendor_Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 20,
      allowSearchFilter: true,

    };



  }

  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
  }


  public GetUserslist() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {
      this.Userlist = data;

    })
  }
  show:any;
  
  description:any;  
  GetId(id: any) {
    this.ID = id
    debugger
    this.description = this.joblist.filter((x: { ID: any; }) => x.ID == this.ID);
    this.show=1;
  }
  empcomments: any;
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }

  skills: any;
  public GEtskills(job: any) {
    this.skills = job.skills
  }




  UpdateJobPost() {
    debugger
    var entity = {
      "ID": this.ID,
      "Hired": this.Hired,
      "NoofpositionsHired": this.NoofpositionsHired,
    }
    this.RecruitmentServiceService.UpdateJobPost(entity).subscribe(data => {

      Swal.fire('Job Unposted Successfully');
      location.reload();

    })
  }
  ID: any;
  Vendor: any;
  Notes: any;
  vendorid: any;
  userid: any;
  public UpdateVendor() {
    debugger

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
  Getvendorid(even: any) {
    debugger
    this.vendorid = even.target.value;
    debugger
    var list = this.Userlist.filter((x: { id: any; }) => x.id == this.vendorid);
    this.Vendor = list[0].name

  }


  public Regularization() {
    debugger
    this.router.navigate(['/AttendanceView']);
  }

  Recruiter: any;

  public UpdateRecruiter() {
    debugger

    var entity = {
      "ID": this.ID,
      "Recruiter": this.Recruiter,
      "Notes": this.Notes,

    }
    this.RecruitmentServiceService.AssignRecruiter(entity).subscribe(data => {

      Swal.fire('Updated successfully');
      location.reload();

    })
  }
  stafflist: any;
  public GetRecruiterStaff() {
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe(
      data => {
        this.stafflist = data
      })
  }
  dummjoblist: any;
  public GetDate(event: any) {
    if (this.date == 0) {
      debugger
      this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
        this.joblist = data;
        debugger
        this.dummjoblist = data;

        this.count = this.joblist.length;
      })
    }
    else {
      debugger
      this.joblist = this.dummjoblist.filter((x: { date: any; }) => x.date == this.date);
      this.count = this.joblist.length;
    }

  }


  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitmentServiceService.GetJob_Requirements().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x => x.vendor == null && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })
  }

public ApproveId(data:any){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You Want to Approve it.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Approve it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value == true) {
      if(this.roleid==11){
        var entity = {
          "ID": data,
        
          "Status": 'Manager Approved BU Pending',
        
        }
        this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
          debugger
          Swal.fire('Approved Successfully')
          location.reload();
        })
      }
      else if(this.roleid==10){
        var entity = {
          "ID": data,
          "Status": 'Manager Approved BU Approved',
        
        }
        this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
          debugger
          Swal.fire('Approved Successfully')
          location.reload();
        })
      }
     
    
    }
  })
}


  public Reject(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to Reject it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          "ID": ID,
          "Status": 'Manager Rejected',
        
        }
        this.RecruitmentServiceService.UpdateJobRequirementStatus(entity).subscribe(data => {
          debugger
          Swal.fire('Rejected Successfully')
          location.reload();
        })
      }
    })
  }


}
