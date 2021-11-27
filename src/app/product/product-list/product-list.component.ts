import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product/product.service';
import {SocketService} from '../../service/socket/socket.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  })
  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.connect();
  }

  createProduct(){
    this.socketService.createProductUsingWebsocket(this.productForm.value);
  }
}
