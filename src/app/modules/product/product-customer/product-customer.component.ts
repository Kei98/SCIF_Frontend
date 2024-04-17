import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { flattenJson } from '../../shared/data-table/data-table.component';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
// import { InputSpinner } from 'bootstrap-input-spinner/src'


@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.scss'],
})
export class ProductCustomerComponent implements OnInit {
  productsArray: any[] = [];
  loggedObj: any = {};
  cart_icon = faCartPlus;
  popupHidden = true;
  image: any;
  name: any;
  description: any;
  qty: any;
  price:any;
  spec: any;
  purchasedQty: string;
  qtyInput: any;

  constructor(private prodServ: ProductService) {
    this.purchasedQty = '1';
  }
  ngOnInit(): void {
    this.loadProducts();
    this.qtyInput = document.getElementById('qty-input');
    // qtyInput?.addEventListener()
  }
  loadProducts() {
    this.prodServ.getProductData().subscribe({
      next: (res) => {
        this.productsArray = flattenJson(res);
      },
      error: (err) => {
        throw err;
      },
    });
  }

  addtocart(producId: number) {
    if (this.loggedObj.custId == undefined) {
      // this.prodServ.showLogin.next(true);
    } else {
      const obj = {
        CartId: 0,
        CustId: this.loggedObj.custId,
        ProductId: producId,
        Quantity: 1,
        AddedDate: new Date(),
      };
      // this.prodServ.addtoCart(obj).subscribe((res: any)=> {
      //     if(res.result) {
      //       alert("Product Added to Cart");
      //       this.prodServ.cartUpdated.next(true);
      //     } else {
      //       alert(res.message)
      //     }
      //   })
      // }
      // debugger;
    }
  }

  showdetails(product: any) {
    this.popupHidden = false;
    this.image = product.Image;
    this.name = product.Name;
    this.description = product.Description;
    this.qty = product.Quantity;
    this.price = product.Price;
    this.spec = product.Spec;
    this.resetInputVal();
  }

  closePopup() {
    this.popupHidden = true;
    this.image = null;
    this.name = null;
    this.description = null;
    this.qty = null;
    this.price = null;
    this.spec = null;
    this.resetInputVal();
  }

  resetInputVal() {
    this.purchasedQty = '1';
    (this.qtyInput as HTMLInputElement).value = this.purchasedQty;
  }
}
