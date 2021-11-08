const fs = require("fs");
/* const input = fs
  //.readFileSync("./8dayinput.txt")
  .readFileSync("./test.txt")
  .toString()
  .split("\n")
  .map((i) => {
    let command = i.substr(0, 3);
    let move = Number(i.substr(4));
    let obj = {};
    obj[command] = move;
    obj["count"] = 0;
    return obj;
  }); */
const data = fs
  .readFileSync("./8dayinput.txt")
  //.readFileSync("./8test.txt")
  .toString()
  .split("\n");

function makeDataset(data) {
  const result = data.map((i) => {
    let command = i.substr(0, 3);
    let move = Number(i.substr(4));
    let obj = {};
    obj[command] = move;
    obj["count"] = 0;
    return obj;
  });
  return result;
}

let input = makeDataset(data);

function scanInput(input) {
  let acc = 0;
  let lastVisitedIndex = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i].count == 0) {
      lastVisitedIndex = i;
      input[i].count = 1;
      if (input[i].nop) acc = acc;
      else if (input[i].acc) {
        acc = acc + input[i].acc;
      } else if (input[i].jmp) {
        i = i + input[i].jmp - 1;
      }
    } else {
      break;
    }
  }
  const obj = {
    accumulator: acc,
    iteration: lastVisitedIndex,
  };
  return obj;
}

function changeCommands() {
  //inizio la scansione del dataset originale: se un elemento soddisfa le condizioni lo cambio
  for (let k = 0; k < input.length; k++) {
    if (input[k].jmp) {
      input[k]["nop"] = input[k].jmp;
      delete input[k].jmp;
    } else if (input[k].nop) {
      input[k]["jmp"] = input[k].nop;
      delete input[k].nop;
    }
    //console.log(k, "after changing command", input);
    //dopo il cambio dell'elemento testo la funzione scan:
    let result = scanInput(input);
    //console.log("after scanning", input);
    //se il result.iteration è uguale alla lunghezza dell'input, allora vuole dire che sono giunta all'ultimo elemento dell'array ed esco col risultato
    if (result.iteration === input.length - 1) return result.accumulator;
    //altrimenti resetto l'input e passo all'indice successivo
    else {
      input = makeDataset(data);
    }
  }
}

//console.log(input);
//console.log(scanInput(input));

console.log(changeCommands());
