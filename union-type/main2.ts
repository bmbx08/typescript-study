//유니온 타입의 단점

type Track = {
    type:"track", //식별 유니온
    title:string,
    releaseDate:string,
}

type Artist = {
    type:"artist", //식별 유니온
    name:string,
    debutDate:string,
}

const result:Track|Artist = {
    type:"track",
    title:"hey",
    releaseDate:"2025",
    // type:"artist",
    // name:"누나",
    // debutDate: "2026",
} //result는 Track과 Artist의 항목들을 동시에 가지고 있어도 에러가 안 뜬다.(유니온 타입의 결점)
//이 문제를 해결하기 위해서 타입 선언 할 때 string값을 가진 항목을 추가한다.(식별 유니온)
//식별 유니온을 사용하면 유니온 타입을 가진 객체를 생성할 때 string값을 가진 type 항목 선언이 필수이고, 그 값으로 타입(Artist or Track)을 구별한다.

//exhaustiveCheck
interface Radio{
    type:"radio",
    title:string,
    numberOfSongs:number,
}

type SearchResult= Track|Artist|Radio

function getTypeName(result:SearchResult){
    if(result.type==="track") return "트랙"
    else if(result.type==="artist") return "아티스트"
    //radio타입을 지나친다.
    // else if(result.type==="radio") return "라디오"
    else{
        // exhaustiveCheck(result)
        return "결과"
    }
}

function exhaustiveCheck(param:never){
    throw new Error("에러 ")
}
//exhaustiveCheck를 사용하는 이유
//SearchResult 타입에 Radio등 유니온 타입을 추가한다면 이 타입을 param타입으로 사용하는 함수는 추가된 유니온 타입(Radio)의 경우의 수에 대해 return을 못한다.
//또한 오류도 발생하지 않기 때문에, 개발자는 어디서 오류인지 인식 못할 수 있다.
//함수 안에 type 체크를 하는 case문에서 exhaustiveCheck함수를 사용하면, 의도적으로 에러를 반환해 오류 위치를 알 수 있게 해준다.

//exhaustiveCheck 작동원리
//exhaustiveCheck 함수는 param을 never타입으로 지정하여 param값을 받으면 오류를 반환한다.
//따라서 위처럼 Radio등의 타입 경우의 수에 대하여 else if문을 추가 안했다면 오류로 어디서 추가 안 됬는지 확인하고 추가할 수 있다.
//한 줄 요약: exhaustiveCheck로 유니온 타입의 불완전성을 보완할 수 있다.
//어떻게?: 추가된 유니온 타입의 case를 추가 안했다면 오류 문구와 오류 위치를 알려준다.