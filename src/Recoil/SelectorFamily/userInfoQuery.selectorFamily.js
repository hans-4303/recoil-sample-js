/* 비동기 상황에서 사용할 selectorFamily */
import { selectorFamily } from "recoil";

/* atomFamily 불러오기 */
import userInfoQueryRequestIDState from "../AtomsFamily/userInfoQueryRequestIDState.atomFamily";

const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get:
    /* 호출 시 userID 파라미터 가지고 비동기 동작 */
    (userID) =>
    async ({ get }) => {
      /* 파라미터를 userInfoQueryRequestIDState atom에 대입하고 결과 반환 */
      get(userInfoQueryRequestIDState(userID)); // Add request ID as a dependency
      /* 파라미터로 데이터베이스 접근 */
      const response = await myDBQuery({ userID });
      /* 에러 시 동작 */
      if (response.error) {
        throw response.error;
      }
      /* res 데이터 반환 */
      return response;
    },
});

export default userInfoQuery;
