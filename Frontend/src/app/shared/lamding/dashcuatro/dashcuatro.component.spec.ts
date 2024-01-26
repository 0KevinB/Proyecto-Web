import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashcuatroComponent } from './dashcuatro.component';

describe('DashcuatroComponent', () => {
  let component: DashcuatroComponent;
  let fixture: ComponentFixture<DashcuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashcuatroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashcuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
