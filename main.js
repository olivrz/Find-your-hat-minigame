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

    //add hat
    const xHat = Math.floor(Math.random() * h); 
    const yHat = Math.floor(Math.random() * w); 
    if(yHat === 0 && xHat === 0 ) {yHat = w-1;}
    tempField[xHat][yHat] = hat;
    return tempField;
  }

  getFieldElement() {
    return this.field[this.hPos][this.vPos];
  }

  setFieldElement(char) {
    this.field[this.hPos][this.vPos] = char;
  }

  print() {
    for(const fieldRow of this.field) {
      console.log(fieldRow.join(' '));
    }
  }

  updatePosition(dir) {
    if(this.isValidPosition()) {
      this.setFieldElement(fieldChar);
      if(dir === 'u') {
        this.hPos -= 1;
      } else if(dir ==='d') {
        this.hPos += 1;
      } else if(dir === 'l') {
        this.vPos -= 1;
      } else if(dir === 'r') {
        this.vPos += 1;
      } else {
          console.log('invalid direction');
          return 'Invalid direction';
      }
      if(this.isValidPosition()) {
        this.setFieldElement(pathChar);
      } else return;
        
    } else {
        return;
    }
    
  }

  isValidPosition() {
    try {
      if(this.getFieldElement() === undefined)  { 
        return false;}
      return (this.getFieldElement() === pathChar || this.getFieldElement() === fieldChar);
    } catch(e) {
      console.log('Out of bounds')
      return false;
    }

  }

}

function checkWin(fieldElement) {
  if(fieldElement === '^') {
    return 'Congrats, you found your hat';
  } else if(fieldElement === 'O') {
    return 'Sorry, you fell down a hole';
  } else if(fieldElement === '░') {
    return '';
  } else if(fieldElement === undefined) {
    return 'Out of bounds';
  }
}

function askUser(gameField) {
  while(gameField.isValidPosition()) { 
    const userInput = prompt('Which way?');
    gameField.updatePosition(userInput.trim().toLowerCase());
    gameField.print();
  }
  console.log(checkWin(gameField.getFieldElement()));
}

function runGameLoop() {
  //initialize field
  const gameField = new Field(Field.generateField(5,10, 0.25));
  gameField.print();
  askUser(gameField); 
}
runGameLoop();
