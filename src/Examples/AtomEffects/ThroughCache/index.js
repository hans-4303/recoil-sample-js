/* atomFamily effects 키에서 호출될 함수 */
const syncStorageEffect =
  /* atomFamily의 파라미터 전달 */
  (userID) =>
  /* setSelf, onSet, trigger 구조분해: effects에서 전달한 것으로 간주 */
  ({ setSelf, onSet, trigger }) => {
    // Initialize atom value to the remote storage state
    /* atom 값을 원격 스토리지 state로 초기화 */
    if (trigger === "get") {
      /* 무거운 초기화 피하기 */
      setSelf(myRemoteStorage.get(userID)); /* 동기적으로 초기화될 것 */
    }

    /* 원격 스토리지 변경 구독 및 atom 값 업데이트 */
    myRemoteStorage.onChange(userID, (userInfo) => {
      setSelf(userInfo); /* 비동기적으로 값이 바뀔 것 */
    });

    /* 로컬 변경사항에 가입하고 서버 값 업데이트 */
    onSet((userInfo) => {
      myRemoteStorage.set(userID, userInfo);
    });

    // 원격 저장소 구독 정리
    return () => {
      myRemoteStorage.onChange(userID, null);
    };
  };

export default syncStorageEffect;
