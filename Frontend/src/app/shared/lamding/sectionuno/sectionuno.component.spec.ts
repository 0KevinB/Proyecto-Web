import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionunoComponent } from './sectionuno.component';

describe('SectionunoComponent', () => {
  let component: SectionunoComponent;
  let fixture: ComponentFixture<SectionunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionunoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
