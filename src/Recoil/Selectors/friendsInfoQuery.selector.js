/* 비동기 상황 동작할 selector, waitForAll 불러오기 */
import { selector, waitForNone } from "recoil";

/* selector 불러오기 */
import currentUserInfoQuery from "./currentUserInfoQuery.selector";
/* selectorFamily 불러오기 */
import userInfoQuery from "../SelectorFamily/userInfoQuery.selectorFamily";

const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    /* currentUserInfoQuery 값을 반환하고 friendList를 구조 분해 */
    const { friendList } = get(currentUserInfoQuery);
    /* 불러올 수 있는 친구 목록만 다루기 */
    const friendLoadables = get(
      /* 일부 데이터로 추가적 UI 업데이트 하기 위해 waitForNone 메서드 호출 및 배열 전달
      friendList 배열을 순회하면서 selectorFamily에 인수 전달 */
      waitForNone(friendList.map((friendID) => userInfoQuery(friendID)))
    );
    /* 배열을 반환
    불러올 수 있는 친구 목록 배열을 순회하면서 요소 중 state가 === 'hasValue'를 만족하는 배열을 지정하고
    해당 배열 중 contents를 구조분해하여 내보내고 있음 */
    return friendLoadables
      .filter(({ state }) => state === "hasValue")
      .map(({ contents }) => contents);
  },
});

export default friendsInfoQuery;
