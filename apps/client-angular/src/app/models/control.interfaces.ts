export type Value = number | string | boolean;

export interface Icon {
  src: string;
  cssClass: string;
}

export interface Item {
  id: string;
  name: string;
  icon?: Icon;
}

export interface ControlItem {
  value: Value;
  label: string;
  icon?: Icon;
}
