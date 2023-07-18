/* useRecoilValueLoadable hook 불러오기 */
import { useRecoilValueLoadable } from "recoil";

/* selectorFamily 불러오기 */
import userNameQuery from "../../Recoil/SelectorFamily/userNameQuery.selectorFamily";

const UserInfo = ({ userID }) => {
  /* selectorFamily에 파라미터 넘기기
  렌더링 중 상태 확인 가능 */
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  /* userNameLoadable의 state에 따라 렌더 내용 바꾸기 */
  switch (userNameLoadable.state) {
    case "hasValue":
      return <div>{userNameLoadable.contents}</div>;
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      throw userNameLoadable.contents;
    /* hasError 조건이 있기 때문에 default 생략한 것으로 추정 */
  }
};

export default UserInfo;
