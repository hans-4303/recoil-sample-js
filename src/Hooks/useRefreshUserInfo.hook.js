/* 커스텀 훅으로 가정하고 작성 */

/* useSetRecoilState hook 호출 */
import { useSetRecoilState } from "recoil";
/* atomsFamily 호출 */
import userInfoQueryRequestIDState from "../Recoil/AtomsFamily/userInfoQueryRequestIDState.atomFamily";

function useRefreshUserInfo(userID) {
  /* 파라미터 전달한 atomFamily를 지정하고 useSetRecoilState hook에 전달
  setter를 반환받음 */
  const setUserInfoQueryRequestID = useSetRecoilState(
    userInfoQueryRequestIDState(userID)
  );
  /* 호출 시 함수가 작동됨 */
  return () => {
    /* setter를 호출하고, 현재 요청 ID에서 1을 더함 */
    setUserInfoQueryRequestID((requestID) => requestID + 1);
  };
}

export default useRefreshUserInfo;
