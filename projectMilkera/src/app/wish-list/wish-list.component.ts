import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  addToCart(product: any) {
    let cartData = localStorage.getItem('localCart');
    if (cartData === null) {
      let cartArray: any[] = [];
      cartArray.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartArray));
    } else {
      let cartArray: any[] = JSON.parse(cartData);
      const existingProduct = cartArray.find((p) => p.productId === product.productId);
      if (existingProduct) {
        existingProduct.qnt += product.qnt;
      } else {
        cartArray.push(product);
      }
      localStorage.setItem('localCart', JSON.stringify(cartArray));
    }
    
    // Display the alert message
    alert(`${product.product} added to cart`);
    this.cartCountFunc()
  }
  cartCount:number=0;
  cartCountFunc()
  {
    var cartValue=JSON.parse(localStorage.getItem('localCart') ?? 'null')
    
    this.cartCount=cartValue.length;
    this.cart.cartSubject.next(this.cartCount)
  }

  wishlistArr: any[] = [];

  constructor(private cart:CartService) {
    // Retrieve the savedForLater data from local storage
    const savedForLaterData = localStorage.getItem('saveForLater');
  
    // Check if there is savedForLaterData in local storage
    if (savedForLaterData) {
      // Parse the savedForLaterData as an array and assign it to wishlistArr
      this.wishlistArr = JSON.parse(savedForLaterData);
    }
  }
  
  removeSingle(wishlistId: number) {
    // Check if the wishlistArr has items
    if (this.wishlistArr) {
      for (let i = 0; i < this.wishlistArr.length; i++) {
        if (this.wishlistArr[i].productId === wishlistId) {
          this.wishlistArr.splice(i, 1);
          localStorage.setItem('saveForLater', JSON.stringify(this.wishlistArr));
        }
      }
    }
  }
}
