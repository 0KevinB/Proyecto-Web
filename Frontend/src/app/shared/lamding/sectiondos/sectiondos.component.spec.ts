import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiondosComponent } from './sectiondos.component';

describe('SectiondosComponent', () => {
  let component: SectiondosComponent;
  let fixture: ComponentFixture<SectiondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectiondosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectiondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
