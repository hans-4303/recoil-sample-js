/* atomFamily 불러오기 */
import { atomFamily } from "recoil";

/* atomFamily 작성, userID 파라미터로 작동 */
const userInfoState = atomFamily({
  /* 키 작성 */
  key: "UserInfo",
  /* userID 파라미터 기반으로 default 작성
  fetch() 호출, 어떤 URL 호출 메서드에 userID 대입한 결과를 대입 */
  default: (userID) => fetch(userInfoURL(userID)),
});

export default userInfoState;
