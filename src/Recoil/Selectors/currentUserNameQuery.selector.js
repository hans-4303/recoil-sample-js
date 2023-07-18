/* 비동기 상황에서 selector 작성 */
import { selector } from "recoil";
/* atom 불러오기 */
import { currentUserIDState } from "../Atoms/currentUserIDState.atom";

const currentUserNameQuery = selector({
  key: "CurrentUserName",
  /* get 동작에서 비동기 함수 대입 */
  get: async ({ get }) => {
    /* 받아오는 response, await으로 비동기 동작 처리
    myDBQuery 접근하고 userID 키에 currentUserIDState를 대입함 */
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    /* response 데이터가
    response.error 포함 시 */
    if (response.error) {
      throw response.error;
    }
    /* response.name 반환 */
    return response.name;
  },
});

export default currentUserNameQuery;
