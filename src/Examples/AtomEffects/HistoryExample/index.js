/* atomFamily 불러오기 */
import { atomFamily } from "recoil";

/* atomFamily 작성 */
const userInfoState = atomFamily({
  /* 키 작성 */
  key: "UserInfo",
  /* 기본 값 null */
  default: null,
  /* effects에서 파라미터 활용, historyEffect 함수 호출하고 파라미터 넘기기 */
  effects: (userID) => [historyEffect(`${userID} user info`)],
});

export default userInfoState;

/* history 배열 선언 */
export const history = [];

/* 리턴 없는 void 형 함수, 하지만 배열은 영향을 주고 있음 */
export const historyEffect =
  /* name 파라미터 받아오기 */
  (name) =>
  /* 어떻게 setSelf, onSet을 분해하는지 모르겠음
  atom의 effect를 타고 들어가고 있는 것인지
  정식으로 어디에서 setSelf, onSet을 분해 하는지 덜 와닿음 */
  ({ setSelf, onSet }) => {
    /* 일단 onSet 함수가 newValue, oldValue를 비교 */
    onSet((newValue, oldValue) => {
      /* history 배열에 아래 객체를 대입하고 반환 */
      history.push({
        /* label: 이름, 이전 값, 새 값 */
        label: `${name}: ${JSON.serialize(oldValue)} -> ${JSON.serialize(
          newValue
        )}`,
        /* undo: setSelf 함수 호출하고 oldValue 대입 */
        undo: () => {
          setSelf(oldValue);
        },
      });
    });
  };
