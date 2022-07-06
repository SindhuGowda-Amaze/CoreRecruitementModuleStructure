import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recruitement';

  company_name: any;
  temp:any
  ngOnInit() {
    this.temp=sessionStorage.getItem('temp')
    this.company_name = localStorage.getItem("company_name");
  }


  public onActivate(event:any) {

    window.scroll(0, 0);

  }
}