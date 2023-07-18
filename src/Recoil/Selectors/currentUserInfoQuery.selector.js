/* 비동기 상황에서 다룰 selector */
import { selector } from "recoil";

/* atom 불러오기 */
import currentUserIDState from "../Atoms/currentUserIDState.atom";
/* selectorFamily 불러오기 */
import userInfoQuery from "../SelectorFamily/userInfoQuery.selectorFamily";

/* currentUserInfoQuery selector
현재 유저 ID state를 받고 유저 정보 쿼리로 접근 */
const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  /* get 동작, 현재 유저 ID state를 불러오고 유저 정보 쿼리 접근 */
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

export default currentUserInfoQuery;
