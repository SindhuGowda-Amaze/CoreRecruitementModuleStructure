
//  Product : DigiCoreRecrcitment System 1.0 
// /Date : 28 Jan, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains serach the RecruiterStaff & Department & Job Candidate Details ,Displaying CandidateRegistration Details,Count the Job Recuriter, Flip the Card,Route the URL
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022


import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  //Variable Declerations//

  showback: any;
  showfront: any;
  myDate: any;
  joblist20: any;
  search: any;
  count: any;
  count1: any;
  count2: any;
  count3: any;
  count4: any;
  count5: any;
  count6: any;
  joblist1: any;
  joblist2: any;
  joblist3: any;
  joblist4: any;
  joblist5: any;
  joblist6: any;
  joblist7: any;
  joblist8: any;
  roleid: any;
  joblist9: any;
  joblist10: any;
  joblist11: any;
  joblist12: any;
  joblist13: any;
  joblist14: any;
  vendorid: any;
  joblist: any;
  hrlist: any;
  count9: any;
  hiringManager:any;
  department:any;
  currentUrl:any
  err: any;
  username: any;
  deptlist:any;
  Anniversery: any
  Birthday: any;
  NewJoinee: any;


  constructor(public router: Router, private datePipe: DatePipe, private RecruitmentServiceService: RecruitementService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      
    //Variable Initialisation and Default Method Calls//

    this.GetRecruiterStaff();
    this.GetDepartment();
    this.GetJob_Requirements1();
    this.GetJob_Requirements2();
    this.GetCandidateRegistration1();
    this.GetCandidateRegistration2();
    this.GetCandidateRegistration3();
    this.GetCandidateRegistration4();
    this.GetCandidateRegistration5();
    this.GetCandidateRegistration6();
    this.GetCandidateRegistration7();
    this.GetCandidateRegistration8();
    this.GetCandidateRegistration9();
    this.GetCandidateRegistration10();
    this.GetCandidateRegistration11();
    this.GetCandidateRegistration12();
    this.GetCandidateRegistration13();
    this.currentUrl = window.location.href;
    this.hiringManager = "";
    this.department="";
    this.myDate = new Date();
    this.showfront = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.NewJoinee = false;
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.roleid = sessionStorage.getItem('roleid');
    this.vendorid = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('UserName');

  }

   // Methods to serach the RecruiterStaff Details//

  GetRecruiterStaff(){

    this.RecruitmentServiceService.GetRecruiterStaff().subscribe({
      next: data => {
       debugger
       this.hrlist = data.filter(x=>x.role=="Hiring Manager");   
      }, error: (err: { error: { message: any; }; }) => {
       Swal.fire('Issue in Getting Recruiter Staff');
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

  
   // Methods to serach the Department Details//

  GetDepartment(){


    this.RecruitmentServiceService.GetDepartment().subscribe({
      next: data => {
       debugger
       this.deptlist = data;
   
      }, error: (err: { error: { message: any; }; }) => {
       Swal.fire(' issue in Getting Department');
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
   // Methods to serach the Job Candidate Details//

  GetJob_Requirements1(){
      this.RecruitmentServiceService.GetJob_Requirements().subscribe({
   next: data => {
    debugger
    if (this.roleid == 2) {
      this.joblist = data.filter(x => x.hiringManager == this.username);
      this.joblist1 = this.joblist.slice(0, 3);
    
    }
    else if(this.roleid==3){
      this.joblist = data.filter(x => x.vendor == this.username);
      this.joblist1 = this.joblist.slice(0, 3);
    }
    else {
      debugger
      this.joblist = data;
      this.joblist1 = this.joblist.slice(0, 3);
     
    }
   }, error: (err: { error: { message: any; }; }) => {
    Swal.fire(' Issue in Getting Job Requirements  ');
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


  // Methods to serach the Job Candidate Details//


  GetJob_Requirements2(){

    this.RecruitmentServiceService.GetJob_Requirements().subscribe({
      next: data => {
       debugger
       if (this.roleid == 2 ){
         this.joblist = data.filter(x => x.hiringManager == this.username);
         
         this.count = this.joblist.length;
       }
       else if(this.roleid==3){
         this.joblist = data.filter(x => x.vendor == this.username);
         this.count = this.joblist.length;
       }
       else if(this.roleid==6){
        this.joblist = data.filter(x => x.status == 'Manager Approved BU Approved');
        this.count = this.joblist.length;
      }
       else{
         this.joblist = data
         this.count = this.joblist.length;
       
       }
   
      
       // Insert error in Db Here//
       var obj = {
         'PageName': this.currentUrl,
         'ErrorMessage':this. err.error.message
       }
       Swal.fire(' Issue in Getting Job Requirements  ');
       this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
         data => {
           debugger
         },
        )
       }
      })





  }

  //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration1(){
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
      debugger
      if (this.roleid == 2){
        this.joblist3 = data.filter(x => x.accept == 0 && x.reject == 0 && x.hiringManager == this.username);
        this.joblist3 = this.joblist3.slice(0, 3);
        debugger
      }
      else if(this.roleid==3){
        this.joblist3 = data.filter(x => x.accept == 0 && x.reject == 0 && x.vendor == this.username);
        this.joblist3 = this.joblist3.slice(0, 3);
      }
      else{
        this.joblist3 = data.filter(x => x.accept == 0 && x.reject == 0);
        this.joblist3 = this.joblist3.slice(0, 3);
        debugger
      }
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
  
  //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration2(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
       debugger
       if (this.roleid == 2){
         this.joblist4 = data.filter(x => x.accept == 0 && x.reject == 0  && x.hiringManager == this.username);
         this.count1 = this.joblist4.length;
   
         debugger
       }
       else if(this.roleid==3){
         this.joblist4 = data.filter(x =>  x.accept == 0 && x.reject == 0 && x.source == this.vendorid);
         this.count1 = this.joblist4.length;
       }
       else{
         this.joblist4 = data.filter(x => x.accept == 0 && x.reject == 0);
         this.count1 = this.joblist4.length;
   
         debugger
         
       }
      
       // Insert error in Db Here//
       var obj = {
         'PageName': this.currentUrl,
         'ErrorMessage':this. err.error.message
       }
       Swal.fire(' Issue in Getting Candidate Registration');
       this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
         data => {
           debugger
         },
       )
       }
      })


  }
   //Method to Get the CandidateRegistration Details//
  GetCandidateRegistration3(){
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist5 = data.filter(x => x.accept == 1 && x.scheduled == 0  && x.hiringManager == this.username);
          this.joblist5 = data.slice(0, 3);
          debugger
        }
        else if(this.roleid==3){
          this.joblist5 = data.filter(x => x.accept == 1 && x.scheduled == 0  && x.source == this.vendorid);
          this.joblist5 = data.slice(0, 3);
        }
        else{
          this.joblist5 = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist5 = data.slice(0, 3);
          debugger
        }
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire(' Issue in Getting Candidate Registration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': this.err.error.message
        }
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })


  }

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration4(){
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist6 = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.username);
          this.joblist6 = this.joblist6.slice(0, 3);
          this.count2 = this.joblist6.length;
          debugger
        }
        else if(this.roleid==3){
          this.joblist6 = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.source == this.vendorid);
          this.joblist6 = this.joblist6.slice(0, 3);
          this.count2 = this.joblist6.length;
        }
        else{
          this.joblist6 = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.joblist6 = this.joblist6.slice(0, 3);
          this.count2 = this.joblist6.length;
          debugger
        }
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
   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration5(){
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist7 = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.hiringManager == this.username);
          this.joblist7 = this.joblist7.slice(0, 3);
          debugger
        }
        else if(this.roleid==3){
          this.joblist7 = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.source == this.vendorid);
          this.joblist7 = this.joblist7.slice(0, 3);
        }
        else{
          this.joblist7 = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.joblist7 = this.joblist7.slice(0, 3);
          debugger
        
        }
       
        
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': this.err.error.message
        }
        Swal.fire(' Issue in Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

  }

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration6(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist8 = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.hiringManager == this.username);
          this.count3 = this.joblist8.length;
    
        }
        else if(this.roleid==3){
          this.joblist8 = data.filter(x => x.interviewSelected == 1 && x.offered == 0  && x.source == this.vendorid);
          this.count3 = this.joblist8.length;
        }
        else{
          this.joblist8 = data.filter(x => x.interviewSelected == 1 && x.offered == 0);
          this.count3 = this.joblist8.length;
      
        }
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

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration7(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist9 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0  && x.hiringManager == this.username);
          this.joblist9 = this.joblist9.slice(0, 3);
        
        }
        else if(this.roleid==3){
          this.joblist9 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0  && x.source == this.vendorid);
          this.joblist9 = this.joblist9.slice(0, 3);
        }
        else{
          this.joblist9 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
          this.joblist9 = this.joblist9.slice(0, 3);
    
        }
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

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration8(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist10 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0  && x.hiringManager == this.username);
          this.count4 = this.joblist10.length;
        
        }
        else if(this.roleid==3){
          this.joblist10 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0  && x.source == this.vendorid);
          this.count4 = this.joblist10.length;
        }
        else{
          this.joblist10 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0);
          this.count4 = this.joblist10.length;
         
      
        }
    
    
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': this.err.error.message
        }
        Swal.fire(' Issue in Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })



  }

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration9(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist11 = data.filter(x => x.offerAcceptreject == 1  && x.hiringManager == this.username);
          this.joblist11 = this.joblist11.slice(0, 3);
          debugger
        }
        else if(this.roleid==3){
          this.joblist11 = data.filter(x => x.offerAcceptreject == 1  && x.source == this.vendorid);
          this.joblist11 = this.joblist11.slice(0, 3);
        }
        else{
          this.joblist11 = data.filter(x => x.offerAcceptreject == 1);
          this.joblist11 = this.joblist11.slice(0, 3);
          debugger
        };
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
 //Method to Get the CandidateRegistration Details//
  GetCandidateRegistration10(){
    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist12 = data.filter(x => x.offerAcceptreject == 1  && x.hiringManager == this.username);
          this.count5 = this.joblist12.length;
          debugger
        }
        else if(this.roleid==3){
          this.joblist12 = data.filter(x => x.offerAcceptreject == 1  && x.source == this.vendorid);
          this.count5 = this.joblist12.length;
        }
        else{
          this.joblist12 = data.filter(x => x.offerAcceptreject == 1);
          this.count5 = this.joblist12.length;
          debugger
        }
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
    
    
  }

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration11(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist20 = data.filter(x => x.accept == 1 && x.scheduled == 0  && x.hiringManager == this.username);
          this.count9 = this.joblist20.length;
        }
        else if(this.roleid==3){
          this.joblist20 = data.filter(x => x.accept == 1 && x.scheduled == 0  && x.source == this.vendorid);
          this.count9 = this.joblist20.length;
        }
        else{
          this.joblist20 = data.filter(x => x.accept == 1 && x.scheduled == 0);
          this.count9 = this.joblist20.length;
        }
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
    


  }

  GetCandidateRegistration12(){

    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist13 = data.filter(x => x.offerAcceptreject == 2  && x.hiringManager == this.username);
          this.joblist13 = this.joblist13.slice(0, 3);
          debugger
        }
        else if(this.roleid==3){
          this.joblist13 = data.filter(x => x.offerAcceptreject == 2  && x.source == this.vendorid);
          this.joblist13 = this.joblist13.slice(0, 3);
        }
        else{
          this.joblist13 = data.filter(x => x.offerAcceptreject == 2);
          this.joblist13 = this.joblist13.slice(0, 3);
          debugger
        }
      
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
    

  }

   //Method to Get the CandidateRegistration Details//

  GetCandidateRegistration13(){


    this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
      next: data => {
        debugger
        if (this.roleid == 2){
          this.joblist14 = data.filter(x => x.offerAcceptreject == 2  && x.hiringManager == this.username);
          this.count6 = this.joblist14.length;
          debugger
        }
        else if(this.roleid==3){
          this.joblist14 = data.filter(x => x.offerAcceptreject == 2  && x.source == this.vendorid);
          this.count6 = this.joblist14.length;
        }
        else{
          this.joblist14 = data.filter(x => x.offerAcceptreject == 2);
          this.count6 = this.joblist14.length;
          debugger
       
        }
    
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': this.err.error.message
        }
        Swal.fire(' issue in Getting Candidate Registration');
        this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }



  changedepartment(){

  }


 // Methods to Get Count Job_Requirements in table//

 public changestaff() {
  this.RecruitmentServiceService.GetJob_Requirements().subscribe({
  next: data => {
    debugger
   // this.joblist = data.filter(x => x.hiringManager == this.hiringManager)
   this.joblist = data.filter(x => x.hiringManager == this.hiringManager);
   debugger
   this.count = this.joblist.length;

  
    // Insert error in Db Here//
    var obj = {
      'PageName': this.currentUrl,
      'ErrorMessage': this.err.error.message
    }
    Swal.fire(' issue in Getting Job Requirements');
    this.RecruitmentServiceService.InsertExceptionLogs(obj).subscribe(
      data => {
        debugger
      },
    )
  }
})

 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
    this.joblist4 = data.filter(x => x.accept == 0 && x.reject == 0 && x.hiringManager == this.hiringManager);
    this.count1 = this.joblist4.length;
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
 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
   
    this.joblist20 = data.filter(x => x.accept == 1 && x.scheduled == 0 && x.hiringManager == this.hiringManager);

    this.count9 = this.joblist20.length;
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
 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
    this.joblist8 = data.filter(x => x.interviewSelected == 1 && x.offered == 0 && x.hiringManager == this.hiringManager);
    this.count3 = this.joblist8.length;
    debugger
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

 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
    this.joblist10 = data.filter(x => x.offered == 1 && x.offerAcceptreject == 0 && x.hiringManager == this.hiringManager);
      this.count4 = this.joblist10.length;
      debugger
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

 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
    this.joblist12 = data.filter(x => x.offerAcceptreject == 1 && x.hiringManager == this.hiringManager);
      this.count5 = this.joblist12.length;
      debugger
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

 //Method to Get the CandidateRegistration Details//

  this.RecruitmentServiceService.GetCandidateRegistration().subscribe({
  next: data => {
    debugger
    this.joblist14 = data.filter(x => x.offerAcceptreject == 2 && x.hiringManager == this.hiringManager);
      this.count6 = this.joblist14.length;
      debugger
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




//Method to get changebirthday//
  public changebirthday() {
    debugger;
    this.Anniversery = false;
    this.Birthday = true;
    this.NewJoinee = false;

  }
//Method to get changeAnniversary//
  public changeAnniversary() {
    debugger;
    this.Anniversery = true;
    this.Birthday = false;
    this.NewJoinee = false;

  }

//Method to get changenewjoinee//
  public changenewjoinee() {
    debugger;
    this.Anniversery = false;
    this.Birthday = false;
    this.NewJoinee = true;

  }


//Method to Flip the Card//

  public flip(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };


  public flip1(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    if (element.className === "card1") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };
//Method to Route the With Respect of URL//

  public leavedashbaord1() {
    debugger
    this.router.navigate(['#/MyTeamLeaveDetails']);
  }

  public leavedashbaord() {
    debugger
    this.router.navigate(['#/LeaveListDashboard']);
  }
  public Regularization() {
    debugger
    this.router.navigate(['#/AttendanceView']);
  }
  public goprofile() {
    debugger
    this.router.navigate(['#/EmployeeProfileView']);
  }

}
