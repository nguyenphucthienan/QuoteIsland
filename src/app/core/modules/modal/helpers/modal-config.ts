export class ModalConfig<T = any> {
  inputs?: T;
  outputs?: T;
  childComponent?: {
    inputs?: T;
    outputs?: T;
  };
}
