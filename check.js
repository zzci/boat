// 输入示例: "1000,500,1000,800,1000,1000,900"
// 如果值不是1000,则需要将对应的AOxx设置为该值
// AO11,AO12,AO13,AO14,AO21,AO22,AO23
let parts = msg.payload.split(',');
let numbers = parts.map(Number);

let result = [];
const aoPoints = ['AO11', 'AO12', 'AO13', 'AO14', 'AO21', 'AO22', 'AO23'];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== 1000) {
        result.push(`${aoPoints[i]}=${numbers[i]}`);
    }
}

msg.payload = result.join(',');
return msg;



