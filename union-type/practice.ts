//1.
// //내 풀이방식(틀렸음)
// type TInput = number[]|string[]|{message:string}
// function processInput(input:number[]|string[]|{message:string}):string {
//     if(typeof input[0]==="number"){
//         for (let i = 0; i < input.length; i++) {
//             sum += arr[i];
//         }    
//     }
//     else if(typeof input[0]==="string"){
//         return "number"
//     }
//     else if(typeof input[0]!=="undefined"){
//         return input[0].toUpperCase();
//     }
// }

// // 테스트 코드
// console.log(processInput([1, 2, 3])); // 6
// console.log(processInput(["hello", "world"])); // "helloworld"
// console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"
// // console.log(processInput(42)); // 에러 발생

//정답
function processInput(
  input: number[] | string[] | { message: string }
): number | string {
  if (Array.isArray(input)) {
    // 빈 배열 먼저 처리
    if (input.length === 0) {
     throw new Error("빈 배열은 타입을 판단할 수 없습니다.");
    }
    if (input.every(el => typeof el === "number")) {
      return input.reduce((sum, num) => sum + num, 0);
    }
    if (input.every(el => typeof el === "string")) {
      return input.join("");
    }

    // 숫자·문자 혼합 배열
    throw new Error("배열 요소의 타입이 섞여 있습니다.");
  }

  // 메시지 객체
  if ("message" in input) {
    return input.message.toUpperCase();
  }

  // 타입 선언상 도달 불가지만 런타임 방어
  throw new Error("Invalid input type");
}

console.log(processInput([1, 2, 3])); // 6
console.log(processInput(["hello", "world"])); // "helloworld"
console.log(processInput({ message: "TypeScript" })); // "TYPESCRIPT"



//2.
//내 풀이방식(틀렸음)
// 클래스 정의
// interface Car{
//     brand:string,
// }

// interface Bike{
//     type:string,
// }

// function processVehicle(vehicle: Car|Bike): string {
//     if(typeof vehicle === Car) return vehicle.toUpperCase();
//     else if(typeof vehicle === Bike) return `Bike: ${vehicle}`
// }

// // 테스트 코드
// // const myCar = new Car("Tesla");
// // const myBike = new Bike("Mountain");

// // console.log(processVehicle(myCar)); // "TESLA"
// // console.log(processVehicle(myBike)); // "Bike: Mountain"
// // console.log(processVehicle("unknown")); // 에러 발생

// console.log(processVehicle({brand:"Tesla"})); // "TESLA"
// console.log(processVehicle({type:"Mountain"})); // "Bike: Mountain"
// console.log(processVehicle("unknown")); // 에러 발생

//정답
// 클래스 정의
class Car {
  public brand: string; // 클래스 속성을 명시적으로 정의
  constructor(brand: string) {
    this.brand = brand; // 생성자에서 속성 초기화
  }
}

class Bike {
  constructor(public type: string) {} // 축약형도 사용 가능 
}

function processVehicle(vehicle: Car | Bike): string {
  if (vehicle instanceof Car) {
    return vehicle.brand.toUpperCase(); // Car일 경우 브랜드 이름 대문자로 반환
  } else if (vehicle instanceof Bike) {
    return `Bike: ${vehicle.type}`; // Bike일 경우 바이크 종류 반환
  } else {
    throw new Error("유효하지 않은 Vehicle 타입입니다.");
  }
}

// 테스트 코드
const myCar = new Car("Tesla");
const myBike = new Bike("Mountain");

console.log(processVehicle(myCar)); // "TESLA"
console.log(processVehicle(myBike)); // "Bike: Mountain"



//3.
// type Admin = { type: "admin"; permissions: string[] };
// type User = { type: "user"; email: string };

// function processUser(user: Admin | User): string {
//     if("permissions" in user){
//         return user.permissions.join(",");
//     }else if("email" in user){
//         return user.email;
//     }else{
//         return "에러"
//     }
// }

// // 테스트 코드
// console.log(processUser({ type: "admin", permissions: ["read", "write"] })); // "read,write"
// console.log(processUser({ type: "user", email: "user@example.com" })); // "user@example.com"
// // console.log(processUser({ type: "guest" })); // 에러 발생

//4.
// type Rectangle = { width: number; height: number };
// type Circle = { radius: number };

// // 사용자 정의 타입 가드
// function isRectangle(shape: unknown): shape is Rectangle {
//     return (shape as Rectangle).width !==undefined && (shape as Rectangle).height !== undefined
// }

// function calculateArea(shape: Rectangle | Circle): number {
//     if(isRectangle(shape)) return shape.width * shape.height
//     return Math.PI * shape.radius ** 2
// }

// // 테스트 코드
// console.log(calculateArea({ width: 10, height: 5 })); // 50
// console.log(calculateArea({ radius: 7 })); // 153.93804002589985 (대략 π * 7²)


//5.
type Square = { type: "square"; side: number }
type Circle = { type: "circle"; radius: number }
type Shape = Square | Circle;

// 넓이를 계산하는 함수
function calculateArea(shape: Shape): number {
  // 여기에 구현
  if(shape.type === "square") return shape.side ** 2
  else if(shape.type === "circle") return Math.PI * shape.radius ** 2
  else {
    // const _exhaustive: never = shape;
    // throw new Error(`Unhandled shape type: ${_exhaustive}`);    
    exhaustiveCheck(shape);
    throw new Error("에러");
  }
}

function exhaustiveCheck(params:never){
    throw new Error("에러")
}

// 테스트 코드
console.log(calculateArea({ type:"square", side: 5 })); // 기대 출력: 25
console.log(calculateArea({ type:"circle", radius: 7 })); // 기대 출력: 153.93804002589985
