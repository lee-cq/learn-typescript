

let isDone: boolean = true

let num: number = 1
let bigNum: bigint = BigInt(100_123_123_123_123)  //  ES2020 新增
let num16: number = 0xf00d
let num2: number = 0b1010
let num8: number = 0o744
// let num1: number = 1  // 整个项目在一个默认的命名空间中，有于在01 中定义了 num1 ，现在重复定义会报错

let myStr: String = 'LeeCQ'

let mobStr: String = `I'm ${myStr}`

let s1=Symbol(22)

// 无返回值的函数
function testFunction(): void {
    console.log('testFunction')
    // alert(mobStr)
}

// 空值
let un: undefined = undefined
let nu: void = undefined;

// -----------------------
// any 类型

// 普通类型
let _str :string = '123'
// _str = 1  // 会报错

// 任意值
let anyThing: any = 'hello'
anyThing = 1  // 不报错

// 任意值的属性和方法
// anyThing.setName('Tom');
// anyThing.setName('Tom').sayHello();
// anyThing.myName.setFirstName('Cat');



console.log(anyThing.name);
console.log(anyThing.String);

// 对任意值的属性和方法的访问，都是允许的
console.log('anyThing.name', anyThing.name);
console.log('anyThing.String',anyThing.String);

// 但是，如果定义了一个变量，却没有赋值，那么它的类型会被识别为任意值类型
let something: any = 'seven';
something = 7;
// something.setName('Tom');  // 虽然编译器不会报错，但是运行时会报错，因为此时 something 的类型是 number，而 number 类型是没有 setName 方法的
console.log(something);

// 联合类型
let unionType: string | number;
unionType = 1;
unionType = '1';


// unKnown 类型
let unKnown: unknown = 1;
unKnown = '1';
unKnown = true;

// unKnown = unKnown + 1;  // 会报错

//unkonw 类型的变量，不能直接赋值给其他变量
let un_any: any = 1;  
un_any = unKnown;  // 可以赋值给 any 类型

// ===================================

//Never 类型
// never 类型表示的是那些永不存在的值的类型
// 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}

// infiniteLoop()

// ====================================

// object 类型
// object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型
// 使用 object 类型，就可以更好的表示像 Object.create 这样的 API
declare function create(o: object | null): void;
let o1: object = { a: 1 };
let o2: object = [];
let o3: object = () => { };
// let o4: object = 22;  // error, 这个是原始类型，无法表示
// let o5: object = null; // error, 这个是原始类型，无法表示
// let o6: object = undefined; // error, 这个是原始类型，无法表示
// let o7: object = Symbol(); // error, 这个是原始类型，无法表示 



// Object 类型
// Object 表示原始类型的包装对象
let o8: Object = { a: 1 };
let o9: Object = [];
let o10: Object = () => { };
let o11: Object = 22;  

// ====================================
// 数组类型
// 数组的类型有多种定义方式，比较灵活
// 1. 在元素类型后面接上 []，表示由此类型元素组成的一个数组
let arr1: number[] = [1, 2, 3];

// 2. 使用数组泛型，Array<元素类型>
let arr2: Array<number> = [1, 2, 3];

// 3. 用接口表示数组    
interface NumberArray {
    [index: number]: number;
}

let arr3: NumberArray = [1, 2, 3];

// 4. 用类数组表示
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}

//取巧的任意数组
let arr4: any[] = [1, true, 'free'];

// ====================================
// 二维数组
let arr5: number[][] = [[1, 2], [3, 4]];
let arr6: Array<Array<number>> = [[1, 2], [3, 4]];


// ====================================
// 元组 Tuple
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
// 比如，你可以定义一对值分别为 string 和 number 类型的元组
let x: [string, number];
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error

// 当访问一个已知索引的元素，会得到正确的类型
console.log(x[0].substr(1)); // OK
// console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

// 当访问一个越界的元素，会使用联合类型替代
// x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

// ====================================
// 枚举
// enum 类型是对 JavaScript 标准数据类型的一个补充
// 使用枚举类型可以为一组数值赋予友好的名字
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 默认情况下，从 0 开始为元素编号
// 你也可以手动的指定成员的数值
enum Color1 {Red = 1, Green, Blue}
let c1: Color1 = Color1.Green;

// 或者，全部都采用手动赋值
enum Color2 {Red = 1, Green = 2, Blue = 4}
let c2: Color2 = Color2.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字
enum Color3 {Red = 1, Green, Blue}
let colorName: string = Color3[2];

console.log('colorName', colorName); // 显示'Green'因为上面代码里它的值是2

// 字符串枚举
// 字符串枚举没有自增长的行为，字符串枚举可以很好的序列化
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

let direction: Direction = Direction.Up;
console.log('direction', direction); // UP

// 异构枚举
// 异构枚举（Heterogeneous enums）指的是枚举可以混合字符串和数字成员
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// ====================================

// 类型断言
// 类型断言（Type Assertion）可以用来手动指定一个值的类型
// 语法
let aa = null as unknown;  // as 语法
let aa2 = <unknown>null;  // <> 语法





console.log('End...');

