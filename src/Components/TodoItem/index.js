/* recoil state 다루는 hook */
import { useRecoilState } from "recoil";
/* 생성한 atom */
import { todoListState } from "../../Recoil/Atoms/todoListState.atom";

/* 각각의 TodoItem 컴포넌트
파라미터로 item을 가짐, 구조 분해 해서 다루기 */
function TodoItem({ item }) {
  /* useRecoilState hook 호출하고 인수로 다루고자 하는 atom 지정
  recoil 초기 state와 setter/updater 함수 반환받음 */
  const [todoList, setTodoList] = useRecoilState(todoListState);
  /* findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다.
  만족하는 요소가 없으면 -1을 반환합니다.

  todoList의 index 찾고 반환하여 다룸
  
  listItem === item으로 일치하는 첫 번째 요소의 인덱스가 반환됨 */
  const index = todoList.findIndex((listItem) => listItem === item);

  /* ItemText 편집 메서드
  파라미터는 이벤트 -> 타겟 -> 값 순으로 구조 분해됨 */
  const editItemText = ({ target: { value } }) => {
    /* 인덱스에 아이템 재배치 함수로 연결, 새로운 리스트 반환 */
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 항목 완료 전환 메서드 */
  const toggleItemCompletion = () => {
    /* 인덱스에 아이템 재배치 함수로 연결, 새로운 리스트 반환 */
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 항목 삭제 메서드 */
  const deleteItem = () => {
    /* 인덱스로 아이템 삭제 함수 연결, 새로운 리스트 반환 */
    const newList = removeItemAtIndex(todoList, index);

    /* recoil setter 사용하여 업데이트 */
    setTodoList(newList);
  };

  /* 반환되는 컴포넌트 */
  return (
    <div>
      {/* 입력 값은 item.text, onChange 이벤트와 editItemText 메서드 연결 */}
      <input type="text" value={item.text} onChange={editItemText} />
      {/* item.isComplete가 체크 값, onChange 이벤트와 toggleItemCompletion 메서드 연결 */}
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      {/* onClick 이벤트와 deleteItem 메서드 연결 */}
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

export default TodoItem;

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
