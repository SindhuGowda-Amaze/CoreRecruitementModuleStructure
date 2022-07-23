import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-staff-form',
  templateUrl: './client-staff-form.component.html',
  styleUrls: ['./client-staff-form.component.css']
})
export class ClientStaffFormComponent implements OnInit {
  currentUrl: any;
  res:any

  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetRoleType();

    this.GetClientMaster();


        this.ActivatedRoute.params
        .subscribe(params=>{
      debugger
     this.id=params["id"];
     if(this.id!=null&&this.id!=undefined){
       this.GetClientStaff1();
     }
    })










    
  }
  RoleList:any;
  public GetRoleType() {
    debugger
    this.RecruitmentServiceService.GetRoleType().subscribe({
      next: data => {
        debugger
        this.RoleList = data
        this.count = this.RoleList.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting RoleType');
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



  ClientStaffList:any;
  public GetClientMaster() {
    debugger
    this.RecruitmentServiceService.GetClientMaster().subscribe({
      next: data => {
        debugger
        debugger
        this.ClientList=data ;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ClientMaster');
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

  id:any;
  // Company_logo:any;
  
  Name: any;
  PhoneNo: any;
  Email: any;
  Address: any;
  Role: any;
  Signature: any;
  Staff: any;
  StaffList: any;
  count: any;
  result:any;
  clientName:any;
  email:any;
  ClientList:any;
  recruiterlist:any;

  GetClientStaff1()
  {
  this.RecruitmentServiceService.GetClientStaff().subscribe(
    data => {
      debugger
      this.result = data;
      this.result=this.result.filter((x: {id: any;})=>x.id==Number(this.id));
      this.client=this.result[0].clientName;
      this.Role=this.result[0].role_Id;
      this.Name=this.result[0].name;
      this.PhoneNo=this.result[0].phoneNo;
      this.Email=this.result[0].email;
      this.Address = this.result[0].address;
      this.Signature = this.result[0].signature;
      this.Staff=this.result[0].clientID;
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

  client:any;

 Save() {
  debugger
  // if(this.Staff==undefined||this.Role==undefined||this.Email==undefined||this.PhoneNo==undefined||this.Address==undefined||this.Signature==undefined)
  // {
  //   alert("Please Fill All Fields to Save!!!")
  // }
  // else{
   
    var json = {
      "ClientID": this.client,
      "Role_Id": this.Role,
      "Name": this.Name,
      "PhoneNo": this.PhoneNo,
      "Email": this.Email,
      "Address": this.Address,
      "Signature": this.Signature,
    };
    this.RecruitmentServiceService.InsertClientStaff(json).subscribe({
        next: data => {
          debugger
          let id = data;
          Swal.fire("Successfully Submitted...!!");
          location.href = "#admin/ClientStaffDashBoard"
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting ClientStaff');
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
  // }
}


  onRemove(event:any)
  {
debugger
console.log(event);
this.files.splice(this.files.indexOf(event),1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe({
      next: (res: any) => {
        debugger
        this.Signature = res;
      alert("Signature Uploaded...!");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Uploading Signature ');
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
  Staff1:any
  Update() {
    debugger
    var json = {
      "ID":this.id,
      "ClientID": this.client,
      "Role_Id": this.Role,
      "Name": this.Name,
      "PhoneNo": this.PhoneNo,
      "Email": this.Email,
      "Address": this.Address,
      "Signature": this.Signature,
    };

    this.RecruitmentServiceService.UpdateClientStaff(json).subscribe({
        next: data => {
          debugger
          let result = data;
          Swal.fire("Updated Sucessfully...");
          location.href = "#admin/ClientStaffDashBoard";
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
cancel(){
  location.href = "#admin/ClientStaffDashBoard";
}
}

