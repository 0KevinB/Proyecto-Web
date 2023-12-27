import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilarBicicletaComponent } from './alquilar-bicicleta.component';

describe('AlquilarBicicletaComponent', () => {
  let component: AlquilarBicicletaComponent;
  let fixture: ComponentFixture<AlquilarBicicletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilarBicicletaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquilarBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
