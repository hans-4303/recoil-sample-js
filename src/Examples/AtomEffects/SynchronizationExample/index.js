import { atomFamily } from "recoil";

export const history = [];

export const historyEffect =
  (name) =>
  ({ setSelf, onSet }) => {
    onSet((newValue, oldValue) => {
      history.push({
        label: `${name}: ${JSON.serialize(oldValue)} -> ${JSON.serialize(
          newValue
        )}`,
        undo: () => {
          setSelf(oldValue);
        },
      });
    });
  };

export const syncStorageEffect =
  /* 파라미터 userID 받아오기 */
  (userID) =>
  /* setSelf, trigger 구조 분해, atomFamily의 effects가 주는 기본 파라미터인가? */
  ({ setSelf, trigger }) => {
    /* Initialize atom value to the remote storage state:
    atom 값을 원격 스토리지 state로 초기화 */
    if (trigger === "get") {
      /* Avoid expensive initialization:
      비용이 많이 드는 초기화 방지 */
      setSelf(myRemoteStorage.get(userID));
      /* Call synchronously to initialize:
      동기식 호출을 통해 초기화 */
    }

    /* Subscribe to remote storage changes and update the atom value:
    원격 스토리지 변경 구독 및 atom 값 업데이트 */
    myRemoteStorage.onChange(userID, (userInfo) => {
      setSelf(userInfo);
      /* Call asynchronously to change value:
      값을 변경하기 위해 비동기식으로 호출 */
    });

    /* Cleanup remote storage subscription:
    원격 저장소 구독 정리, useEffect return 문 구조 */
    return () => {
      myRemoteStorage.onChange(userID, null);
    };
  };

const userInfoState = atomFamily({
  key: "UserInfo",
  default: null,
  effects: (userID) => [
    historyEffect(`${userID} user info`),
    syncStorageEffect(userID),
  ],
});

export default userInfoState;
