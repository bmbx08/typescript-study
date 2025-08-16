var results = [{ title: "hello", releaseDate: "2024" }, { name: "hello", releaseDate: "2025" }];
function getName(result) {
    // return result.name
} //유니온 타입을 사용하면 이런 상황에서 에러가 날 수 있다.
function searchByKeyword(keyword) {
    //넘버로 들어오는 타입은 스트링으로 바꿔주기
    if (typeof keyword === "number")
        return keyword.toString();
    return keyword;
}
console.log(searchByKeyword(3), typeof searchByKeyword(3));
