import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCarProductComponent } from './shopcar-product.component';

describe('ShopCarProductComponent', () => {
  let component: ShopCarProductComponent;
  let fixture: ComponentFixture<ShopCarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCarProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopCarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
