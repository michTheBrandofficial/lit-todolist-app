import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Property } from '../../Nixix/node_modules/csstype';

type HeroIconPath = {
  path?: TemplateResult<2>;
  outline?: boolean;
};

@customElement('lit-heroicon')
class LitHeroIcon extends LitElement {
  @property({ type: Object }) path: HeroIconPath = {};
  @property({ type: Object }) props: {
    fill?: Property.Fill;
    stroke?: Property.Stroke;
  } = {};
  @property({ type: Number }) size: number = 24;
  @property({ type: String }) class: string = '';

  render() {
    const obj: { fill?: string; stroke?: string } = {};
    if (this.path.outline) {
      if (this.props.stroke) obj.stroke = this.props.stroke;
      obj.fill = this.props.fill;
    } else {
      if (this.props.fill) obj.fill = this.props.fill;
      obj.stroke = this.props.stroke;
    }

    this.style.height = `${this.size}px`;
    this.style.display = 'block';

    return html`
      <svg
        width="${this.size}"
        height="${this.size}"
        viewBox="0 0 24 24"
        fill="${obj.fill}"
        stroke="${obj.stroke}"
      >
        ${this.path.path}
      </svg>
    `;
  }
}

export default LitHeroIcon;
