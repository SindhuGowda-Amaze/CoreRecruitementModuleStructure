//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains Displaying Company Staff Details,Displaying Job Staff Details,offer letter,Search Job Tittle,Displaying the Date changes,Displaying the option changes,Accept Candidate Details,dropped Candidate Details,Get Count joblist,Get Count staffdetails.
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022



import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { DatePipe } from '@angular/common';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
@Component({
  selector: 'app-offered-candidates',
  templateUrl: './offered-candidates.component.html',
  styleUrls: ['./offered-candidates.component.css']
})
export class OfferedCandidatesComponent implements OnInit {
  
  //Variable Declerations//

  title: any;
  p: any = 1;
  count1: any = 5;
  OfferComments: any;
  joblist: any;
  count: any;
  term: any;
  search: any;
  roleid: any;
  loader: any;
  jobListCopy: any;
  Date: any;
  hrlist: any;
  username: any;
  endDate: any
  staffdetails: any
  vendor: any;
  Role1: any;
  hiringManager: any;
  jobdescriptionID: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderdaysdount: any = [];
  public callenderMonth: any;
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  currentUrl: any;
  public callenderstartday: any;
  public callenderendday: any;

  public alldates: any = []

  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  constructor(private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit(): void {

    //Variable Initialisation and Default Method Calls//

    this.jobTitle();
    this.GetRecruiterStaff();
    this.currentUrl = window.location.href;
    this.hiringManager = "";
    this.GetCandidateReg()
    this.GetJobDescription();
    this.Role1 = ""
    this.roleid = sessionStorage.getItem('roleid');
    this.loader = true;
    this.username = sessionStorage.getItem('UserName');
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

    //this.roleid = localStorage.getItem('roledid');

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

  
   //Method to Get Company Staff Details//

 public GetRecruiterStaff(){
  this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
    next: data => {
      debugger
      this.hrlist = data.filter(x => x.role == "Hiring Manager");

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


   //Method to Get JobDescription//

  GetJobDescriptionMaster() {
    throw new Error('Method not implemented.');
  }
  showorhidecontent: any;

  changeStatus(evn: any) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }
  }
   //Method to Get JobDescription//

  public GetCandidateReg() {
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
          this.buildcallender(this.joblist);
        }
        else {
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
          this.jobListCopy = this.joblist
          this.buildcallender(this.joblist);
        }

        this.loader = false;
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
//Method to Search jobdescription//

  public filterbyJD(even: any) {
    this.jobdescriptionID = even.target.value

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2) {
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0 && x.jobTitle == this.jobdescriptionID);
          this.buildcallender(this.joblist);
        }
        else {
          this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0 && x.jobTitle == this.jobdescriptionID);
          this.jobListCopy = this.joblist
          this.buildcallender(this.joblist);
        }

        this.loader = false;
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
  public GetOfferLetter(offer: any) {
    window.open(offer, "_blank")
  }
//Method to  displaying Job Tittle//
  public Filterjobs() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.joblist = this.jobListCopy.filter((x: { jobRefernceID: string, jobTitle: string; }) => x.jobRefernceID.toString().includes(searchCopy) || x.jobTitle.toLowerCase().includes(searchCopy));
  }

  //Method to  displaying date//

  public changeAnniversary() {
    debugger;

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        // this.joblist = data.filter(x => x.tentativeDate == this.Date + "T00:00:00");
        this.joblist = data.filter((x: { date: any; }) => x.date >= this.Date && x.date <= this.endDate);


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
    });
  }

  
  //Method to Displaying Accept the Candidate Details//

  public Accept(id: any, comments: any) {
    Swal.fire({
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
            Swal.fire(
              'Joined!',
              'Candidate has Joined',
              'success'
            )
            this.GetCandidateReg()
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in  Accepting RejectOffer');
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  //Method to Displaying Reject the Candidate Details//

  public Reject(id: any, comments: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Candidate has dropped!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, dropped!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RecruitmentServiceService.AcceptRejectOffer(id, 2, comments)
          .subscribe(data => {
            Swal.fire(
              'Rejected!',
              'Candidate has dropped',
              'success'
            )
            this.GetCandidateReg()
          })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
 
   //Method to Get Count joblist //

  public GetJobRequirements() {

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        this.joblist = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0 && x.hiringManager == this.hiringManager);

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

  //Method To Get count callenderdaysdount & MaintainanceList//

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
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: any; }) => x.dateformat == MaintainanceList[j].tentativeDate);
      if (currenteventlist.length > 0) {
        // this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Phone No'] = MaintainanceList[j].phoneNo;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Candidate Name'] = MaintainanceList[j].candidateName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
          "<span class='event_PendingBookCommunity'> Candidate Name:" + MaintainanceList[j].candidateName +
          // "<br>  Room Name : " + MaintainanceList[j].workSpaceID +
          "<br>  Phone No  : " + MaintainanceList[j].phoneNo
        // "<br>  End Time : " + MaintainanceList[j].endTime +
        // // "<br>  Unit :" + MaintainanceList[j].unitID +
        "</span>";
      }

    }
  }

  //Method to  Displaying previousmonth//
  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.joblist);
  }

    //Method to  Displaying nextmonth//
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.joblist);
  }

   //Method to  Search the  jobTitle//

  public jobTitle() {
    debugger;

    this.RecruitmentServiceService.GetClientStaff().subscribe(data => {
      this.joblist = data.filter(x => (x.accept == 1 && x.scheduled == 0) && (x.jobTitle == this.title));
    });
  }

   //Method to  Search the  jobTitle//

  public Role() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe(data => {
      this.staffdetails = data
    })
  }
  // public GetJobDescriptionMaster() {
  //   this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
  //     next: data => {
  //       debugger
  //       this.staffdetails = data;
  //       this.loader=false;
  //       this.count=this.staffdetails.length;
  //     }, error: (err: { error: { message: any; }; }) => {
  //       Swal.fire('Getting Get Job Description Master ');
  //       // Insert error in Db Here//
  //       var obj = {
  //         'PageName': this.currentUrl,
  //         'ErrorMessage': err.error.message
  //       }
  //       this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
  //         data => {
  //           debugger
  //         },
  //       )
  //     }
  //   })

  // }

  //Method to Get JobDescriptionMaster Details//

  public GetJobDescription() {
    this.RecruitmentServiceService.GetJobDescriptionMaster().subscribe({
      next: data => {
        debugger
        this.staffdetails = data;
        this.loader = false;
        this.count = this.staffdetails.length;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Get Job Description Master ');
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
