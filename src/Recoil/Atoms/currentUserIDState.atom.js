/* 기본 atom 값 쿼리를 위해 selector 추가 호출 */
import { atom, selector } from "recoil";

/* 전체 구조는 atom */
const currentUserIDState = atom({
  key: "CurrentUserID",
  /* selector를 활용한 기본 값 쿼리 */
  default: selector({
    /* 키 입력 */
    key: "CurrentUserID/Default",
    /* get 동작 작성 가능, 여기에서는 가상의 함수를 적어놓은 것 추정 */
    get: () => myFetchCurrentUserID(),
  }),
});

export default currentUserIDState;
