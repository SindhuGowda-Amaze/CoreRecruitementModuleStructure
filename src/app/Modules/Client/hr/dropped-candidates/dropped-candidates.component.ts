//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains   Get Company Staff Details,Get Job Staff Details,Get offer letter,Search Job Tittle,Displaying the Date changes,Displaying the option changes,Accept Candidate Details,dropped Candidate Details,Get Count joblist,Get Count staffdetails.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022



import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dropped-candidates',
  templateUrl: './dropped-candidates.component.html',
  styleUrls: ['./dropped-candidates.component.css']
})
export class DroppedCandidatesComponent implements OnInit {
  
    
  //Variable Declerations//

  title: any;
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  search:any;
  loader:any;
  jobListCopy:any;
  p: any = 1;
  count1: any = 5;
  Date:any;
  option:any;
  roleid:any;
  hrlist:any;
  username:any;
  currentUrl:any
  endDate : any
  staffdetails:any
  vendor: any
  role:any;
  Role: any;
  hiringManager:any;

  constructor(private RecruitmentServiceService:RecruitementService) { }

  
  ngOnInit(): void {

   //Variable Initialisation and Default Method Calls//

    this.role="";
    this.GetJobDescription();
    this.Role="";
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
 
    this.GetCandidateReg()
  }


   //Method to Get Company Staff Data//

  GetRecruiterStaff(){

    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
        debugger
        this.hrlist = data.filter(x=>x.role=="Hiring Manager");

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Client Staff');
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
  // GetJobDescriptionMaster() {
  //   throw new Error('Method not implemented.');
  // }

 //Method to Get Job Staff Details//

  public GetCandidateReg() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if(this.roleid==2){
          this.joblist = data.filter(x=>x.hiringManager==this.username && x.offerAcceptreject == 2);
        }
        else
        {
          this.joblist = data.filter(x => x.offerAcceptreject == 2);
          this.jobListCopy = this.joblist
        }
       
        this.loader=false;
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Candidate Registration');
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

   //Method to Get offer letter//

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

   //Method to Search Job Tittle//

  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
  }

 //Method to Displaying the Date changes //

  public changeAnniversary() {
    debugger;
  
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        // this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
        this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);


      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' issue in Getting Candidate Registration');
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

 ;
  }

   //Method to Displaying the option changes // 
  public changeoption() {
    debugger;
  
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.vendorName == this.option);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Candidate Registration');
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
  ;
  }

 //Method to Displaying the Accept Candidate Details //
  
  public Accept(id:any, comments:any) {
    swal.fire({
      title: 'Are you sure?',
      text: 'Candidate joined!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Joined it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecruitmentServiceService.AcceptRejectOffer(id, 1, comments).subscribe({
          next: data => {
            debugger
            swal.fire(
              'Joined!',
              'Candidate has Joined',
              'success'
            )
            this.GetCandidateReg()
            
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Accepting RejectOffer');
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


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

 //Method to Displaying the dropped Candidate Details //

  public Reject(id:any, comments:any) {
    swal.fire({
      title: 'Are you sure?',
      text: 'Candidate has dropped!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, dropped!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecruitmentServiceService.AcceptRejectOffer(id, 2, comments).subscribe({
          next: data => {
            debugger
            swal.fire(
              'Rejected!',
              'Candidate has dropped',
              'success'
            )
            this.GetCandidateReg()
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Accepting RejectOffer');
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
  
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

 //Method to Get Count joblist //

  public GetJobRequirements(){
  
  
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.offerAcceptreject == 2 && x.hiringManager == this.hiringManager);
     
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
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

   //Method to Get Count staffdetails // 

  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        this.staffdetails = data;
        this.loader=false;
        this.count=this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Get Job Description Master ');
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


