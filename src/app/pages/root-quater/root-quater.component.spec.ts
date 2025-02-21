import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootQuaterComponent } from './root-quater.component';

describe('RootQuaterComponent', () => {
  let component: RootQuaterComponent;
  let fixture: ComponentFixture<RootQuaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootQuaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootQuaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
