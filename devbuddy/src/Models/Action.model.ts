export default class Action<T, P> {
  constructor(public type: T, public payload?: P) {}
}
