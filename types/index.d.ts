import { LitElement } from 'lit';
import { Property } from '../Nixix/node_modules/csstype';
import { Ref } from 'lit/directives/ref';
import { arrowCircleDown } from 'lit-heroicon/outline';

export {};

declare global {
  type OmittedEventProps = 'currentTarget' | 'srcElement' | 'target';

  type Prettify<T> = {
    [key in keyof T]: T[key];
  };

  type BaseSyntheticEvent = Omit<Event, OmittedEventProps>;

  type SyntheticEvent<T> = Prettify<BaseSyntheticEvent> & {
    [name in OmittedEventProps]: T;
  };

  interface LitMouseEvent<T extends Element>
    extends SyntheticEvent<T>,
      MouseEvent {}

  interface LitSubmitEvent<T extends Element>
    extends SyntheticEvent<T>,
      SubmitEvent {}

  interface LitFocusEvent<T extends Element>
    extends SyntheticEvent<T>,
      FocusEvent {}

  interface LitKeyboardEvent<T extends Element>
    extends SyntheticEvent<T>,
      KeyboardEvent {}

  interface LitAnimationEvent<T extends Element>
    extends SyntheticEvent<T>,
      AnimationEvent {}

  interface LitClipboardEvent<T extends Element>
    extends SyntheticEvent<T>,
      ClipboardEvent {}

  interface LitDragEvent<T extends Element>
    extends SyntheticEvent<T>,
      DragEvent {}

  interface LitHashChangeEvent<T extends Element>
    extends SyntheticEvent<T>,
      HashChangeEvent {}

  interface LitInputEvent<T extends Element>
    extends SyntheticEvent<T>,
      InputEvent {}

  interface LitPageTransitionEvent<T extends Element>
    extends SyntheticEvent<T>,
      PageTransitionEvent {}

  interface LitPopStateEvent<T extends Element>
    extends SyntheticEvent<T>,
      PopStateEvent {}

  interface LitStorageEvent<T extends Element>
    extends SyntheticEvent<T>,
      StorageEvent {}

  interface LitTouchEvent<T extends Element>
    extends SyntheticEvent<T>,
      TouchEvent {}

  interface LitUIEvent<T extends Element> extends SyntheticEvent<T>, UIEvent {}

  interface LitTransitionEvent<T extends Element>
    extends SyntheticEvent<T>,
      TransitionEvent {}

  interface LitWheelEvent<T extends Element>
    extends SyntheticEvent<T>,
      WheelEvent {}

  interface LitProgressEvent<T extends Element>
    extends SyntheticEvent<T>,
      ProgressEvent {}

  type Fill = Property.Fill;
  type Stroke = Property.Stroke;

  interface BodyElement extends LitElement {
    todos?: Array<string>;
    display?: boolean;
    inputRef?: Ref<HTMLInputElement>;
  }
}
