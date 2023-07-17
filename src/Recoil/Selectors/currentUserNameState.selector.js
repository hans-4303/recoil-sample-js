/* 동기 상황에서 작성한 selector */
import { selector } from "recoil";
/* atom 호출 */
import { currentUserIDState } from "../Atoms/currentUserIDState.atom";

export const currentUserNameState = selector({
  key: "CurrentUserName",
  get: ({ get }) => {
    /* tableOfUsers 객체 중 get(currentUserIDState) 키에 맞는 객체 접근하고
    해당 객체의 name을 반환하도록 함 */
    return tableOfUsers[get(currentUserIDState)].name;
  },
});
