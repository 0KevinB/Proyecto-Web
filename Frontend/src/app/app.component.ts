import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/lamding/header/header.component";
import { DashboardComponent } from "./shared/lamding/dashboard/dashboard.component";
import { NavComponent } from "./shared/lamding/nav/nav.component";
import { HttpClientModule } from '@angular/common/http'
import { SectionComponent } from "./shared/lamding/section/section.component";
import { NewpasswordComponent } from './shared/forgot-password/newpassword/newpassword.component';
import { RegisterComponent } from "./shared/register/register.component";
import { routes } from './app-routing';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, 
    DashboardComponent, NavComponent, NewpasswordComponent, HttpClientModule, 
    RouterLink, SectionComponent, RegisterComponent,ReactiveFormsModule,MatMenuModule,
    MatButtonModule,
    ]
})

export class AppComponent {
  [x: string]: any;
  title = 'frontend';
  routes = routes;
  showAlert = false;
  constructor(private notificationService: NotificationService){
  }
  message = ''
  ngOnInit(): void {
    this.notificationService.alert$.subscribe((notification : any) => {
      this.message = notification.message;
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false;
      }, notification.time)
    })
  }
}
