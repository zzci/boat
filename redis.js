const req = msg.payload

const payload = [];
for (const [key, value] of Object.entries(req)) {
  if (key !== 'timestamp') {  // 跳过timestamp键
    payload.push('level.' + key, req.timestamp, value);
  }
}

msg.payload = payload;
return msg;

// 取整函数示例
function getInteger(num) {
    // 向下取整
    const floor = Math.floor(num);
    // 向上取整
    const ceil = Math.ceil(num);
    // 四舍五入
    const round = Math.round(num);
    // 位运算取整
    const bitwise = ~~num;

    return {
        floor,
        ceil,
        round,
        bitwise
    };
}

// 使用示例
const result = getInteger(1004/10);  // 结果为 100.4
console.log(result);
// 输出: { floor: 100, ceil: 101, round: 100, bitwise: 100 }
