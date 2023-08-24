import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import 'lit-heroicon';
import { pencilAlt } from 'lit-heroicon/solid';
import { clock } from 'lit-heroicon/outline';
import { type LitBody } from './lit-body';

@customElement('lit-note')
export class LitNote extends TailwindElement() {
  @property({ type: String }) class = '';
  @property({ attribute: false }) litBody: LitBody = this as unknown as LitBody;
  @property({ type: Array }) notesText: [string, string] | null = null;
  @property({ type: Number }) key = 0;

  showNotesFullscreen(e: LitMouseEvent<HTMLElement>) {
    const litBody = this.litBody;
    litBody.notesText = this.notesText;
    litBody.noteKey = this.key;
    litBody.fsNotes = true;
    setTimeout(() => {
      litBody.notesInputRef.value?.focus();
    }, 500);
  }

  render() {
    return html`
      <article
        @click="${this.showNotesFullscreen}"
        class="w-[250px] h-[300px] flex flex-col ${this
          .class} rounded-[16px] cursor-pointer px-6 py-8 "
      >
        <div
          class="flex text-[20px] font-light pb-2 mb-2 border-b-[1px] border-b-gray-500 justify-between items-center "
        >
          <h1>${this.notesText?.[0]}</h1>
          <lit-heroicon
            .path="${pencilAlt}"
            class="stroke-none fill-black "
          ></lit-heroicon>
        </div>
        <p class="text-[16px] text-gray-600 ">${this.notesText?.[1]}</p>
        <div
          class="mt-auto flex items-center text-[13px] text-gray-600 space-x-2"
        >
          <lit-heroicon
            .path="${clock}"
            class="stroke-gray-600 fill-none "
            .size="${22}"
          ></lit-heroicon>
          <p>10:20 PM Monday</p>
        </div>
      </article>
    `;
  }
}
