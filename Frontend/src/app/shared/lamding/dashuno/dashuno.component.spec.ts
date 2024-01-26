import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashunoComponent } from './dashuno.component';

describe('DashunoComponent', () => {
  let component: DashunoComponent;
  let fixture: ComponentFixture<DashunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashunoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
