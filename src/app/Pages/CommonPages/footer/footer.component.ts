import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  company_name: any;
  login:any
  temp:any;
  ngOnInit() {
    this.login=localStorage.getItem('login')
    this.company_name = localStorage.getItem("company_name");
    this.temp=sessionStorage.getItem('temp')
  }

}