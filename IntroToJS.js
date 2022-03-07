// hello world workshop

const int = 1;
const float = 2.3;
const double = 3.7;
const boolean = true;
const char = 'w';
const string = 'hello world';

console.log(int);
console.log(float);
console.log(double);
console.log(boolean);
console.log(char);
console.log(string);

// Arithmetic operators

let num1 = 10;
var num2 = 4;

const addition = num1 + num2; // 10+4 = 14
console.log("10 + 4 = " + addition);
const subtraction = num1 - num2; //10-4 = 6
console.log("10 - 4 = " + subtraction);
const multiplication = num1 * num2; //10 *4 = 40;
console.log("10 x 4 = " + multiplication);
const division = num1 / num2; // 10/4 = 2.5;
console.log("10 / 4 = " + division);

// conditional operators
if (num1 > num2) {
    console.log("num1 is larger than num2.")
}
else if (num2 > num1) {
    console.log("num2 is larger than num1.")
}
else {
    console.log("num1 is equal to num2.")
}
