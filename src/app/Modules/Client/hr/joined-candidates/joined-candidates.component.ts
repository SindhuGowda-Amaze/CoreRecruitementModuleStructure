import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
@Component({
  selector: 'app-joined-candidates',
  templateUrl: './joined-candidates.component.html',
  styleUrls: ['./joined-candidates.component.css']
})
export class JoinedCandidatesComponent implements OnInit {
  constructor(private RecruitServiceService:RecruitementService) { }
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  search:any;
  loader:any;
  p: any = 1;
  count1: any = 5;
  jobListCopy:any;
  roleid:any;
  Date:any;
  hrlist:any;
  username:any;
  endDate :any
  currentUrl:any
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
    this.GetCandidateReg();

    this.RecruitServiceService.GetClientStaff().subscribe({
      next: data => {
        debugger
        this.hrlist = data;

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Client Staff');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public GetCandidateReg() {
    this.RecruitServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if(this.roleid==2){
          this.joblist = data.filter(x=>x.hiringManager==this.username && x.offerAcceptreject == 1);
        }
        else
        {
          this.joblist = data.filter(x => x.offerAcceptreject == 1);
          this.jobListCopy = this.joblist
        }
  
        this.loader=false;
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
  }

  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string,jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy)||x.jobTitle.toLowerCase().includes(searchCopy));
  }

  public changeAnniversary() {
    debugger;
  
    this.RecruitServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        // this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
        this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);


      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    }) ;
  }
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
        this.RecruitServiceService.AcceptRejectOffer(id, 1, comments).subscribe({
          next: data => {
            debugger
            swal.fire(
              'Joined!',
              'Candidate has Joined',
              'success'
            )
            this.GetCandidateReg()
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
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
        this.RecruitServiceService.AcceptRejectOffer(id, 2, comments).subscribe({
          next: data => {
            debugger
            swal.fire(
              'Rejected!',
              'Candidate has dropped',
              'success'
            )
            this.GetCandidateReg()
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
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

  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x =>  x.offerAcceptreject == 1 && x.hiringManager == this.hiringManager);
     
        this.count = this.joblist.length;
     
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }
}
