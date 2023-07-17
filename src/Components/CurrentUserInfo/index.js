/* useRecoilValue hook 불러오기 */
import { useRecoilValue } from "recoil";
/* currentUserNameState selector 불러오기 */
import { currentUserNameState } from "../../Recoil/Selectors/currentUserNameState.selector";

const CurrentUserInfo = () => {
  /* useRecoilValue hook으로 selector 대입하고 반환 */
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
};

export default CurrentUserInfo;
