import { selectorFamily } from "recoil";

/* 파라미터 기반으로 쿼리하고 싶을 때 */
const userNameQuery = selectorFamily({
  /* 키 작성 */
  key: "UserName",
  /* userID 파라미터 받아오고 비동기 함수 실행 */
  get: (userID) => async () => {
    /* await으로 비동기 작동 */
    const response = await myDBQuery({ userID });
    /* 에러 발생했다면 throw */
    if (response.error) {
      throw response.error;
    }
    /* 반환되는 데이터: response.name */
    return response.name;
  },
});

export default userNameQuery;
