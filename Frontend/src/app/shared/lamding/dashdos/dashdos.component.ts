import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NewpasswordComponent } from '../../forgot-password/newpassword/newpassword.component';
import { LoginComponent } from '../../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { SectiondosComponent } from '../sectiondos/sectiondos.component';

@Component({
  selector: 'app-dashdos',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent, NewpasswordComponent, SectiondosComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashdos.component.html',
  styleUrl: './dashdos.component.css'
})
export class DashdosComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() { }


  ngOnInit(): void {

  }



}
