
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get Company Staff Details,Search the Job Tittle,Approve & Reject Candidate, Displaying OfferLetters,Sending a mails.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';


@Component({
  selector: 'app-scheduled-interviews',
  templateUrl: './scheduled-interviews.component.html',
  styleUrls: ['./scheduled-interviews.component.css']
})
export class ScheduledInterviewsComponent implements OnInit {


  //Variable Declerations//

  files: any;
  Canclecomments: any;
  Cancleinterview: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderdaysdount: any = [];
  public callenderMonth: any;
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  joblist: any;
  search: any;
  count: any;
  staffid: any;
  Username: any;
  id: any;
  rinterview: any;
  jobListCopy: any;
  p: any = 1;
  count1: any = 5;
  currentUrl: any
  Date: any
  endDate: any
  staffdetails: any
  data: any
  Role1: any;
  cancle: any;
  showorhidecontent: any;
  jobid: any;
  dateformat1:any

  constructor(private RecriutmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute, private datePipe: DatePipe) { }



  ngOnInit(): void {
    this.GetCandidateReg();
    this.GetJobDescription()
    this.Role1 = ""
    this.currentUrl = window.location.href
    this.staffid = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');
    this.Username = sessionStorage.getItem('UserName');
    // this.insertdetails()
    this.showorhidecontent = false;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    var curr = new Date;
    //  this.todaydate1 = formatDate(myDate, format, locale);
    this.options1 = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    if (this.selectedlanguage == '1') {
      this.selectedlanguage1 = 'en';
    }
    else if (this.selectedlanguage == '2') {
      this.selectedlanguage1 = 'ar';
    }
    else if (this.selectedlanguage == '3') {
      this.selectedlanguage1 = 'id';
    }
    else if (this.selectedlanguage == '4') {
      this.selectedlanguage1 = 'zh';
    }
    else if (this.selectedlanguage == '5') {
      this.selectedlanguage1 = 'th';
    }
    else if (this.selectedlanguage == '6') {
      this.selectedlanguage1 = 'es';
    }
    this.options = {

      editable: true,
      locale: this.selectedlanguage1,
      header: {
        right: 'prev,next ',
        center: 'title',
        left: 'month listMonth'
      },

      // contentHeight: 300,
      height: 500,
    }
  }





  /*   changeStatus(evn: any) {
  
      if (evn.currentTarget.checked) {
        this.showorhidecontent = false;
      }
      else {
        this.showorhidecontent = true;
      }
  
    } */
  changeStatus(evn: any) {
    if (evn.target.value == 1) {
      this.showorhidecontent = true;
    }
    else {
      this.showorhidecontent = false;
    }
  }


  // Method to get Company Staff Details//

  public GetCandidateReg() {
    debugger
    if (sessionStorage.getItem('userid') == undefined) {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
          // filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);

          debugger
          this.jobListCopy = this.joblist
          console.log("===", this.jobListCopy)
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }

    else if (this.roleid == 6) {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.cancleinterview == null);
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }


