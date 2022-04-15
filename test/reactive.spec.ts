import {describe, expect, it, test} from "@jest/globals";
import {observe, observer} from "../src/observer";

const sleep = () => new Promise((res, rej) => {
  const timer = setTimeout(() => {
    res(timer)
  }, 1000 / 60)
})

function sum(a: number, b: number): number {
  return a + b
}

describe("변경되는 값을 관창합니다.", () => {

  it.skip("초기값을 확인합니다", async () => {
    const state = observer({a: 1, b: 2})
    let computed = undefined

    const common = () => {
      computed = state.a + state.b
    }

    observe(common)//이 함수를 옵저빙한다

    expect(computed).toBe(3)

    state.a = 10
    expect(computed).toBe(12)

  })

  it("같은 값이 들어오면 실행하지 않습니다", () => {
    const state = observer({a: 1, b: 2})

    let computed = undefined
    let callCount = 0;

    const common = () => {
      computed = state.a + state.b
      callCount++
    }

    observe(common)

    expect(computed).toBe(3);
    expect(callCount).toBe(1)

    state.a = 10;

    expect(computed).toBe(12);
    expect(callCount).toBe(2)

    state.b = 20;

    expect(computed).toBe(30);
    expect(callCount).toBe(3)

    state.a = 10;

    expect(computed).toBe(30);
    expect(callCount).toBe(3)
  })

});
