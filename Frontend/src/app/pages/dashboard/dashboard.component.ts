import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { NavComponent } from "../../shared/nav/nav.component";
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from "../../shared/login/login.component";
import { SectionComponent } from "../../shared/section/section.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { NewpasswordComponent } from 'src/app/shared/newpassword/newpassword.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent, NewpasswordComponent, SectionComponent, FooterComponent, HeaderComponent]
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() { }


  ngOnInit(): void {

  }



}


