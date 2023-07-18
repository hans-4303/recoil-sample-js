import { useEffect } from "react";
import { useRecoilCallback } from "recoil";
import userInfoState from "../Recoil/AtomsFamily/userInfoState.atomFamily";

/* 쿼리를 새로고침하는 리액트 컴포넌트 */
// React component to refresh query
function RefreshUserInfo({ userID }) {
  /* useRecoilCallback
  
  이 후크를 호출할 때 전달된 콜백을 실행하는 함수를 반환합니다.
  이벤트에 대한 응답으로 Recoil 상태에 액세스하는 데 유용합니다. */
  const refreshUserInfo = useRecoilCallback(
    /* 파라미터에서 set 분리, 특정 recoil 지정하는 setter */
    ({ set }) =>
      async (userID) => {
        const userInfo = await myDBQuery({ userID });
        set(userInfoState(userID), userInfo);
      },
    /* 동작 의존성 */
    [userID]
  );

  /* user를 매초 갱신하는 useEffect */
  // Refresh user info every second
  useEffect(() => {
    /* refreshUserInfo useRecoilCallback 호출, 1초 간격 */
    const intervalID = setInterval(refreshUserInfo, 1000);
    /* 컴포넌트 언마운트 시 인터벌 지우기 */
    return () => clearInterval(intervalID);
  }, [refreshUserInfo]);

  /* 렌더는 따로 없음 */
  return null;
}

export default RefreshUserInfo;
