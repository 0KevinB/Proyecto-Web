import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashdosComponent } from './dashdos.component';

describe('DashdosComponent', () => {
  let component: DashdosComponent;
  let fixture: ComponentFixture<DashdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashdosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
