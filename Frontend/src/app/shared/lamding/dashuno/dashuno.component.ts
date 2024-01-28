import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NewpasswordComponent } from '../../forgot-password/newpassword/newpassword.component';
import { LoginComponent } from '../../login/login.component';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../nav/nav.component';

import { SectionunoComponent } from '../sectionuno/sectionuno.component';

@Component({
  selector: 'app-dashuno',
  standalone: true,
  imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent, NewpasswordComponent, SectionunoComponent, FooterComponent, HeaderComponent],
  templateUrl: './dashuno.component.html',
  styleUrl: './dashuno.component.css'
})
export class DashunoComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor() { }


  ngOnInit(): void {

  }



}
