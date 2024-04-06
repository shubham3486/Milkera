import { Component,ElementRef } from '@angular/core';
import {CartService} from '../Services/cart.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ngOnInit()
  {
    
      this.cartValue = this.cartCount(); // Assign the result to cartValue
    
  }
  cartValue:number =0;
  cartCount() {
    // Use the nullish coalescing operator to provide a default value of 'null'
    const cartData = JSON.parse(localStorage.getItem('localCart') ?? 'null');
  
    if (cartData !== 'null') {
      var count = cartData.length; // Assuming 'localCart' contains an array
      return count;
    } else {
      return 0; // Return 0 if 'localCart' is null or empty
    }
  }
  constructor(private el: ElementRef,private cart:CartService) {
    this.cart.cartSubject.subscribe((data)=>{
      this.cartValue=data;
    })
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
 

}
