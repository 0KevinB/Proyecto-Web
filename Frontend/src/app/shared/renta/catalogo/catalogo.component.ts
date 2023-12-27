import { Component } from '@angular/core';
import { NavComponent } from "./../nav/nav.component";
import { DashboardComponent } from "./../dashboard/dashboard.component";
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-catalogo',
    standalone: true,
    templateUrl: './catalogo.component.html',
    styleUrl: './catalogo.component.css',
    imports: [NavComponent, DashboardComponent,FooterComponent]
})
export class CatalogoComponent {

}
