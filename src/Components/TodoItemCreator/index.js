import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";
import { getId } from "../../Utils/getId.util";

/* TodoItemCreator 컴포넌트 */
const TodoItemCreator = () => {
  /* 문자열 state */
  const [inputValue, setInputValue] = useState("");
  /* todoListState를 다루는 setTodoList

  useSetRecoilState Hook을 쓰고, 인수에 다룰 atom을 작성
  setter 혹은 updater 함수가 반환됨
  
  그래서 setTodoList()가 준비되었다 볼 수 있음 */
  const setTodoList = useSetRecoilState(todoListState);

  /* 아이템 생성 함수 */
  const addItem = () => {
    /* 준비된 setter, 파라미터는 현재 recoil state */
    setTodoList((oldTodoList) => [
      /* 스프레드로 현재 recoil state 보존 */
      ...oldTodoList,
      /* 객체 생성 */
      {
        /* id는 getId 함수 호출, 외부에서 import 했음 */
        id: getId(),
        /* text는 현 컴포넌트의 state */
        text: inputValue,
        /* isComplete: false 대입 */
        isComplete: false,
      },
    ]);
    /* 입력 값 초기화 */
    setInputValue("");
  };

  /* 간단히 연결할 onChange 메서드
  이벤트 -> 타겟 -> value 순으로 구조 분해 */
  const onChange = ({ target: { value } }) => {
    /* 입력 값 대입 */
    setInputValue(value);
  };

  /* 반환되는 컴포넌트 */
  return (
    <div>
      {/* 입력 값과 state 연결, onChange 이벤트와 함수 연결 */}
      <input type="text" value={inputValue} onChange={onChange} />
      {/* 버튼에 아이템 생성 함수 연결 */}
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
