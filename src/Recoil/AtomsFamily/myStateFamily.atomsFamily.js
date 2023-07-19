/* atomFamily에서 effects 살펴보기 */
import { atomFamily } from "recoil";

const myStateFamily = atomFamily({
  key: "MyKey",
  default: null,
  /* effects 키 선언, 파라미터를 넘길 수 있으며 배열 작성 가능 */
  effects: (param) => [
    /* 이펙트 함수: ('파라미터') => { 이펙트 함수 }
    클린업 함수: return ('파라미터') => 클린업 함수 */
    () => {
      /* ...effect 1 using param... */
      /* return () => ...cleanup effect 1...; */
    },
    /* 여러 개의 이펙트 함수를 정의 가능 */
    () => {
      /* ...effect 2 using param... */
    },
  ],
});

/* effects 키 구조는 atom == atomFamily
파라미터 전달 및 사용 유무가 다르며 함수 구조는 유사함 */

export default myStateFamily;
