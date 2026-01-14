// 创建HTTP请求配置
msg.url = 'http://httpbin.org/post';
msg.method = 'POST';
msg.headers = {
    'Content-Type': 'application/json'
};

// 设置要发送的数据
const requestData = {
    data: msg.payload,
    timestamp: new Date().toISOString()
};

// 使用Node-RED的全局对象发送请求
msg.payload = requestData;
return msg;