/* atomFamily 불러오기 */
import { atomFamily } from "recoil";

/* atomFamily
요청 ID를 패밀리 매개변수 혹은 쿼리 대한 종속성으로 추가하기 위함 */
const userInfoQueryRequestIDState = atomFamily({
  /* 키 작성 */
  key: "UserInfoQueryRequestID",
  /* 기본 값 작성 */
  default: 0,
});

export default userInfoQueryRequestIDState;
