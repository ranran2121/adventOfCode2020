//const input = [10, 16, 6, 0, 1, 17];
//const input = [0, 3, 6];
const input = [3, 1, 2];

function elvesPlay(arr, number) {
  arr.push(0);

  while (arr.length <= number) {
    let observed = arr[arr.length - 1];
    if (arr.lastIndexOf(observed, arr.length - 2) == -1) {
      arr.push(0);
    } else {
      let newNum = arr.length - 1 - arr.lastIndexOf(observed, arr.length - 2);
      arr.push(newNum);
    }
  }
  return arr[number - 1];
}

console.log("game", elvesPlay(input, 30000000));
