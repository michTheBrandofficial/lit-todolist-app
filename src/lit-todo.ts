import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import 'lit-heroicon';

@customElement('lit-todos')
export class LitTodos extends TailwindElement() {
  render() {
    return html` <section></section> `;
  }
}
