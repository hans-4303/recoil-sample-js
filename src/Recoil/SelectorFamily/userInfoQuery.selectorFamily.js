/* 비동기 상황, 파라미터 다루는 selectorFamily */
import { selectorFamily } from "recoil";

/* userInfoQuery selectorFamily, userID 파라미터 다룸 */
const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  /* get 동작에서 userID 파라미터 받고 비동기 함수 */
  get: (userID) => async () => {
    /* await으로 비동기 호출, 파라미터 전달 */
    const response = await myDBQuery({ userID });
    /* 에러 시 동작 */
    if (response.error) {
      throw response.error;
    }
    /* 완료 시 res 데이터 반환 */
    return response;
  },
});

export default userInfoQuery;
