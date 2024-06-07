export class TranslatedWord {
    guess: string;
  
    constructor(
      public origin: string,
      public target: string
    ) {
      this.guess = "";
    }
  
    toPlainObject() {
      return {
        origin: this.origin,
        target: this.target,
        guess: this.guess
      };
    }
  
    static fromPlainObject(data: any): TranslatedWord {
      const word = new TranslatedWord(data.origin, data.target);
      word.guess = data.guess;
      return word;
    }
  }
  