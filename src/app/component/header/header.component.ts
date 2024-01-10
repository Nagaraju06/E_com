import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem:number  = 0;
  public searchTerm : string = '';
  isLoggedIn: boolean = false;
  profilePictureBase64: string | ArrayBuffer | null = null;
  userFirstName: string = '';
  isCartCardOpen: boolean = false;
  public products: any = [];
  public grandTotal!: number;
  constructor(private cartService: CartService, private authService: AuthenticationService){}

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = this.getUniqueProducts(res);
        this.grandTotal = this.cartService.getTotalPrice();
      });
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn === true){
      const userInfo = this.authService.getUserInfo();
      if(userInfo){
        this.userFirstName = userInfo.firstName;
        this.profilePictureBase64 = userInfo.profilePicture;
      }
    }
    
    this.cartService.getProducts()
    .subscribe(res =>{
      this.totalItem = res.length
    })
  }
  
  toggleCartCard() {
    this.isCartCardOpen = !this.isCartCardOpen;
  }
  
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userFirstName = '';
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  removeItem(item: any): void {
    this.cartService.removeCartItem(item);
    //this.saveCartData();
  }

  emptyCart(): void {
    this.cartService.removeAllCartItem();
    //this.saveCartData();
  }

  incrementQuantity(item: any): void {
    this.cartService.incrementQuantity(item);
    this.updateUniqueProducts();
    this.cartService.addToCart(item);
    //this.saveCartData();
  }

  decrementQuantity(item: any): void {
    this.cartService.decrementQuantity(item);
    this.updateUniqueProducts();
    this.cartService.removeCartItem(item);
    //this.saveCartData();
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
