import { Component } from '@angular/core';
import { NavComponent } from "./../nav/nav.component";

@Component({
    selector: 'app-catalogo',
    standalone: true,
    templateUrl: './catalogo.component.html',
    styleUrl: './catalogo.component.css',
    imports: [NavComponent]
})
export class CatalogoComponent {

}
