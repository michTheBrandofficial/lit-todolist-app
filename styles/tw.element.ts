import { type CSSResult, LitElement, unsafeCSS, CSSResultGroup } from 'lit';

import style from './global.css';

const tailwindElement = unsafeCSS(style);

const TailwindElement = (style?: CSSResult | '') =>
  class extends LitElement {
    static styles?: CSSResultGroup | undefined = [
      tailwindElement,
      unsafeCSS(style),
    ];
  };

export default TailwindElement;
