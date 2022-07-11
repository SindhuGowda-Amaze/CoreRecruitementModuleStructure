import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private RecruitmentServiceService:RecruitementService,private ActivatedRoute:ActivatedRoute) { }
  vendordetails:any;
  vendor_Logo:any;
  vendor_Name:any;
  phone_Number:any;
  email_Id:any;
  address:any;
  search:any;
  count:any;
  loader:any;
  Job:any;
 
  
  ngOnInit(): void {
    this.GetVendor_Dasboard(); 
    this.loader=true;
 
  }

  public GetVendor_Dasboard() {
    this.RecruitmentServiceService.GetVendor_Dasboard().subscribe(data => {   
    this.vendordetails = data;
    this.loader=false;
    this.count = this.vendordetails.length;    
    })
  }
  edit(id: any){
    debugger
   location.href="#/VendorForm/"+ id;
  }



  public Ondelete(id: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.RecruitmentServiceService.DeleteVendor_Dasboard(id).subscribe(
          data => {
            debugger
            this. GetVendor_Dasboard();
            swal.fire('Deleted Sucessfully');
          }
        )
      }
    })
  }
}
