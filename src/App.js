import { useRecoilValue } from "recoil";
import { todoListState } from "./Recoil/Atoms/todoListState.atom";

import TodoItemCreator from "./Components/TodoItemCreator";
import TodoItem from "./Components/TodoItem";

function App() {
  /* useRecoilValue
  원자 또는 선택기(읽기 전용 또는 쓰기 가능)의 값을 반환하고
  구성 요소를 해당 상태의 향후 업데이트에 구독합니다. */
  const todoList = useRecoilValue(todoListState);

  /* 반환되는 컴포넌트 */
  return (
    <div className="App">
      {/* TodoItemCreator 컴포넌트 반환, 작성과 업데이트 가능 */}
      <TodoItemCreator />

      {/* todoList 배열 순회하면서 TodoItem 컴포넌트 호출,
      별도의 조건부 렌더링 없어도 됐는데 */}
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
}

export default App;
