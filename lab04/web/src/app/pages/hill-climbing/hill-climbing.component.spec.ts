import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HillClimbingComponent } from './hill-climbing.component';

describe('HillClimbingComponent', () => {
  let component: HillClimbingComponent;
  let fixture: ComponentFixture<HillClimbingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HillClimbingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HillClimbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
