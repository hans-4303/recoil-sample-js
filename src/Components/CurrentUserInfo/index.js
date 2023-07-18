/* useRecoilCallback, useRecoilValue hook 불러오기 */
import { useRecoilCallback, useRecoilValue } from "recoil";

/* selector 불러오기 */
import currentUserInfoQuery from "../../Recoil/Selectors/currentUserInfoQuery.selector";
import friendsInfoQuery from "../../Recoil/Selectors/friendsInfoQuery.selector";

/* selectorFamliy 불러오기 */
import userInfoQuery from "../../Recoil/SelectorFamily/userInfoQuery.selectorFamily";

/* atom 불러오기 */
import currentUserIDState from "../../Recoil/Atoms/currentUserIDState.atom";

function CurrentUserInfo() {
  /* useRecoilValue에 selector 지정하고 반환 */
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);

  /* useRecoilCallback을 통해 메서드 생성
  useRecoilCallback 파라미터 중 snapshot, set을 구조 분해하며 userID를 파라미터로 가짐 */
  const changeUser = useRecoilCallback(({ snapshot, set }) => (userID) => {
    /* selectorFamily에 파라미터 넘겨주고 스냅샷에 접근하여 getLoadable 메서드 호출
    -> 유저 정보 미리 가져오는 과정이 됨 */
    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
    /* 현재 유저 상태 atom을 지정하여 userID 값을 대입함
    -> 새 렌더를 시작하도록 현재 사용자 변경 */
    set(currentUserIDState, userID); // change current user to start new render
  });

  return (
    <div>
      {/* currentUser.name 사용 */}
      <h1>{currentUser.name}</h1>
      <ul>
        {/* friends 배열 순회, li 목록 생성하며 onClick 명시하고 이벤트 연결,
        friend.id를 인수로 넘김 */}
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => changeUser(friend.id)}>
            {/* friend.name 사용 */}
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentUserInfo;
