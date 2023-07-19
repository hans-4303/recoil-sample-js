import { atom } from "recoil";

/* effects 키에서 호출되는 메서드 */
export const localForageEffect =
  /* 키 파라미터 받아옴 */
    (key) =>
    /* setSelf, onSet은 effects에서 받아온다 판단 */
    ({ setSelf, onSet }) => {
      /* setSelf 메서드 호출
    로컬 스토리지에서 key를 가져옴, 이후
    savedValue가 null인지 따져서 savedValue를 json으로 파싱하거나 새로운 기본 값 인스턴스 생성(미리 인스턴스 만들었다 가정) */
      setSelf(
        localForage.getItem(key).then(
          (savedValue) =>
            savedValue != null ? JSON.parse(savedValue) : new DefaultValue() // Abort initialization if no value was stored
        )
      );

      /* 상태 변경에 가입하고 localForage(??)에 유지 */
      onSet((newValue, _, isReset) => {
        /* isReset 값 따져서 */
        isReset
          ? localForage.removeItem(key)
          /* localForage에서 아이템 삭제 */
          : localForage.setItem(key, JSON.stringify(newValue));
          /* localForage에 아이템 설정 */
      });
    };

/* atom 생성 */
const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
  /* effects 키와 배열 생성, 메서드 호출하고 인수 넘기기 */
  effects: [localForageEffect("current_user")],
});

export default currentUserIDState;
