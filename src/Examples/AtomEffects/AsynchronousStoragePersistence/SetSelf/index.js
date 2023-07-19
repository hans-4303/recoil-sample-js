import { atom } from "recoil";

/* effects 키에서 호출되는 메서드 */
export const localForageEffect =
  /* 키 파라미터 받아옴 */
  (key) =>
  /* setSelf, onSet, trigger는 effects에서 받아온다 판단 */
  ({ setSelf, onSet, trigger }) => {
    /* 지속적인 값이 있는 경우 - 로드 시 설정하는 비동기 메서드 */
    const loadPersisted = async () => {
      /* localForage 접근하고 key 아이템 받아오는 동작을 비동기로 호출하고 반환 */
      const savedValue = await localForage.getItem(key);

      /* 만약 key 아이템을 받아왔다면 */
      if (savedValue != null) {
        /* setSelf 메서드 호출하고 savedValue를 JSON 파싱 */
        setSelf(JSON.parse(savedValue));
      }
    };

    /* 지속적인 값을 비동기로 세팅 */
    if (trigger === "get") {
      loadPersisted();
    }

    // Subscribe to state changes and persist them to localForage
    /* 상태 변경 구독하고 localForage(??)에 유지 */
    onSet((newValue, _, isReset) => {
      /* isReset 값 따져서 */
      isReset
        ? localForage.removeItem(key)
        /* localForage에서 아이템 삭제 */
        : localForage.setItem(key, JSON.stringify(newValue));
        /* localForage에 아이템 설정 */
    });
  };

const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
  /* effects 키와 배열 생성, 메서드 호출하고 인수 넘기기 */  
  effects: [localForageEffect("current_user")],
});

export default currentUserIDState;
