import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-job-recruitement-report',
  templateUrl: './job-recruitement-report.component.html',
  styleUrls: ['./job-recruitement-report.component.css']
})
export class JobRecruitementReportComponent implements OnInit {
  ID: any;
  show: any;
  joblist: any;
  search: any;
  count: any;
  loader:any;
  hiringManager:any;
  hrlist:any;
  p: any = 1;
  count1: any = 5;
  roleid:any;
  username:any;
  description:any;
  empcomments: any;
  skills: any;
  joblist1:any;
  currentUrl: any;
  constructor(private RecruitementService: RecruitementService) { }


  refresh(){
    location.reload();
  }

 
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName'); 
    this.loader=true;
    this.hiringManager="";
 
   this. GetClientStaff()
    this.GetJob_Requirements()
   
  }
 
 
  GetClientStaff()
  {
    
    this.RecruitementService.GetClientStaff()
    .subscribe({
      next: data => {
        debugger
        this.hrlist = data;
      }, error: (err) => {
        Swal.fire('Issue in GetClientStaff');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    

}
GetJob_Requirements()
{
  this.RecruitementService.GetJob_Requirements()
  
  .subscribe({
    next: data => {
      debugger
      if(this.roleid==2){
        this.joblist = data.filter(x=>x.hiringManager==this.username);
        this.loader=false;
        this.count = this.joblist.length;
      }
      else
      {
        this.joblist = data;
        this.loader=false;
        this.count = this.joblist.length;
      }
    }, error: (err) => {
      Swal.fire('Issue in GetJob Requirements');
      // Insert error in Db Here//
      var obj = {
        'PageName': this.currentUrl,
        'ErrorMessage': err.error.message
      }
      this.RecruitementService.InsertExceptionLogs(obj).subscribe(
        data => {
          debugger
        },
      )
    }
  })

}

  GetId(id: any) {
    this.ID = id
    debugger
    this.description = this.joblist.filter((x: { ID: any; }) => x.ID == this.ID);
    this.show=1;
  }

;
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }

 
  public GEtskills(job: any) {
    this.skills = job.skills
  }



  fileName = 'JOB RECRCUITMENT REPORT.xlsx';
  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('downloadaplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Job Recruitment');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }


 
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetJob_Requirements()
    
    .subscribe({
      next: data => {
        debugger
     
        this.joblist = data.filter(x => x.hiringManager == this.hiringManager);
       
        this.count = this.joblist.length;
     
      }, error: (err) => {
        Swal.fire('Issue in GetJob Requirements');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.RecruitementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })

}


}
