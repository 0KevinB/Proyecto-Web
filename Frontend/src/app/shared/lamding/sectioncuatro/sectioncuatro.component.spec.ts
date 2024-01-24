import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectioncuatroComponent } from './sectioncuatro.component';

describe('SectioncuatroComponent', () => {
  let component: SectioncuatroComponent;
  let fixture: ComponentFixture<SectioncuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectioncuatroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectioncuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
