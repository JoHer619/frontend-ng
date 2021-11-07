import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { CartItemModel } from 'src/app/models/cart-item-models';
import { Ordencompras } from 'src/app/models/ordencompras.model';
import { OrdencomprasService } from 'src/app/services/ordencompras.service';
import { Ordenproductos } from 'src/app/models/ordenproductos.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;

  public payPalConfig ? : IPayPalConfig;

  submitted = false;

  ordencompra: Ordencompras ={
      fecha:'',
      direId: 0
  };



  ordenproducto: Ordenproductos = {
     cantidad:0,
     subtotal:0,
     productoId: '',
     ordenId: ''

  };


  constructor(private cartService : CartService, private ordencompraServi: OrdencomprasService) { }

  ngOnInit(): void {
    this.initConfig();

    this.cartService.getProducts()
    .subscribe(res => {
        
    
        
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    
    })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: environment.clientId,
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.cartService.getTotalPrice().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.cartService.getTotalPrice().toString()
                        }
                    }
                },
                items: this.getItemsList()
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            

        },
        onError: err => {
            console.log('OnError', err);
           
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        },
    };

}
getItemsList(): any[]{
  const items: any[] =[];
  let item = {};
  this.products.forEach((it: CartItemModel) => {
     

  });
    
   return items;
}




saveOrdenCompra(): void {
    const data = {
        fecha: this.ordencompra.fecha,
        direId: this.ordencompra.direId

    };

    this.ordencompraServi.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert('Registrado');
        },
        error => {
          console.log(error);
        });
  }

  saveOrdenProducto(): void {
    const data = {
        fecha: this.ordencompra.fecha,
        direId: this.ordencompra.direId

    };

    this.ordencompraServi.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert('Registrado');
        },
        error => {
          console.log(error);
        });
  }

}
