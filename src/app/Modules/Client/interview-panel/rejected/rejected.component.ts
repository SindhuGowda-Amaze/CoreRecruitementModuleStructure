
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Search the Job tittle & Count,Get OfferLetter, S Reject Candidate Deatils, Get date & Count & Job tittle. 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {

    //Variable Declerations//
    Date: any;
    OfferComments: any;
    joblist: any;
    count: any;
    term: any;
    search: any;
    loader: any;
    roleid: any;
    currentUrl: any;
    candidateid: any;
    candidatename: any;
    email: any;
    searchbynotice: any;
    dummjoblist: any;


  constructor(private RecruitServiceService: RecruitementService) { }
 
  ngOnInit(): void {

  //Variable Initialisation and Default Method Calls//
    this.GetCandidateReg();
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
  }

  //Method to Search the Job tittle & Count//

  public GetCandidateReg() {
    this.RecruitServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.interviewRejected == 1);
        this.loader = false;
        this.count = this.joblist.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Candidate Registration');
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

  // Method to Get OfferLetter//

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
  public Accept(id: any, comments: any) {
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
            Swal.fire('Issue in Accepting RejectOffer');
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

  // Method to Reject Candidate Deatils AcceptRejectOffer table//
  public Reject(id: any, comments: any) {
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
            Swal.fire('Issue in Accepting RejectOffer');
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
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  // Method to get Offer candidate Deatils//
  public GetOfferID(id: any, job: any) {
    this.candidateid = id;
    this.candidatename = job.candidateName,
      this.email = job.email
  }
 
// Method to Get date & Count & Job tittle//
  public GetDate(event: any) {
    if (this.Date == 0) {
      debugger
      this.RecruitServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data;
          debugger
          this.dummjoblist = data;
          this.count = this.joblist.length;
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
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
    else {
      debugger
      this.joblist = this.dummjoblist.filter((x: { date: any; }) => x.date == this.Date);
      this.count = this.joblist.length;
    }
  }
}


