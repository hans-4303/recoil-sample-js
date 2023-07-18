/* useRecoilValue 훅 불러오기 */
import { useRecoilValue } from "recoil";
/* 커스텀 훅 불러오기 */
import useRefreshUserInfo from "../../Hooks/useRefreshUserInfo.hook";

/* atom 불러오기 */
import currentUserIDState from "../../Recoil/Atoms/currentUserIDState.atom";
/* selectorFamily 불러오기 */
import userInfoQuery from "../../Recoil/SelectorFamily/userInfoQuery.selectorFamily";

function CurrentUserInfo() {
  /* currentUserIDState atom 값 사용 */
  const currentUserID = useRecoilValue(currentUserIDState);
  /* currentUserID 전달한 userInfoQuery selectorFamily 값 사용 */
  const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID));
  /* currentUserID를 커스텀 훅에 전달
  새로 고침 시 recoil state가 증가하면서 새로 고침 효과 기대 */
  const refreshUserInfo = useRefreshUserInfo(currentUserID);

  return (
    <div>
      <h1>{currentUserInfo.name}</h1>
      {/* onClick과 새로 고침 커스텀 훅 연결,
      useRecoilRefresher_UNSTABLE 같은 정식 새로 고침은 아니지만 recoil 값 변하기 때문에 간단한 효과 기대 가능 */}
      <button onClick={refreshUserInfo}>Refresh</button>
    </div>
  );
}

export default CurrentUserInfo;
