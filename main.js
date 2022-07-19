const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldChar = '░';
const pathChar = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.hPos = 0;
    this.vPos = 0;
  }

  static generateField(h, w, percentHole) {
    let tempField = [];
    for(let i = 0; i < h; i++) {
      tempField[i] = [];
      for(let j = 0; j < w; j++) {
        let random = Math.random();
        if(random <= percentHole) {
          tempField[i][j] = hole;
        } else {
          tempField[i][j] = fieldChar;
        }
      }
    }
    tempField[0][0] = pathChar;
    return tempField;
  }

  print() {
    for(const fieldRow of this.field) {
      console.log(fieldRow.join(' '));
    }
  }

  updatePosition(dir) {
    if(dir === 'l') {
      this.hPos -= 1;
    } else if(dir ==='r') {
      this.hPos += 1;
    } else if(dir === 'd') {
      this.vPos -= 1;
    } else if(dir === 'u') {
      this.vPos += 1;
    } else return 'Invalid direction';
  }

}

function checkWin(fieldElement) {
  if(fieldElement === '^') {
    return 'Congrats, you found your hat';
  } else if(fieldElement === 'O') {
    return 'Sorry, you fell down a hole';
  } else if(fieldElement === '░') {
    return;
  }
}

function askUser() {
  process.stdin.on('data', function(input) {
    //input should be a direction
    console.log()
  })
}

function runGameLoop() {
  //initialize field
  const gameField = new Field(Field.generateField(5,10, 0.25));
  gameField.print();

}
runGameLoop();
