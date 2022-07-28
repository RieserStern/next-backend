const myName = 'Nicolas';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 12);

class Person {
  // private age;
  // private name;

  //For declare type datas private
  constructor(private age: number, private name: string) {
    //and Define type de datas
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my name is ${this.name} and i have ${this.age} years old`;
  }
}

const nicolas = new Person(15, 'Alex');
console.log(nicolas.getSummary());