    else {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid && x.cancleinterview == null);
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }

  }

  // Method to Search the Job Tittle//
  // public Filterjobs() {
  //   debugger
  //   let searchCopy = this.search.toLowerCase();
  //   this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  // }


  public getid(id: any) {
    this.id = id
  }

  public GetOfferLetter1(offer: any) {
    window.open(offer, "_blank")
  }


  //Method to Approve Candidate//
  public Accept(id: any, rinterview: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Accept this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        this.RecriutmentServiceService.RejectInterview(id, 1, rinterview).subscribe({
          next: data => {
            debugger
            Swal.fire(
              'Shortlisted!',
              'Candidate has been Accepted',
              'success'
            )
            this.GetCandidateReg();
            location.reload();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting Expenses List Web');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
        location.reload();
      }
    })
  }


  //Method to Reject Candidate //

  public Reject(id: any, interview: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want Reject this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecriutmentServiceService.RejectInterview(id, 2, interview).subscribe({
          next: data => {
            debugger
            Swal.fire(
              'Rejected!',
              'Candidate has been Rejected',
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
            this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  //Method to Accept Candidate by Interview//

  public Acceptcandidate() {
    this.RecriutmentServiceService.RejectInterview(this.id, 1, this.rinterview).subscribe({
      next: data => {
        debugger
        Swal.fire(
          'Selected!!',
          'Candidate has been Accepted',
          'success'
        )
        this.SendMailEmployee()
        this.GetCandidateReg()
        this.rinterview = ""
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in  Accepting Interview');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }
  //Method to Reject Candidate by Interview//
  public Rejecttcandidate() {
    this.RecriutmentServiceService.RejectInterview(this.id, 2, this.rinterview).subscribe({
      next: data => {
        debugger
        Swal.fire(
          'Rejected!',
          'Candidate has been Rejected',
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
        this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }

  //Method to Displaying OfferLetters// 

  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
  public callenderstartday: any;
  public callenderendday: any;
  public alldates: any = []
  public buildcallender(MaintainanceList: string | any[]) {
    debugger
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      this.dateformat1 = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: any; }) => x.dateformat == MaintainanceList[j].cdate);
      if (currenteventlist.length > 0) {
        // this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
        this.callenderdaysdount[currenteventlist[0].date - 1]['SlotTime'] = MaintainanceList[j].slotTime;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Candidate Name'] = MaintainanceList[j].candidateName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
          "<span class='event_PendingBookCommunity'> Candidate Name:" + MaintainanceList[j].candidateName +
          // "<br>  Room Name : " + MaintainanceList[j].workSpaceID +
          "<br>  Slot Time  : " + MaintainanceList[j].slotTime
        // "<br>  End Time : " + MaintainanceList[j].endTime +
        // // "<br>  Unit :" + MaintainanceList[j].unitID +
        "</span>";
        console.log("callenderdaysdount", this.callenderdaysdount)
      }
    }
  }


  //Method to Displaying Dates//
  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.joblist);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.joblist);
  }



  Cancel() {



  }

  //Method to search the Date Details//
  public filterByDate() {
    debugger;


    if (sessionStorage.getItem('userid') == undefined) {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid && x.cancleinterview == null && x.date >= this.Date && x.date && this.endDate);

          //this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);
          // this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.date >= this.Date && x.date && this.endDate);
          // filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
          debugger
          this.jobListCopy = this.joblist
          console.log("===", this.jobListCopy)
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }

    else if (this.roleid == 6) {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid && x.cancleinterview == null && x.date >= this.Date && x.date && this.endDate);

         // this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.cancleinterview == null && x.date >= this.Date && x.date && this.endDate);
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }
    else {
      this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
        next: data => {
          debugger
          //this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid && x.cancleinterview == null && x.date >= this.Date && x.date && this.endDate);
          this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0 && x.staffID == this.staffid && x.cancleinterview == null && x.date >= this.Date && x.date && this.endDate);
          this.count = this.joblist.length;
          this.buildcallender(this.joblist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire(' Issue in Getting Candidate Registration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }

  }

  //Method to  Save MyNotes of Interviewer//

  public mynotes() {
    this.RecriutmentServiceService.RejectInterview(this.id, 3, this.mynote).subscribe({
      next: data => {
        debugger
        Swal.fire(
          'Saved!!',
          'My Notes is Saved',
          'success'
        )
        this.SendMailEmployee();
        this.GetCandidateReg();
        this.ngOnInit();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Saving My Notes');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }


  public GetJobDescription() {
    this.RecriutmentServiceService.GetJobDescriptionMaster().subscribe(data => {
      debugger;
      this.staffdetails = data;



    })

  }



  public GetJobDescription1() {
    this.RecriutmentServiceService.GetCandidateRegistration().subscribe(data => {
      debugger;

      this.joblist = data.filter(x => x.jobTitle == this.Role1 && x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0)


    })

  }

  //Method to Sending a mail//

  public SendMailEmployee() {
    debugger
    var entity3 = {
      'emailto': 'sindhugowda.amazeinc@gmail.com',
      'emailsubject': 'Selected candidates',
      'emailbody': 'Dear HiringManager  these are the Selected candidates',
      'attachmenturl': [],
      'cclist': [],
      'bcclist': [],
    }
    this.RecriutmentServiceService.sendemailattachements(entity3).subscribe(res => {
      debugger;
      // Swal.fire('Letter Generated and Sent Successfully');
      Swal.fire('Email sent');
    })



  }



  getId(id: any) {
    this.jobid = id;
  }
  //Method to Update Reject Candidate  Comments//
  public update() {
    debugger
    var entity = {
      "ID": this.jobid,
      "Canclecomments": this.Canclecomments,
      "Cancleinterview": 1
    }
    this.RecriutmentServiceService.UpdateCandidateRegistration(entity).subscribe((data: any) => {
      debugger
      Swal.fire('Cancle Successfully')
      location.reload();
    })
  }

  ID: any;
  mynote: any;
  mynotelist: any;
  public getNoteID(even: any) {
    this.ID = even.id
    this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        // this.joblist = data.filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
        this.mynotelist = data.filter(x => x.scheduled == 1 && x.id == this.ID);
        this.mynote = this.mynotelist[0].interviewerMyNotes
        debugger


        this.GetCandidateReg()

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  changeStatus1(modif: any) {
    debugger;
    console.log("Date.........." + modif)
    /*   this.joblist = this.joblist.filter((x: { date: any; }) => x.date >= x.date <= this.endDate); */


    this.RecriutmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.cdate == modif);
        /*     this.showorhidecontent = true; */
        // filter(x => x.scheduled == 1 && x.interviewRejected == 0 && x.interviewSelected == 0);
        console.log("Date.........." + this.joblist)
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecriutmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
}
