import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

/* atom 생성 */
const myState = atom({ key: "Key", default: null });

/* useEffect로 recoil state(atom)을 store에 대입하는 경우 */
function MyStateEffect() {
  const [value, setValue] = useRecoilState(myState);
  useEffect(() => {
    /* store.set 메서드로 recoil 상태 전달 */
    store.set(value);
    /* store.onChange 메서드로 setter 함수 전달 */
    store.onChange(setValue);
    return () => {
      store.onChange(null);
    }; /* Cleanup effect:
    컴포넌트가 언마운트 될 때 store.onChange(null) 대입하여 effect 지우기 */
    /* Called when the atom value changes:
    atom 값 변동 있을 때 호출될 로직 */
  }, [value]);
  return null;
}

function MyApp() {
  return (
    <div>
      <MyStateEffect />
      ...
    </div>
  );
}
