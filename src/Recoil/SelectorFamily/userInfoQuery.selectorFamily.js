/* selectorFamily 가져오기 */
import { selectorFamily } from "recoil";

/* 아래 selectorFamily는 쿼리 새로고침을 할 수 있다 가정함 */
const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  /* get 동작에서 userID 파라미터를 전제함 */
  get: (userID) => async () => {
    /* 인수를 대입하고 await으로 데이터베이스 통신 */
    const response = await myDBQuery({ userID });
    /* 에러 발생 시 throw */
    if (response.error) {
      throw response.error;
    }
    /* 성공시 res.data 반환 */
    return response.data;
  },
});

export default userInfoQuery;
