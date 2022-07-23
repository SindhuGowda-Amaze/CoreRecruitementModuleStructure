import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.css']
})
export class ClientformComponent implements OnInit {
  RegForm = new FormGroup({
    // Company_logo: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    PhoneNo: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
  })

  count: any;
  recruiterlist: any;
  showButton: any;
  currentUrl: any
  res: any
  email: any;
  id: any;
  ID: any;
  Company_logo: any;
  Name: any;
  PhoneNo: any;
  Email: any;
  Address: any;
  result: any;
  show : any
  logo: any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.ActivatedRoute.params
      .subscribe(params => {
        debugger
        this.id = params["id"];
        if (this.id != null && this.id != undefined) {
          this.GetClientMaster();
          this.showButton = 1;
          this.show=1
        }
        else {
          this.showButton = 2;
          this.GetClientMaster();
        }
      })

  }
  Logo : any




  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }

  public InsertClientMaster() {
    debugger
    var json = {


      "Logo": this.Company_logo,
      "Name": this.Name,
      "PhoneNo": this.PhoneNo,
      "Email": this.Email,
      "Address": this.Address,

    };

    this.RecruitmentServiceService.InsertClientMaster(json).subscribe({
      next: data => {
        debugger
        location.href = "#/admin/ClientDashBoard"
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting ClientMaster');
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
  alert("Mentioned PhoneNo is " + this.PhoneNo)
  }

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe({
      next: data => {
        debugger
        this.Company_logo = data;
        Swal.fire("Attachment Uploaded");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Uploading Images');
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
 // Save() {
  //   debugger
  //   var json = {
  //     "Logo": this.Company_logo,
  //     "Name": this.Name,
  //     "PhoneNo": this.PhoneNo,
  //     "Email": this.Email,
  //     "Address": this.Address,
  //   };
  //   this.RecruitmentServiceService.InsertClientMaster(json).subscribe(
  //     data => {
  //       debugger
  //       let id = data;
  //       alert("Successfully Submitted...!!")
  //       location.href = "/ClientDashBoard"
  //     })
  // }


  public Save() {
    debugger
      if(this.Name==undefined||this.PhoneNo==undefined||this.Email==undefined||this.Address==undefined||this.Company_logo==undefined)
    {
     
    }
    if (this.RegForm.invalid) {
      Swal.fire("Please Fill All Fields to Save!!!")
    }
    else {
      var entity = {
        'Logo': this.Company_logo,
        'Name': this.Name,
        'PhoneNo': this.PhoneNo,
        'Email': this.Email,
        'Address': this.Address,
      }
      this.RecruitmentServiceService.InsertClientMaster(entity).subscribe({
        next: data => {
          debugger
          let id = data;
          Swal.fire("Saved Successfully!!");
          location.href ="#/admin/Clientdashboard"
        
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Inserting ClientMaster');
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

  
  GetClientMaster() {
    this.RecruitmentServiceService.GetClientMaster().subscribe({
      next: data => {
        debugger
        this.result = data;
        this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
        this.ID = this.result[0].id;
        this.Company_logo = this.result[0].logourl;
        this.Name = this.result[0].name;
        this.PhoneNo = this.result[0].phoneNo;
        this.Email = this.result[0].email;
        this.Address = this.result[0].address;
        this.Logo = this.result[0].logo
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
  public Update() {
    debugger;
    var entity = {
      'ID': this.id,
      'Logo': this.Company_logo,
      'Name': this.Name,
      'PhoneNo': this.PhoneNo,
      'Email': this.Email,
      'Address': this.Address,
    }
    this.RecruitmentServiceService.UpdateClientMaster(entity).subscribe({
      next: data => {
        debugger
        Swal.fire("Updated Successfully...");
        debugger
        location.href ="#/admin/Clientdashboard";
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating ClientMaster');
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
    location.href = "#/admin/Clientdashboard";
  }

  // Update() { 
  //   debugger
  //   var json = {
  //     "Logo": this.Company_logo,
  //     "Name": this.Name,
  //     "PhoneNo": this.PhoneNo,
  //     "Email": this.Email,
  //     "Address": this.Address,
  //   };

  //   this.RecruitmentServiceService.UpdateClientMaster(json).subscribe(
  //     data => {
  //       debugger
  //       let result = data;
  //       Swal.fire("Updated Sucessfully...");
  //       location.href = "/ClientDashBoard";
  //     })
  // }

}
