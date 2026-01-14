const data = [
  ['level.left_black_water', [], [1744849891064, '374']],
  ['level.left_fuel', [], [1744849891064, '908']],
  ['level.left_gray_water', [], [1744849891064, '399']],
  ['level.right_black_water', [], [1744849891064, '143']],
  ['level.right_fuel', [], [1744849891064, '1004']],
  ['level.right_gray_water', [], [1744849891064, '145']],
  ['level.water', [], [1744849891064, '828']],
];
const result = {};

data.forEach(item => {
  // 提取键名,去除'level.'前缀
  const key = item[0].replace('level.', '');
  // 获取值
  const value = Number(item[2][1]);
  // 添加到结果对象
  result[key] = value;
});

msg.payload = result;
return msg;
