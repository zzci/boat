let parts = msg.payload.split(',');
let numbers = parts.map(Number);

// left fuel 01
// left black water 02
// water 03
// right fuel 04
// right black water 05
function calc_level(number) {
  if (number === 0) {
    return 0;  // 当输入为0时返回0
  }
  return Math.round((450 * 1000) / number)
}

msg.payload = {
  timestamp: Date.now(),
  left_fuel: calc_level(numbers[0]),
  left_black_water: calc_level(numbers[1]),
  water: calc_level(numbers[2]),
  right_fuel: calc_level(numbers[3]),
  right_black_water: calc_level(numbers[4])
}
return msg;