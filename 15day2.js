const input = [10, 16, 6, 0, 1, 17];
//const input = [0, 3, 6];
//const input = [3, 1, 2];

function elvesPlay(arr, nth) {
  /*
   * The number said will never be larger than the turn we are on.
   * So, initialize an array of that size. This is faster than
   * pushing new items onto an array, which constantly has to be
   * resized.
   */
  const said = Array(nth);
  // Initialize the input, *except* for the last num
  for (let i = 0; i < arr.length - 1; i++) {
    said[arr[i]] = i + 1;
  }
  //console.log(said);
  let current = arr[arr.length - 1];
  for (let turn = arr.length; turn < nth; turn++) {
    if (!said[current]) {
      said[current] = turn;
      current = 0;
    } else {
      let prev = said[current];
      said[current] = turn;
      current = turn - prev;
    }
  }
  return current;
}

console.log("game", elvesPlay(input, 30000000));
