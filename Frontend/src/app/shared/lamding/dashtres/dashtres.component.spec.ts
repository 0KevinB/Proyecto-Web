import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtresComponent } from './dashtres.component';

describe('DashtresComponent', () => {
  let component: DashtresComponent;
  let fixture: ComponentFixture<DashtresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashtresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashtresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
