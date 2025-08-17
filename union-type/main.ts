// type Track = {
//     title:string,
//     releaseDate:string,
// }

// type Artist = {
//     name:string,
//     releaseDate:string,
// }

// type SearchResult = Track | Artist

// interface SearchResponse {
//     searchResult: Track|Artist
// }

// let results : SearchResult[] = [{title:"hello",releaseDate:"2024"},{name:"hello",releaseDate:"2025"}]

// function getName(result:Track|Artist){
//     // return result.name
// } //유니온 타입을 사용하면 이런 상황에서 에러가 날 수 있다.
// // name 속성은 Artist 타입에는 있지만, Track 타입에는 없다. -> 오류 발생


//타입 좁히기
// 1. typeof(number, string, boolean, undefined 등 원시타입만)
// type SearchType=number|string;

// function searchByKeyword(keyword:SearchType):string{
//     //넘버로 들어오는 타입은 스트링으로 바꿔주기
//     if(typeof keyword === "number") return keyword.toString()
//     return keyword
// }

// console.log(searchByKeyword(3), typeof searchByKeyword(3));
// //typeof는 원시타입(number, string, boolean, undefined)만 감지할 수 있다.(원사타입이 아니면 다 object라고만 반환한다.)


//2. instanceof(object 감지 가능,하지만 javascript 내 내장된 기본 객체만 감지 가능(Date 등))
// type Period = {
//     start:string,
//     end:string,
// }

// type SearchType = Period | Date

// function getDate(day:SearchType):Date{
//     if(day instanceof Date) return day //Period는 자바스크립트의 고유 인스턴스가 아니기 때문에 Date대신에 Period를 넣을 수 없다.
//     return new Date(day.start)
// }

// getDate({start:"2024-01-01",end:""})


//3. in
// type Track = {
//     title:string,
//     releaseDate:string,
// }

// type Artist = {
//     name:string,
//     releaseDate:string,
// }

// function getName(result:Track|Artist){
//     if("title" in result) return result.title

//     if("name" in result) return result.name
// }

//4. is(타입 가드 함수용)
function isTrack(result:Track|Artist):result is Track{
    return (result as Track).title !== undefined
}

// function isTrack(result:Track|Artist):boolean{
//     return (result as Track).title !== undefined
// } 
// 리턴 타입에 boolean으로 써도 똑같은 결과값을 반환하지만, printInfo에서 result가 Track 타입인지 Artist 타입인지 구별을 못한다. -> result.title, result.name 등에서 타입 오류가 남.

function isArtist(result:Track|Artist):result is Artist{
    return (result as Artist).name !== undefined
}
    
function printInfo(result:Track|Artist){
    if(isTrack(result)){
        console.log(result.title)
    }else if(isArtist(result)){
        console.log(result.name)
    }
}


