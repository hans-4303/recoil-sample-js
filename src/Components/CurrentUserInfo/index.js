/* useRecoilRefresher_UNSTABLE, useRecoilValue hook 불러오기 */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";

/* atom 불러오기 */
import currentUserIDState from "../../Recoil/Atoms/currentUserIDState.atom";

/* selectorFamily hook 불러오기 */
import userInfoQuery from "../../Recoil/SelectorFamily/userInfoQuery.selectorFamily";

function CurrentUserInfo() {
  /* useRecoilValue에 currentUserIDState atom 대입하고 반환 */
  const currentUserID = useRecoilValue(currentUserIDState);
  /* userInfoQuery selector에 currentUserID 대입하고
  반환된 결과를 useRecoilValue에 대입하여 다시 반환 */
  const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID));
  /* useRecoilRefresher_UNSTABLE()
  selector의 캐시를 삭제하여 재평가합니다. */
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(
    userInfoQuery(currentUserID)
  );

  return (
    <div>
      {/* currentUserInfo.name 사용 */}
      <h1>{currentUserInfo.name}</h1>
      {/* recoil 한정 새로고침 버튼, 누르면 selector 캐시 삭제하고 재평가 */}
      <button onClick={() => refreshUserInfo()}>Refresh</button>
    </div>
  );
}

export default CurrentUserInfo;
