# 通讯

## 协议

### 服务端格式
```
7E 7E 00 FF 11 0D 10 09 82 3F 33 40 48 00 02 00 EC 00 92
```

* 前9位固定: `7E 7E 00 FF 11 0D 10 09 82` 
* 10位模式: `CE - auto, BD - high, 7E - middle, 3F - low, 00 - none` 
* 11位模式: `33` 服务端编号，好像并无意义 
* 12位当前温度: `40 未发现计算方式 40为76度，01为32度` 
* 13位固定: `和客户端13位保持一致, 可能为故障代码` 
* 14-18位固定: `00 02 00 EC 00` 
* 19位XOR: `用1 - 18位计算XOR` 

### 客户端格式:
```
7E 7E FF 00 11 0D 00 00 82 FF 3F 10 47 3F 08 00 00 00 C1
```
* 前9位固定: `7E 7E FF 00 11 0D 00 00 82`
* 10位开关: `00 - close, FF - open`
* 11位模式: `CE - hot, 3F - cool`
* 12位温度: `10 - 19 , 1A, 1B, 1C, 1D, 1E. temperature from 16 - 30,`
* 13位固定: `40 和服务端13位保持一致`
* 14位风速: `CE - auto, BD - high, 7E - middle, 3F - low`
* 15-18位固定: `08 00 00 00`
* 19位XOR: `用1 - 18位计算XOR`

## xor计算
```
xor('7E7E00FF110D1009823F334798000200EC00')

function xor(data) {
  const hexdata = Buffer.from(data, 'hex')
  let checksum = 0;

  for (let i = 0; i < hexdata.length; i++) {
    checksum ^= hexdata[i] || 0;
  }

  return checksum.toString(16).toUpperCase();
}
```

## 通信

客户端服务端通信，服务端会定期向客户端发送请求，如果客户端收到回复标准协议格式，则通讯建立，后续只需要返回客户端当前状态即可，如风速，温度，模式，开关等信息。

如果需要调整温度，通过改变数据包发送给服务端，同时根据服务端返回相关信息计算显示当前温度在仪表盘。

## demo
```
import { SerialPort } from 'serialport';

function xor(data) {
  const hexdata = Buffer.from(data, 'hex')
  let checksum = 0;

  for (let i = 0; i < hexdata.length; i++) {
    checksum ^= hexdata[i] || 0;
  }

  return checksum.toString(16).toUpperCase();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// speed: low mode: cool temperature: 16 power: open
const status = '7E7EFF00110D000082FF3F10403F08000000C6'

console.log(xor('7E7EFF00110D000082FF3F10403F08000000'));

const port = new SerialPort({
  path: '/dev/tty.usbserial-21410',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
});

async function runner(data) {
  console.log(Date.now() + ' S ' + Buffer.from(data).toString('hex').toUpperCase().match(/.{2}/g).join(' '))
  await sleep(1000)
  port.write(status, 'hex', () => {
    console.log(Date.now() + ' C ' + status.match(/.{2}/g).join(' '))
  })
}

port.on('data', runner);

```

