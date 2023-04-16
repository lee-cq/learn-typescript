
# 基础数据类型

## 1. 布尔类型
    
```ts
let isDone: boolean = false;
```

## 2. 数字类型
    
```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

## 3. 字符串类型

```ts
let name: string = "bob";
name = "smith";
```

## 4. 空值类型
    
```ts
function alertName(): void {
    alert("My name is Tom");
}
```

## 5. Null 和 Undefined
    
```ts
let u: undefined = undefined;
let n: null = null;
```

## 6. Any任意值类型

Any类型用来表示允许赋值为任意类型。
    
```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

Any类型的变量可以赋值给任意类型的变量

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

其他类型的变量在赋值给Any类型的变量时，会进行类型检查

```typescript
let list: any[] = [1, true, "free"];
list[1] = 100;
```

## 7. void 类型 和 Never 类型

Void类型像是与any类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是void

```typescript

function warnUser(): void {
    alert("This is my warning message");
}
```

声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：

```typescript
let unusable: void = undefined;
let unusable: void = null;
```

Never类型表示的是那些永不存在的值的类型。例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是never类型，当它们被永不为真的类型保护所约束时。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
```

推断的返回值类型为never,函数中存在无法达到的终点,所以返回值类型为never,而never类型是任何类型的子类型，所以可以赋值给任意类型

```typescript

function fail() {
    return error("Something failed");
}

function infiniteLoop(): never {
    while (true) {}
}
```

## 8. object 类型 & Object 类型

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
一般可以约束 对象，数组，函数等类型。

```typescript
declare function create(o: object | null): void;

let o1: object = { a: 1 };
let o2: object = [];
let o3: object = () => { };
let o4: object = 22;  // error, 这个是原始类型，无法表示
let o5: object = null; // error, 这个是原始类型，无法表示
let o6: object = undefined; // error, 这个是原始类型，无法表示
let o7: object = Symbol(); // error, 这个是原始类型，无法表示

```

Object表示表示原始类型的包装对象, 可以约束除了null和undefined之外的所有类型

```typescript
declare function create(o: Object | null): void;

let o1: string = 'asd'; // 字面量赋值
let o2: string = new String('asd'); // 构造函数赋值
```


## 9. 数组类型

Array类型表示数组，数组中的元素类型可以是任意类型，但是数组中的元素类型必须一致。

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

数组的类型有多种定义方式，比较灵活
1. 在元素类型后面接上 []，表示由此类型元素组成的一个数组
```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

2. 使用数组泛型，Array<元素类型>
```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

3. 用接口表示数组
```ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

4. 用类数组表示数组
> 类数组（Array-like Object）不是数组类型，比如 arguments
```ts
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

> 类数组也可以用接口表示
```ts
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

> 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

```ts
function sum() {
    let args: IArguments = arguments;
}
```

> 取巧的方法是使用类型断言
```ts
function sum() {
    let args: any = arguments;
}
```


## 10. 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为string和number类型的元组。

```ts
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

当访问一个已知索引的元素，会得到正确的类型：

```ts
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

当访问一个越界的元素，会使用联合类型替代：

```ts
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
```

## 11. 枚举

enum类型是对JavaScript标准数据类型的一个补充。像C#一样，使用枚举类型可以为一组数值赋予友好的名字。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

### 默认数字类型

默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从1开始编号：

```ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```

或者，全部都采用手动赋值：

```ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 
例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

alert(colorName);  // 显示'Green'因为上面代码里它的值是2
```

### 异构枚举

枚举可以混合字符串和数字成员，但是数字成员必须在字符串成员之前。

```ts
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

### 计算的和常量成员

每个枚举成员都带有一个值，它可以是常量或计算出来的。

```ts
enum E {
    X, Y, Z
}
```

上面的例子，枚举成员使用常量初始化器，常量枚举成员在使用的地方会被内联进来。

```ts
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```

### 联合枚举与枚举成员的类型

枚举成员具有两种类型：常量枚举成员和计算枚举成员。 常量枚举成员是指不需要计算所得的枚举成员，比如上例当中的 `FileAccess`。 计算枚举成员是指需要计算得出的枚举成员，比如 `E.X`。

在枚举里，常量枚举成员和计算枚举成员都可以存在。

```ts
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    // kind: ShapeKind.Square,  // Error! 不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”。
    kind: ShapeKind.Circle,
    radius: 100,
}
```


## 12. 类型推论
    在没有明确指定类型的时候，TypeScript会依照类型推论（Type Inference）的规则推断出一个类型。
    如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成any类型而完全不被类型检查；

    ```ts
    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

## 13. 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

```ts
let someValue: any = "this is a string";

let aa = null as string;  // as 语法
let aa2 = <string>null;  // <> 语法
```

进阶用法：

```ts
let strLength: number = (<string>someValue).length;  
let strLength: number = (someValue as string).length;
```


Function 中的断言
    
```ts
function toBoolean(something?: any) {  // ? 表示可选参数
     <boolean>something!;  // ! 表示非空断言，即不为 null 或 undefined
     console.log(something!);
}
```



## 类型层级

1. 没定义的类型：null, undefined
2. 基础类型的包装器：Object
3. 基础类型：object, number, string, boolean, symbol, void, never, any
4. 复合类型：数组(Arrey)，元组，枚举，类，接口，函数，泛型