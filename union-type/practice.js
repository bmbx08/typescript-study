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
function processInput(input) {
    if (Array.isArray(input)) {
        // 빈 배열 먼저 처리
        if (input.length === 0) {
            throw new Error("빈 배열은 타입을 판단할 수 없습니다.");
        }
        if (input.every(function (el) { return typeof el === "number"; })) {
            return input.reduce(function (sum, num) { return sum + num; }, 0);
        }
        if (input.every(function (el) { return typeof el === "string"; })) {
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
var Car = /** @class */ (function () {
    function Car(brand) {
        this.brand = brand; // 생성자에서 속성 초기화
    }
    return Car;
}());
var Bike = /** @class */ (function () {
    function Bike(type) {
        this.type = type;
    } // 축약형도 사용 가능 
    return Bike;
}());
function processVehicle(vehicle) {
    if (vehicle instanceof Car) {
        return vehicle.brand.toUpperCase(); // Car일 경우 브랜드 이름 대문자로 반환
    }
    else if (vehicle instanceof Bike) {
        return "Bike: ".concat(vehicle.type); // Bike일 경우 바이크 종류 반환
    }
    else {
        throw new Error("유효하지 않은 Vehicle 타입입니다.");
    }
}
// 테스트 코드
var myCar = new Car("Tesla");
var myBike = new Bike("Mountain");
console.log(processVehicle(myCar)); // "TESLA"
console.log(processVehicle(myBike)); // "Bike: Mountain"
// 넓이를 계산하는 함수
function calculateArea(shape) {
    // 여기에 구현
    if (shape.type === "square")
        return Math.pow(shape.side, 2);
    else if (shape.type === "circle")
        return Math.PI * Math.pow(shape.radius, 2);
    else {
        var _exhaustive = shape;
        throw new Error("Unhandled shape type: ".concat(_exhaustive));
        // exhaustiveCheck(shape)
        // throw new Error("에러");
    }
}
function exhaustiveCheck(params) {
    throw new Error("에러");
}
// 테스트 코드
console.log(calculateArea({ type: "square", side: 5 })); // 기대 출력: 25
console.log(calculateArea({ type: "circle", radius: 7 })); // 기대 출력: 153.93804002589985
