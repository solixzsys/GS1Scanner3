import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Toast} from '@ionic-native/toast';
import {ToastController} from 'ionic-angular';
import {DataservicesProvider} from '../../providers/dataservices/dataservices';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  constructor(public navCtrl: NavController,
   private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private dataservices: DataservicesProvider,
    private toastctrl:ToastController,
    private platform: Platform
  ) {

  
      this.dataservices.getProducts()
            .subscribe((response) => {
              console.log(response)
            })
    }


    presentToast() {
      let toast = this.toastctrl.create({
        message: 'Inside vScan',
        duration: 3000
      });
      toast.present();
    }

  scan() {
    // this.platform.ready().then(() => {
      // this.presentToast();
     
      this.selectedProduct = {};
      
      this.barcodeScanner.scan().then((barcodeData) => {
      this.toast.show(barcodeData.text, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
      );
        this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
        if(this.selectedProduct !== undefined) {
          this.productFound = true;
        } else {
          this.productFound = false;
          this.toast.show(`Product not found`, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      }, (err) => {
        this.toast.show(err, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      // });
  
    
  });
}
}



