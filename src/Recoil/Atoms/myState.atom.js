/* atom에서 effects 정의 알아보기 */
import { atom } from "recoil";

const myState = atom({
  key: "MyKey",
  default: null,
  /* effects 키 작성 가능, 배열에 이펙트 함수를 대입함 */
  effects: [
    /* 이펙트 함수: ('파라미터') => { 이펙트 함수 }
    클린업 함수: return ('파라미터') => 클린업 함수 */
    () => {
      /* ...effect 1... */
      /* return () => ...cleanup effect 1...; */
    },
    /* 여러 개의 이펙트 함수를 정의 가능 */
    () => {
      /* ...effect 2... */
    },
  ],
});

export default myState;
