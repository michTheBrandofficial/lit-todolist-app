import { html } from 'lit';
import 'lit-heroicon';
import { customElement } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import './lit-note';

@customElement('lit-notes')
export class LitNotes extends TailwindElement() {
  // user clicks on a note to edit it the form is shown here after the edit happens ,  then all the notes are shown again.
  render() {
    return html` <slot></slot> `;
  }
}
