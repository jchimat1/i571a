const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let parseInputString = "";
rl.question("Enter input string : ", function (string) {
  parseInputString = string;
  var i = 1;
  function stringParse(parseInputString) {
    let outputArray = [];
    if (/^[0-9]+$/.test(parseInputString)) {
      outputArray.push(parseInputString);
    } else {
      if (
        parseInputString[parseInputString.length - 2] == "," &&
        parseInputString[parseInputString.length - 3] == ","
      ) {
        //error handling for 2 consective commas.
        return console.log("expecting } but got ,");
      } else {
        while (parseInputString[i] && parseInputString[i] != "}") {
          if (parseInputString[i] == " " || parseInputString[i] == ",") {
            i++;
            continue;
          }
          if (parseInputString[i] == "[") {
            i++;
            let num = "";
            while (
              parseInputString[i] != "," &&
              parseInputString[i] != "]" &&
              parseInputString[i] != "."
            ) {
              num += parseInputString[i];
              i++;
            }
            let sIndex = Number(num);

            if (
              parseInputString[i] == "." &&
              parseInputString[i + 1] == "." &&
              parseInputString[i + 2] == "."
            ) {
              i += 3;
            } else {
              //error handling for 3 dots needed.
              return console.log(
                "expecting ] but got .  ... expected in string input"
              );
            }
            num = "";
            while (parseInputString[i] != "," && parseInputString[i] != "]") {
              num += parseInputString[i];
              i++;
            }
            let eIndex = Number(num);

            for (let j = outputArray.length; j < sIndex; j++) {
              outputArray.push(0);
            }
            i += 2;

            if (parseInputString[i] == "{") {
              i++;
              let array = stringParse(parseInputString);
              outputArray.push(array);
              for (let j = outputArray.length; j <= eIndex; j++) {
                outputArray.push(array);
              }
            } else {
              let num = "";
              while (parseInputString[i] != "," && parseInputString[i] != "]") {
                num += parseInputString[i];
                i++;
              }
              outputArray.push(Number(num));
              for (let j = outputArray.length; j < eIndex; j++) {
                outputArray.push(Number(num));
              }
            }
            i++;
            continue;
          }
          if (parseInputString[i] == "{") {
            i++;
            outputArray.push(stringParse(parseInputString));
            i++;
          }
          if (Number.isInteger(Number(parseInputString[i]))) {
            let num = "";
            while (parseInputString[i] != "," && parseInputString[i] != "}") {
              num += parseInputString[i];
              i++;
            }
            outputArray.push(Number(num));
          }
          if (parseInputString[i] != "}") {
            i++;
          }
        }
      }
    }
    return outputArray;
  }
  console.log("Parse Output is : ");
  console.log(stringParse(parseInputString));
  rl.close();
});
//{22, {44, 99}, [6]=33,}
//{22, {44,44}, [9]=1,[14...18]={33, 77, [3]=2,},}
