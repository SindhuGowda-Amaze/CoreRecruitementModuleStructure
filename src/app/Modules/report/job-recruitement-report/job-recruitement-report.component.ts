import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-job-recruitement-report',
  templateUrl: './job-recruitement-report.component.html',
  styleUrls: ['./job-recruitement-report.component.css']
})
export class JobRecruitementReportComponent implements OnInit {
  ID: any;
  show: any;

  constructor(private RecruitementService: RecruitementService) { }


  refresh(){
    location.reload();
  }

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
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.username = sessionStorage.getItem('UserName'); 
    this.loader=true;
    this.hiringManager="";
    this.RecruitementService.GetClientStaff().subscribe(data => {
      this.hrlist = data;
    })

    this.RecruitementService.GetJob_Requirements().subscribe(data => {

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

      
    })
  }
  description:any;  
  GetId(id: any) {
    this.ID = id
    debugger
    this.description = this.joblist.filter((x: { ID: any; }) => x.ID == this.ID);
    this.show=1;
  }

  empcomments: any;
  public GEtemployeecomments(job: any) {
    this.description = job.jobDescription
  }

  skills: any;
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


  joblist1:any;
  public GetJobRequirements(){
  
  
    this.RecruitementService.GetJob_Requirements().subscribe(data => {
      debugger
     
      this.joblist = data.filter(x => x.hiringManager == this.hiringManager);
     
      this.count = this.joblist.length;
   
  
    })

}


}
