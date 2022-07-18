import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recruiter-form',
  templateUrl: './recruiter-form.component.html',
  styleUrls: ['./recruiter-form.component.css']
})
export class RecruiterFormComponent implements OnInit {

  Company_logo: any;
  ID: any;
  recruiterlist: any;
  Name: any;
  PhoneNo: any;
  Email: any;
  Address: any;
  currentUrl:any
  err :any
  Role: any;
  
  constructor(private RecruitmentServiceService: RecruitementService,private ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID != undefined && this.ID!=null) {
        this.GetRecruiterMaster();
      }
    })
  }
  public GetRecruiterMaster() {
    this.RecruitmentServiceService.GetRecruiterMaster().subscribe({
  next: data => {
    debugger
    this.recruiterlist = data
    this.Company_logo=this.recruiterlist[0].logo;
    this.Name=this.recruiterlist[0].name;
    this.PhoneNo=this.recruiterlist[0].phoneNo;
    this.Email=this.recruiterlist[0].email;
    this.Address=this.recruiterlist[0].address;
  }, error: (err: { error: { message: any; }; }) => {
    Swal.fire('Getting Recruiter Master');
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

  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
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
    Swal.fire('ATTACHMENT UPLOADED');
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
public insertdetails() {
    debugger
    var entity = {
      'Logo': this.Company_logo,
      'Name': this.Name,
      'PhoneNo': this.PhoneNo,
      'Email': this.Email,
      'Address': this.Address,
    }
    this.RecruitmentServiceService.InsertRecruiterMaster(entity).subscribe({
  next: data => {
    debugger
    if (data != 0) {
      Swal.fire("Registered Successfully");
    }
    location.reload();
    Swal.fire('Issue in Getting Expenses List Web');
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': this.err.error.message
    }
    this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})

  }

  public updateRecruiter() {
    debugger;
    var entity = {
        'Logo': this.Company_logo,
        'Name': this.Name,
        'PhoneNo': this.PhoneNo,
        'EmailID': this.Email,
        'Address': this.Address, 
    }
    this.RecruitmentServiceService.UpdateRecruiterMaster(entity).subscribe({
  next: data => {
    debugger
    Swal.fire('Recruiter Updated Successfully.');
      location.href = "/RecruiterDashboard";
  }, error: (err: { error: { message: any; }; }) => {
    Swal.fire('Issue in Getting Expenses List Web');
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
  cancel() {
    location.href = "#/admin/RecruiterStaffDashboard";
  }

  RoleList:any;
  public GetRoleType() {
    debugger
    this.RecruitmentServiceService.GetRoleType().subscribe({
      next: data => {
        debugger
        this.RoleList = data
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Expenses List Web');
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

}
