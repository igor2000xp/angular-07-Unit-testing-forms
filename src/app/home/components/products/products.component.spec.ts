import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { CartStoreItemMock } from 'src/app/shared/mocks/cart.storeItem.mock';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { ProductStoreItemMock } from 'src/app/shared/mocks/product.storeItem.mock';
import { Product } from '../../types/products.type';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let cartStoreItem: CartStoreItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: ProductsStoreItem, useClass: ProductStoreItemMock },
        { provide: CartStoreItem, useClass: CartStoreItemMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    cartStoreItem = TestBed.inject(CartStoreItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', () => {
    it('should call addProduct function in the CartStoreItem', () => {
      const spyAddProduct: jasmine.Spy = spyOn(cartStoreItem, 'addProduct');
      const product: Product = {
        category_id: 1,
        id: 1,
        price: 10,
        product_description: 'description',
        product_img: 'Img',
        product_name: 'test product',
        ratings: 4,
      };
      component.addToCart(product);
      expect(spyAddProduct).toHaveBeenCalledWith(product);
    });
  });
});
