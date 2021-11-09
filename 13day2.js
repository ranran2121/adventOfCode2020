const fs = require("fs");

const input = fs
  .readFileSync("./13dayinput.txt")
  //.readFileSync("./test.txt")
  .toString()
  .split("\n");

const busArr = input[1]
  .split(",")
  // Remove `x` buses from input but keep the index stored with the buses with set IDs.
  .map((id, i) => {
    let obj = {};
    obj.id = id;
    obj.i = i;
    return obj;
  })
  .filter((obj) => obj.id != "x");
/* let filtered_arr = arr
    .map((id, i) => ({ id, i }))
    .filter((obj) => obj.id !== "x"); */

function findWhenBusesAlign(arr) {
  // Set the first valid timestamp as one period after time zero.
  let first_bus = arr.shift();
  let timestamp = Number(first_bus.id);
  // Also initialize the first period to this same ID value, that is, the first bus's period.
  let period = Number(first_bus.id);

  // Loop through the remaining buses
  for (let { id, i } of arr) {
    /**
     * While the current timestamp plus its offset does not evenly divide the current ID,
     * increment the timestamp by our period, because we _have_ to keep the alignment
     * of whatever we have locked in so far.
     */
    while ((timestamp + i) % id !== 0) {
      timestamp += period;
    }

    /**
     * As soon as we have an timestamp where things are aligned, set the period
     * equal to the least common multiple between the current period
     * and the current ID so that our previous work stays aligned with each iteration.
     *
     * @note Looking at our input, all the numbers are prime, so the LCM will
     *       always be `period * id`, but this makes it a bit more general.
     */
    //period = lcm(period, id);
    period = period * id;
  }
  return timestamp;
}
console.log(findWhenBusesAlign(busArr));
