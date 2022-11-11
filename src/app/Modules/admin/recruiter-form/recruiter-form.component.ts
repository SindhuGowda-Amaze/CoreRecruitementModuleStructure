//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains  methods from   Serach the Staff Details,Displaying the Role Tittle,Displaying the Company Details,Insert & Update RecruiterStaff Details,Routing with Respect of URL,Upload the imges & Files
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022



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

 
//Variable Declerations//

  Signature: any;
  recruiterlist: any;
  count: any;
  Name: any;
  PhoneNo: any;
  Email: any;
  Address: any;
  RecruiterID: any;
  ID: any;
  roleList: any;
  roleid: any;
  staffid : any
  stafflist : any 
  Logo: any
  show : any
  files: File[] = [];

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

   //Variable Initialisation and Default Method Calls//

    this.GetRecruiterMaster();
    this.GetRoleType();
    this.ActivatedRoute.params.subscribe(params => {
      this.ID = params['id'];
      if (this.ID != undefined && this.ID != null) {
        this.GetRecruiterStaff()
        this.show=1
      }
    })
    this.GetRoleType();
  }


  
// Methods to Get Serach the Recruiter Staff Details//

  public GetRecruiterStaff() {
    debugger
    this.RecruitmentServiceService.GetRecruiterStaff().subscribe(
      data => {
        this.recruiterlist = data.filter(x=>x.id==this.ID)
        // this.RecruiterID = this.recruiterlist[0].recruiterName;
      
        this.Name = this.recruiterlist[0].name;
        this.PhoneNo = this.recruiterlist[0].phoneNo;
        this.Email = this.recruiterlist[0].email;
        this.Address = this.recruiterlist[0].address;
        this.Signature = this.recruiterlist[0].logourl;
        this.roleid= this.recruiterlist[0].roleId
        this.Logo = this.recruiterlist[0].signature
        // this.count = this.recruiterlist.length;
      })
  }

  // Methods to Displaying Role Tittle//

  public GetRoleType() {
    debugger
    this.RecruitmentServiceService.GetRoleType().subscribe(
      data => {
        this.roleList = data
        this.count = this.roleList.length;
      })
  }


    // Methods to Upload The files/

  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }


    // Methods to remove The files/

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

   // Methods to Upload The Images/

  public uploadattachments() {
    debugger
    this.RecruitmentServiceService.UploadImages(this.files).subscribe(res => {
      debugger
      this.Signature = res;
      Swal.fire('Attachment Added Successfully');
    })
  }

  
// Methods to Get Count the Recruiter Staff Details//

  public GetRecruiterMaster() {
    debugger
    this.RecruitmentServiceService.GetRecruiterMaster().subscribe(
      data => {
        this.recruiterlist = data.filter(x => x.id == this.ID)
        this.count = this.recruiterlist.length;
      })
  }

  
  
// Methods to Insert the Data in RecruiterStaff table//

  public insertdetails() 
  {
    debugger
    if( this.roleid==undefined||this.roleid==null|| 
      this.Name==undefined||this.Name==null||
      this.PhoneNo==undefined||this.PhoneNo==null||
      this.Email==undefined||this.Email==null||
      this.Address==undefined||this.Address==null
      // this.Signature==undefined||this.Signature==null
      )
      {
      Swal.fire("Please fill all fields!!");
    }
    else{
      var entity = {
        'recruiterID':'4',
        'name': this.Name,
        'phoneNo': this.PhoneNo,
        'email': this.Email,
        'address': this.Address,
        "signature": this.Signature,
        "roleId": this.roleid
      }
      this.RecruitmentServiceService.InsertRecruiterStaff(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/admin/RecruiterStaffDashboard";
        }
      })
    }
  }
// Methods to Update the Data in RecruiterStaff table//

  public Update() {
    debugger
    var entity = {
      'ID': this.ID,
      'recruiterID':'4',
      'name': this.Name,
      'phoneNo': this.PhoneNo,
      'email': this.Email,
      'address': this.Address,
      "signature": this.Signature,
      "roleId": this.roleid
    }
    this.RecruitmentServiceService.UpdateRecruiterStaff(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire("Updated Recruiter Staff Successfully");
        // location.reload();
        location.href = "#/admin/RecruiterStaffDashboard";
      }
    })
  }

  //Method to Get Routing with Respect OF URL//
  cancel() {
    location.href = "#/admin/RecruiterStaffDashboard"
  }
  
  StaffID(even: any){
    debugger
    this.staffid = even.target.value;
    debugger
   this.GetRecruiterStaff()
  }
}
