import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = this.getUniqueProducts(res);
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }


  removeItem(item: any): void {
    this.cartService.removeCartItem(item);
  }

  emptyCart(): void {
    this.cartService.removeAllCartItem();
  }

  incrementQuantity(item: any): void {
    this.cartService.incrementQuantity(item);
    this.updateUniqueProducts();
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: any): void {
    this.cartService.decrementQuantity(item);
    this.updateUniqueProducts();
    this.cartService.removeCartItem(item);
  }

  private getUniqueProducts(products: any[]): any[] {
    const uniqueProducts: any[] = [];
    const productMap = new Map<number, any>();

    products.forEach((item: any) => {
      if (productMap.has(item.id)) {
        productMap.get(item.id).quantity += 1;
        productMap.get(item.id).total = productMap.get(item.id).quantity * item.price;
      } else {
        productMap.set(item.id, { ...item, quantity: 1 });
      }
    });

    productMap.forEach((value: any) => {
      uniqueProducts.push(value);
    });

    return uniqueProducts;
  }

  private updateUniqueProducts(): void {
    this.products = this.getUniqueProducts(this.cartService.cartItemList);
    this.grandTotal = this.cartService.getTotalPrice();
  }
}
