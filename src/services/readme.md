#### services开发规范

本模块为应用提供main进程和renderer进程之间的通信能力。
模块基于ipcMain和ipcRenderer开发    
在main/modules中注册的js模块，其模块名将被注册为ipcMain的监听channel，即监听事件名称。监听到对应事件时，其参数将交予该模块处理。模块应默认暴露一个函数，作为事件的callback，函数应返回promise，处理完业务后，resolve将用`${事件}-reply`事件回传renderer进程，通知调用者。

renderer进程引入main/renderer后，可以使用如下方式调用main进程能力。
```javascript
import * as services from "to/path/services/renderer"

;(async () => {
  const result = await services.notice('relaunch', 'args');
})()
```
