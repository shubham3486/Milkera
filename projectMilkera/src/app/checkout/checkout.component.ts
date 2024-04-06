import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  cartProducts!: any[]; // Assuming you have a structure to hold cart products
  amount: number = 0; // Declare the 'amount' variable

  ngOnInit() {
    // Retrieve cart items from localStorage or a service
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartProducts = JSON.parse(cartData);
    }
    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }
        // ,
        // createOrder: (data: any, actions: any) => {
        //   actions.order.create({
        //     purchase_units: [
        //       {
        //         amount: {
        //           value: this.amount.toString(),
        //           currency_code: 'USD'
        //         }
        //       }
        //     ]
        //   });
        // },
        // onApprove(data: any, actions: any) {
        //   return actions.order.capture().then((details: any) => {
        //     console.log(details);
        //   }); // Corrected the 'then' function
        // }
        // ,
        // onError: (error: any, actions: any)=>{
        //   console.log(error);
        // }
      })
      .render(this.paymentRef.nativeElement);
  }

  calculateTotalBill(): number {
    let total = 0;
    if (this.cartProducts) {
      this.cartProducts.forEach((product) => {
        total += product.qnt * product.price;
      });
    }
    this.amount = total; // Update the 'amount' variable
    return total;
  }
  // buttonColor="black";
  // buttonType="buy";
  // isCustomSize=250;
  // buttonHeight=50;
  // isTop=window===window.top;
  // paymentRequest={
  //   apiVersion:2,apiVersionMinor:0,allowedPaymentMethods:[
  //     {type:"CARD",parameters:{allowedPaymentMethods:["PAN_ONLY","CRYPTOGRAM_3DS"],allowedCardNetworks:["AMEX","VISA","MASTERCARD"]},tokenizationSpecification:{
  //       type:"PAYMENT_GATEWAY",parameters:{
  //         gateway:"example",
  //         gatewayMerchantId:"exampleMerchantId",
  //       }
  //     }}
  //   ],
  //   merchantInfo:{
  //     merchantId:"9876598765",
  //     merchantName:"Test Merchant",

  //   },
  //   transactionInfo:{
  //     totalPriceStatus:"FINAL",
  //     totalPriceLabel:"total",
  //     totalPrice:"100.00",
  //     currencyCode:"INR",
  //     countryCode:"IND"
  //   }
  // };
  onLoadPaymentData(event:any){
    console.log("Payment Details",event.detail)
    

   }
  
}

