import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Socket, io} from "socket.io-client";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SwapService {
  _url = 'http://localhost:3000/swap/'
  private socket: Socket;
  private room = ''

  constructor(private http: HttpClient, private auth: AuthService) {
    this.socket = io("ws://localhost:3000")
    this.socket.on("test", () => console.log('test'))
  }

  config() {
    return {
      room: this.room,
      token: this.auth.token
    }
  }

  getCode() {
    return this.http.get<{code: string}>(this._url + 'code')
  }

  connectToUser(selfCode: string, friendCode: string) {
    this.room = [selfCode,friendCode].sort((a,b) => a.localeCompare(b)).join("")
    this.socket.emit('swapStart', this.config())
  }

  hello() {
    this.socket.emit('hello', this.config())
  }

  disconnect() {
    this.room = ''
    this.socket.disconnect()
  }
}
