/*
 * @Author: lqm
 * @Date: 2021-03-30 11:23:34
 * @LastEditTime: 2021-04-06 10:57:40
 * @LastEditors: Please set LastEditors
 * @Description: 主进程通信
 * @FilePath: \inktank\src\utils\ipc.ts
 */
const ipcRenderer = () => window.vscode.ipcRenderer;
const ipcMessagePort = () => window.vscode.ipcMessagePort;
const webFrame = () => window.vscode.webFrame;
const process = () => window.vscode.process;

export { ipcRenderer, ipcMessagePort, webFrame, process };
