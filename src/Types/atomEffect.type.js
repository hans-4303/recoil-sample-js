type AtomEffect<T> = ({
  /* A reference to the atom itself:
  atom 스스로에서 값을 참조함 */
  node: RecoilState<T>, 
  /* ID for the <RecoilRoot> or Snapshot store associated with this effect:
  이 Effect와 연결된 <RecoilRoot> 또는 스냅샷 저장소의 ID */
  storeID: StoreID, 
  /* The action which triggered initialization of the atom:
  원자의 초기화를 트리거한 작업 */
  trigger: 'get' | 'set',

  /* Callbacks to set or reset the value of the atom:
  원자의 값을 설정하거나 재설정하는 콜백
  
  This can be called from the atom effect function directly to initialize the
  initial value of the atom, or asynchronously called later to change it:
  이는 atom effect 함수에서 직접 호출하여 원자의 초기 값을 초기화하거나
  나중에 비동기적으로 호출하여 변경할 수 있습니다. */

  setSelf: (
    | T
    | DefaultValue
    /* Only allowed for initialization at this time: 지금은 초기화에만 허용됩니다 */
    | Promise<T | DefaultValue> 
    | ((T | DefaultValue) => T | DefaultValue),
  ) => void,
  resetSelf: () => void,

  /* Subscribe to changes in the atom value:
  원자 값의 변경 내용을 구독합니다.

  The callback is not called due to changes from this effect's own setSelf():
  이 효과의 자체 setSelf()의 변경으로 인해 콜백이 호출되지 않습니다. */
  onSet: (
    (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void,
  ) => void,

  /* Callbacks to read other atoms/selectors:
  다른 원자/선택기를 읽기 위한 콜백 */
  getPromise: <S>(RecoilValue<S>) => Promise<S>,
  getLoadable: <S>(RecoilValue<S>) => Loadable<S>,
  /* Optionally return a cleanup handler:
  선택적으로 정리 핸들러를 반환합니다 */
  getInfo_UNSTABLE: <S>(RecoilValue<S>) => RecoilValueInfo<S>,
}) => void | () => void; 