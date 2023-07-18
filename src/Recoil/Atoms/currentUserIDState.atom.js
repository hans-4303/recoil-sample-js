/* 비동기 상황에서 다룰 atom */
import { atom } from "recoil";

const currentUserIDState = atom({
  /* 키 */
  key: "CurrentUserID",
  /* 기본 값 */
  default: null,
});

export default currentUserIDState;