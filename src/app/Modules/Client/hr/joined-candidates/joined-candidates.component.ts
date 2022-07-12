import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-joined-candidates',
  templateUrl: './joined-candidates.component.html',
  styleUrls: ['./joined-candidates.component.css']
})
export class JoinedCandidatesComponent implements OnInit {
  title: any;

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
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName');
    this.loader=true;
    this.hiringManager="";
    this.GetCandidateReg();

    this.RecruitServiceService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })
  }

  public GetCandidateReg() {
    this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {

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
  
    this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {
  
      this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
    });
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

  hiringManager:any;
  public GetJobRequirements(){
  
  
    this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x =>  x.offerAcceptreject == 1 && x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })

  }

    public jobTitle() {
      debugger;
  
      this.RecruitServiceService.GetClientStaff().subscribe(data => {
        this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.jobTitle == this.title));
      });
    }
  
  
  
    public CandidateRegistration () {
      debugger;
  
      this.RecruitServiceService.GetCandidateRegistration().subscribe(data => {
  
        this.joblist = data.filter(x => x.cdate == this.Date + "T00:00:00");
      });
    }
  



  
   
  
  
  }

