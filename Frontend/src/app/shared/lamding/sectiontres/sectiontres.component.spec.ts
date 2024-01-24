import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiontresComponent } from './sectiontres.component';

describe('SectiontresComponent', () => {
  let component: SectiontresComponent;
  let fixture: ComponentFixture<SectiontresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectiontresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectiontresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
