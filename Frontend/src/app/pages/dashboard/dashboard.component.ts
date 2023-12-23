import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
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
    imports: [CommonModule, NavComponent, HttpClientModule, LoginComponent,NewpasswordComponent, SectionComponent, FooterComponent, HeaderComponent]
})
export class DashboardComponent implements OnInit , OnDestroy {
  userLoginOn:boolean=false;
  userData?:User;
  constructor(private loginService:LoginService) { }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
      }
    })

  }

}
