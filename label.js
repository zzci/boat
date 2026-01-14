data = [
  'level.left_fuel',
  'level.left_black_water',
  'level.water',
  'level.right_fuel',
  'level.right_black_water',
  'level.left_gray_water',
  'level.right_gray_water',
];

label = [
  '左油箱',
  '左黑水',
  '水',
  '右油箱',
  '右黑水',
  '左灰水',
  '右灰水',
];

function getLabelByData(dataKey) {
  const index = data.indexOf(dataKey);
  if (index === -1) {
    return null;
  }
  return label[index];
}

return msg;
