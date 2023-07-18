/* 비동기 상황에서 동작할 selector */
import { selector } from "recoil";

/* selector 불러오기 */
import currentUserInfoQuery from "./currentUserInfoQuery.selector";
/* selectorFamily 불러오기 */
import userInfoQuery from "../SelectorFamily/userInfoQuery.selectorFamily";

/* friendsInfoQuery selector
currentUserInfoQuery와 userInfoQuery 의존성으로 동작 */
const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  /* get 동작에서 selector와 selectorFamily들을 기반하여 동작 */
  get: ({ get }) => {
    /* currentUserInfoQuery에서 friendList를 구조분해 */
    const { friendList } = get(currentUserInfoQuery);
    /* 배열을 반환
    friendList를 순회하면서 각 요소로 유저 정보 쿼리 접근하고 배열 요소로 만듦 */
    return friendList.map((friendID) => get(userInfoQuery(friendID)));
  },
});

export default friendsInfoQuery;
