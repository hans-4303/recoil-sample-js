import { useMemo } from "react";
import { useRecoilCallback, useRecoilSnapshot } from "recoil";

/* 에러를 토대로 쿼리들을 찾아 재시도하는 컴포넌트 */
function QueryErrorMessage({ error }) {
  /* useRecoilSnapshot
  현재 Recoil 상태의 스냅샷을 반환하고 상태가 업데이트될 때 다시 렌더링할 구성 요소를 구독합니다. */
  const snapshot = useRecoilSnapshot();
  /* ret 배열 다루는 useMemo */
  const selectors = useMemo(() => {
    const ret = [];
    /* snapshot.getNodes_UNSTABLE({ isInitialized: true })의 타입이 무엇인지 모르겠지만 반복 가능한 데이터
    해당 데이터 속 요소를 node라고 이름 붙임 */
    for (const node of snapshot.getNodes_UNSTABLE({ isInitialized: true })) {
      /* snapshot.getInfo_UNSTABLE(node)에서 구조분해 */
      const { loadable, type } = snapshot.getInfo_UNSTABLE(node);
      /* loadable이 null이 아니며, loadable.state가 "hasError"이고 loadable.contents가 파라미터로 받은 error와 같다면 */
      if (
        loadable != null &&
        loadable.state === "hasError" &&
        loadable.contents === error
      ) {
        /* ret 배열에 해당 node 대입하고 ret 배열 변화
        이 배열은 다른 컴포넌트에서 참조하지 않기 때문에 불변성 챙기지 않은 것으로 보임 */
        ret.push(node);
      }
    }
    /* snapshot, error 동작 의존성 */
  }, [snapshot, error]);
  /* useRecoilCallback 호출, 파라미터에서 refresh 분해 */
  const retry = useRecoilCallback(
    ({ refresh }) =>
      () =>
        /* selectors를 순회하고 refresh 파라미터 대입
        Q. selectors가 순회할 수 있는 어떤 데이터가 아닐텐데? 리턴 없는 void이기 때문에
        ret.push를 통해 selectors 자체가 배열이 될 수 있나? */
        selectors.forEach(refresh),
    [selectors]
  );

  /* 반환되는 컴포넌트 */
  return (
    /* selectors 길이가 0일 때만 렌더링 */
    selectors.length > 0 && (
      <div>
        {/* 파라미터 error를 문자열로 */}
        Error: {error.toString()}
        {/* 쿼리는 selectors[0] 접근, key까지 접근 */}
        Query: {selectors[0].key}
        {/* 클릭하면 retry 메서드 호출 */}
        <button onClick={retry}>Retry</button>
      </div>
    )
  );
}

export default QueryErrorMessage;
