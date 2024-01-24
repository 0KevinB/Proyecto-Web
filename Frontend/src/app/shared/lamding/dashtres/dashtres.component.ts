import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NewpasswordComponent } from '../../forgot-password/newpassword/newpassword.component';
import { LoginComponent } from '../../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';
import { SectiontresComponent } from '../sectiontres/sectiontres.component';

@Component({
  selector: 'app-dashtres',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent, NewpasswordComponent, SectiontresComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashtres.component.html',
  styleUrl: './dashtres.component.css'
})
export class DashtresComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() { }


  ngOnInit(): void {

  }



}
