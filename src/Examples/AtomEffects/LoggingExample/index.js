/* 특정 atom의 상태 변화를 기록하는 예시 */
import { atom } from "recoil";

const currentUserIDState = atom({
  /* 키 작성 */
  key: "CurrentUserID",
  /* 기본 값 */
  default: null,
  /* 이펙트 정의 */
  effects: [
    /* onSet
    이벤트에 대한 콜백을 구독합니다.
    글로벌 트랜잭션 옵저버 앞에 atom effect 옵저버를 호출합니다 */
    ({ onSet }) => {
      onSet((newID) => {
        console.debug("Current user ID:", newID);
      });
    },
  ],
});

export default currentUserIDState;
