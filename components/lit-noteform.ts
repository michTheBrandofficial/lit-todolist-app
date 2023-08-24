import { useStorage } from '@/lib';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import TailwindElement from 'styles/tw.element';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { type LitBody } from '~/lit-body';

@customElement('lit-noteform')
export class LitNoteForm extends TailwindElement() {
  getNotes = useStorage<FormDataEntryValue[][]>('notes')[0];
  setNotes = useStorage<FormDataEntryValue[][]>('notes')[1];

  // this is the text form the note
  @property({ attribute: false }) noteText: [string, string] | null = null;
  @property({ attribute: false }) inputRef: Ref<HTMLInputElement> = createRef();
  @property({ attribute: false }) litBody: LitBody = this as unknown as LitBody;
  @property() beforeSubmit: () => number | null = () => null;

  updateIndexOfNote(
    noteArray: FormDataEntryValue[][],
    index: number,
    newValue: [FormDataEntryValue, FormDataEntryValue]
  ) {
    const updatedNoteArray = noteArray.filter((_, i) => {
      return i !== index;
    });
    updatedNoteArray.unshift(newValue);
    return updatedNoteArray;
  }

  submitNote(e: LitSubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // get the form data
    const formData = new FormData(e.currentTarget);
    const noteArray: [FormDataEntryValue, FormDataEntryValue] = [
      formData.get('Title') || '',
      formData.get('Main-note') || '',
    ];
    // if there are notes ,  add them to the array in localStorage , else set the localStorage to an array containing data array.
    if (!this.getNotes()) this.setNotes([noteArray]);
    else {
      // get the index of the note to update if there is any
      const index = this.beforeSubmit();
      const updatedNoteArray =
        index !== null
          ? this.updateIndexOfNote(this.getNotes() || [[]], index, noteArray)
          : [noteArray, ...(this.getNotes() as FormDataEntryValue[][])];
      this.setNotes(updatedNoteArray);
    }
    this.litBody.noteKey = null;
    this.litBody.fsNotes = false;
  }

  render() {
    this.style.width = '100%';
    // form for taking in input for the notes screen.
    return html`
      <form
        @submit="${this.submitNote}"
        class="w-full h-full p-10 pt-0 rounded-[32px] flex gap-5  flex-col content-between items-center  "
      >
        <!-- Title -->
        <input
          type="text"
          name="Title"
          ${ref(this.inputRef)}
          .value="${this.noteText?.[0] || ''}"
          class="w-full h-[20%] max-h-[100px] border-none focus:outline-none text-[25px] font-light "
          placeholder="Title..."
        />
        <!-- Main note -->
        <textarea
          name="Main-note"
          .value="${this.noteText?.[1] || ''}"
          class="w-full h-4/5 border-none focus:outline-none   text-[15px] font-light   "
          placeholder="Write a note..."
        ></textarea>
      </form>
    `;
  }
}
