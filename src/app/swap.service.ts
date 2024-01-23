import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Socket, io} from "socket.io-client";
import {AuthService} from "./auth.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SwapService {
  _url = 'http://localhost:3000/swap/'
  private socket: Socket;
  private room = ''

  private _friendItems = new BehaviorSubject<string[]>([])
  public friendItems$ = this._friendItems.asObservable()

  public friendName = ''

  private _status = new BehaviorSubject('')
  public status$ = this._status.asObservable()

  constructor(private http: HttpClient, private auth: AuthService) {
    this.socket = io("ws://localhost:3000")
    this.socket.on("swapCanceled", () => this._status.next('canceled'))

  }

  config() {
    return {
      room: this.room,
      token: this.auth.token
    }
  }

  getCode() {

    this._status.next('ready')

    return this.http.get<{code: string}>(this._url + 'code')
  }

  connectToUser(selfCode: string, friendCode: string) {
    this.room = [selfCode,friendCode].sort((a,b) => a.localeCompare(b)).join("")
    this.socket.emit('swapStart', this.config())
    this._status.next('looking')
    this.socket.on('friendConnected', (name: string) => {
      this.friendName = name
      this._status.next('friendConnected')
      this.socket.on('offerUpdated', (offerItems: string[]) => {
        this._friendItems.next(offerItems)
      })
    })
  }

  updateOffer(offerItems: string[]) {
    this.socket.emit('updateOffer', offerItems)
  }

  hello() {
    this.socket.emit('hello', this.config())
  }

  disconnect() {
    this.room = ''
    this.socket.disconnect()
  }
}
