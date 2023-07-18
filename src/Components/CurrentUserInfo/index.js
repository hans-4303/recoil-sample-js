/* useRecoilValue, useSetRecoilState hook 불러오기 */
import { useRecoilValue, useSetRecoilState } from "recoil";

/* selector 불러오기 */
import currentUserInfoQuery from "../../Recoil/Selectors/currentUserInfoQuery.selector";
import friendsInfoQuery from "../../Recoil/Selectors/friendsInfoQuery.selector";
/* atom 불러오기 */
import currentUserIDState from "../../Recoil/Atoms/currentUserIDState.atom";

/* 질문, 리코일 쓰는 건 좋은데, 지정한 데이터가 있을 때 없을 때 조건부 렌더링 해야 되는 것 아닌지? */

const CurrentUserInfo = () => {
  /* 리코일 값을 반환 받은 변수들 */
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  /* 리코일 값에 대한 setter 제공

  추가 설명: 구성 요소를 지정된 상태에 등록하지 않습니다. */
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <div>
      {/* currentUser.name 대입 */}
      <h1>{currentUser.name}</h1>
      <ul>
        {/* friends 배열 순회하고 요소의 id와 name 활용
        setter에 friend.id 대입하여 현재 유저 ID 변경 */}
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentUserInfo;
