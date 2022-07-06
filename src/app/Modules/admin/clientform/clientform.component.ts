import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
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
  showButton:any;

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetClientMaster();
        this.showButton=1;
      }
      else
      {
        this.showButton=2;
        this.GetClientMaster();
      }
    })
  }

  GetClientMaster() {
    this.RecruitmentServiceService.GetClientMaster().subscribe(
      data => {
        debugger
        this.result = data;
        this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
        this.ID = this.result[0].iD;
        this.Company_logo = this.result[0].company_logo;
        this.Name = this.result[0].name;
        this.PhoneNo = this.result[0].phoneNo;
        this.Email = this.result[0].email;
        this.Address = this.result[0].address;
      })
  }


  id: any;
  ID: any;
  Company_logo: any;
  Name: any;
  PhoneNo: any;
  Email: any;
  Address: any;
  result: any;





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

      "ID": this.ID,
      "Logo": this.Company_logo,
      "Name": this.Name,
      "PhoneNo": this.PhoneNo,
      "Email": this.Email,
      "Address": this.Address,

    };

    this.RecruitmentServiceService.InsertClientMaster(json).subscribe(
      data => {


        location.href = "#/ClientDashBoard"
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
    this.RecruitmentServiceService.UploadImages(this.files).subscribe(res => {
      debugger
      this.Company_logo = res;
      alert("ATTACHMENT UPLOADED");
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
  //   if(this.Name==undefined||this.PhoneNo==undefined||this.Email==undefined||this.Address==undefined||this.Company_logo==undefined)
  // {
  //   alert("Please Fill All Fields to Save!!!")
  // }
  if(this.RegForm.invalid)
  {
    alert("Please Fill All Fields to Save!!!")
  }
  else{
    var entity = {
      'Logo': this.Company_logo,
      'Name': this.Name,
      'PhoneNo': this.PhoneNo,
      'Email': this.Email,
      'Address': this.Address,
    }
    this.RecruitmentServiceService.InsertClientMaster(entity).subscribe(data => {
      // if (data != 0) {
      //   Swal.fire("Successfully Submitted...!!");
      // }
      let id=data;
      Swal.fire("Successfully Submitted...!!");
      location.href = "#/ClientDashBoard"
    })
  }
   
  }




  public Update() {
    debugger;
    var entity = {
      'ID': this.ID,
      'Logo': this.Company_logo,
      'Name': this.Name,
      'PhoneNo': this.PhoneNo,
      'EmailID': this.Email,
      'Address': this.Address,
    }
    this.RecruitmentServiceService.UpdateClientMaster(entity).subscribe(data => {
      Swal.fire("Updated Sucessfully...");
      location.href = "#/ClientDashBoard";

    })
  }

  cancel() {
    location.href = "#/ClientDashBoard";
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
