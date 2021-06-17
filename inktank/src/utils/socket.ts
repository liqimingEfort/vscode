/*
 * @Author: your name
 * @Date: 2021-03-25 13:18:07
 * @LastEditTime: 2021-03-25 15:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \inktank\src\utils\websocket.ts
 */
import { WS_ADDRESS } from './configs/socketConfig';

class UseSocket {
  private static socketContent: WebSocket;

  public static getInstance() {
    if (!this.socketContent) {
      this.socketContent = new WebSocket(WS_ADDRESS);
      this.openClock();
    }
    return this.socketContent;
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    UseSocket.socketContent.addEventListener('open', this.handleOpen, false);
    UseSocket.socketContent.addEventListener('close', this.handleClose, false);
    UseSocket.socketContent.addEventListener('error', this.handleError, false);
  }

  open() {
    function handleOpen(params) {
      console.log('handleOpen', params);
    }
    UseSocket.socketContent.addEventListener('open', handleOpen, false);
  }

  send(message) {
    UseSocket.socketContent.addEventListener('send', message, false);
  }

  private static openClock() {
    const $that = this;
    const clockData = JSON.stringify({
      // 连接成功将，用户ID传给服务端
      userId: '1231'
    });
    setInterval(() => {
      $that.socketContent.send(clockData);
    }, 1000);
  }

  message() {
    function handleMessage(params) {
      console.log('handleMessage', params);
    }
    UseSocket.socketContent.addEventListener('message', handleMessage, false);
  }

  handleOpen(e: any) {
    console.log('websocket open', e);
  }

  handleClose(e: any) {
    console.log('websocket close', e);
  }

  handleError(e: any) {
    console.log('websocket error', e);
  }
}

export default UseSocket;
