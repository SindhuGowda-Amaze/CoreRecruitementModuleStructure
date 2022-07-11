import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

  Date: any;

  constructor(private RecruitServiceService:RecruitementService) { }
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  search:any;
  loader:any;
  roleid:any;
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.GetCandidateReg();
  }

  public GetCandidateReg() {
    this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {
      this.joblist = data.filter(x => x.offerAcceptreject == 2 );
      this.loader=false;
      this.count = this.joblist.length;
    })

  }

  public GetOfferLetter(offer:any) {
    window.open(offer, "_blank")
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
        this.RecruitServiceService.AcceptRejectOffer(id, 1, comments).subscribe(data => {
          swal.fire(
            'Joined!',
            'Candidate has Joined',
            'success'
          )
          this.GetCandidateReg()
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
        this.RecruitServiceService.AcceptRejectOffer(id, 2, comments).subscribe(data => {
          swal.fire(
            'Rejected!',
            'Candidate has dropped',
            'success'
          )
          this.GetCandidateReg()
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
  candidateid:any;
  candidatename:any;
  email:any;
  searchbynotice:any;
  public GetOfferID(id:any, job:any) {
    this.candidateid = id;
    this.candidatename = job.candidateName,
      this.email = job.email
  }
  dummjoblist:any;
  
  public GetDate(event: any) {
    if (this.Date == 0) {
      debugger
      this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {
        this.joblist = data;
        debugger
        this.dummjoblist = data;
        this.count = this.joblist.length;
      })
    }
    else {
      debugger
      this.joblist = this.dummjoblist.filter((x: { date: any; }) => x.date == this.Date);
      this.count = this.joblist.length;
    }
  }
}


