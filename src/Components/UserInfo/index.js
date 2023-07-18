/* useRecoilValue hook 불러오기 */
import { useRecoilValue } from "recoil";
/* selectorfamily 불러오기 */
import userNameQuery from "../../Recoil/SelectorFamily/userNameQuery.selectorFamily";

/* 파라미터 기반으로 작동되는 컴포넌트 */
const UserInfo = ({ userID }) => {
  /* useRecoilValue hook의 인수로 selectorfamily와 userID 인수 대입 */
  const userName = useRecoilValue(userNameQuery(userID));
  /* 반환되는 컴포넌트 */
  return <div>{userName}</div>;
};

export default UserInfo;
