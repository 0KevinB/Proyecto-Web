import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NewpasswordComponent } from '../../forgot-password/newpassword/newpassword.component';
import { LoginComponent } from '../../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { SectioncuatroComponent } from '../sectioncuatro/sectioncuatro.component';

@Component({
  selector: 'app-dashcuatro',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent, NewpasswordComponent, SectioncuatroComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashcuatro.component.html',
  styleUrl: './dashcuatro.component.css'
})
export class DashcuatroComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() { }


  ngOnInit(): void {

  }



}
