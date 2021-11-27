import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Product} from '../../model/product';
import {ProductService} from '../product/product.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  listProduct: Product[] = [];
  stompClient: any;

  constructor(private productService: ProductService) {
    this.getAllProduct();
  }

  get products() {
    return this.listProduct;
  }

  connect() {
    const ws = new SockJS(`${API_URL}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/product', data => {
        const product = JSON.parse(data.body);
        this.listProduct.push(product);
      });
    });
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  createProductUsingWebsocket(product: Product) {
    this.stompClient.send('/app/products', {}, JSON.stringify(product));
  }
}
