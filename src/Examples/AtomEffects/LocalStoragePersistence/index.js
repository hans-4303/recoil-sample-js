import { atom } from "recoil";

/* effects 키와 연결된 함수 */
export const localStorageEffect =
  /* 키 파라미터 */
  (key) =>
  /* setSelf, onSet 파라미터는 effects에서 전달되었다 취급 */
  ({ setSelf, onSet }) => {
    /* localStorage.getItem(key), key 아이템 가져오기 */
    const savedValue = localStorage.getItem(key);
    /* 만약 저장된 값이 null이 아닐 때 */
    if (savedValue != null) {
      /* setSelf 호출, JSON.parse(savedValue) 대입 */
      setSelf(JSON.parse(savedValue));
    }

    /* onSet 함수 호출, newValue, _,(??) isReset 파라미터 다루기 */
    onSet((newValue, _, isReset) => {
      /* isReset이 참이라면 */
      isReset
        ? localStorage.removeItem(key) /* localStorage의 아이템 제거 */
        : localStorage.setItem(key, JSON.stringify(newValue)); /* localStorage의 아이템 설정 */
    });
  };

/* atom 생성 및 effects 키와 배열 정의, 함수 호출하고 인수 전달 */
const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
  effects: [localStorageEffect("current_user")],
});

export default currentUserIDState;
