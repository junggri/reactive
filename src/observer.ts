let callback;

export function observe(_callback: () => void) {
  callback = _callback
  callback()
}

export function observer(obj: { [key: string]: any }) {
  //Object.defineProperty
  //객체의 속성을 조금 더 자유롭게 설정할 수 있다
  Object.keys(obj).forEach((key) => {
    let value = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        return value
      },
      set(_value) {
        if (!checkIsSame(value, _value)) {
          value = _value;
          observe(callback)
        }
      }
    })

  })

  return obj
}

//얕은 복사는 참조값이 복사되는거 //깊은복사는 참조값이 모두 끊어지고 값이 복시되는 것
function checkIsSame(previous, current): boolean {
  if (previous instanceof Object && current instanceof Object) {
    if (previous instanceof Array && current instanceof Array) {

    } else {

    }

  } else {
    return previous === current
  }
}


function arrayShallowCompare() {

}
