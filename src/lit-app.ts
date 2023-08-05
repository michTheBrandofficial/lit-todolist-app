import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-app')
export class LitApp extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property() name: string = 'Todolist App';

  render() {
    return html` <div>${this.name}</div> `;
  }
}
