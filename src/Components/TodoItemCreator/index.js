import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";
import { getId } from "../../Utils/getId";

/* TodoItemCreator 컴포넌트 */
const TodoItemCreator = () => {
  /* 문자열 state */
  const [inputValue, setInputValue] = useState("");
  /* todoListState를 다루는 setTodoList
   */
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;
