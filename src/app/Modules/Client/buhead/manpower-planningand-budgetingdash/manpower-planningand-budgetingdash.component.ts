import { Component, OnInit } from '@angular/core';
import { RecruitementService } from 'src/app/Pages/Services/recruitement.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-manpower-planningand-budgetingdash',
  templateUrl: './manpower-planningand-budgetingdash.component.html',
  styleUrls: ['./manpower-planningand-budgetingdash.component.css']
})
export class ManpowerPlanningandBudgetingdashComponent implements OnInit {

  constructor(private DigipayrollServiceService1: RecruitementService, private router: Router) { }

  awardlist1: any
  awardlist: any;
  roleid: any;
  search : any
  ngOnInit(): void {

    this.roleid = sessionStorage.getItem('roleid');

    this.DigipayrollServiceService1.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });
    this.GetManpowerPlanningandBudgeting();
    this.Subsidiary = '';
    this.Department = '';
    this.year = 0;
  }

  Grandtotal: any
  public GetManpowerPlanningandBudgeting() {
    debugger
    this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
      data => {
        this.awardlist1 = data;
        let total: any = 0;
        this.awardlist1.forEach((element: { headCount: any; }) => {
          total += Number(element.headCount);
        });
        this.Grandtotal = total.toLocaleString();



      }
    )
  }

  public delete(id: any) {
    debugger

    Swal.fire({
      title: 'Are You Sure ',
      text: "Do you want to delete the Selected Record",
      //  icon: 'warning',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      debugger
      if (result.value == true) {
        this.DigipayrollServiceService1.DeleteManpowerPlanningandBudgeting(id).subscribe(data => {

          location.reload()
        })
        Swal.fire('Deleted Successfully...!')
        this.ngOnInit();
      }

    });
  }


  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;

  incomingfile(event: any) {
    debugger;
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    debugger;
    if (characters == ".xlsx" || characters == ".XLSX") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        debugger
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);



    } else {
      Swal.fire("Imported file format not supported.");
    }
  }



  public Upload_file() {
    debugger

    Swal.fire('Uploaded successfully');

  }
  Department: any;
  year: any;
  Departmentlist: any;
  term: any
  public filterByDepartment() {
    debugger
    if (this.Department == '') {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data;
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    } else {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data.filter(x => x.department == this.Department);
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    }
  }
  public filterByYear() {
    debugger

    if (this.year == 0) {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data.filter(x => x.companyName == this.Subsidiary);
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    } else {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data.filter(x => x.year == this.year && x.companyName == this.Subsidiary);
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    }
  }
  Subsidiary: any;
  public filterBySubsidiary() {
    debugger
    if (this.Subsidiary == '') {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data;
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    } else {
      this.DigipayrollServiceService1.GetManpowerPlanningandBudgeting().subscribe(
        data => {
          this.awardlist1 = data.filter(x => x.companyName == this.Subsidiary);
          let total: any = 0;
          this.awardlist1.forEach((element: { headCount: any; }) => {
            total += Number(element.headCount);
          });
          this.Grandtotal = total.toLocaleString();



        }
      )
    }

  }

  public edit(id: any) {
    debugger;
    this.router.navigate(['/BUHead/ManpowerPlanningandBudgeting/' + id]);
    
  }

  
  Delete(id:any){
    debugger
    this.DigipayrollServiceService1.DeleteManpowerPlanningandBudgeting(id).subscribe(data => {
      Swal.fire('Deleted Sucessfully..!')
      location.reload()
    })




  }




}