/* 동기 상황에서 작성한 atom */
import { atom } from "recoil";

export const currentUserIDState = atom({
  /* 키 */
  key: 'CurrentUserID',
  /* 기본 값 */
  default: 1,
})