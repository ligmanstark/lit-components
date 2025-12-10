import { css, html, LitElement } from 'lit';

const TAG_NAME = 'lit-button';

export class LitButton extends LitElement {
  static properties = {
    label: { type: String },
    variant: { type: String },
    disabled: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.label = 'Click me';
    this.variant = 'primary';
    this.disabled = false;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.25s, background-color 0.25s, color 0.25s,
        box-shadow 0.25s;
    }

    button:focus-visible {
      outline: 3px solid rgba(67, 156, 255, 0.35);
      outline-offset: 2px;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      box-shadow: none;
    }

    .primary {
      background-color: #0f6bff;
      color: white;
      border-color: #0f6bff;
      box-shadow: 0 6px 20px rgba(15, 107, 255, 0.25);
    }

    .primary:hover:not(:disabled) {
      background-color: #0d60e6;
      border-color: #0d60e6;
    }

    .secondary {
      background-color: white;
      color: #0f6bff;
      border-color: #0f6bff;
    }

    .secondary:hover:not(:disabled) {
      background-color: #e8f1ff;
      border-color: #0d60e6;
      color: #0d60e6;
    }
  `;

  #onClick(event) {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('button-click', {
        detail: { sourceEvent: event },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const classes = this.variant === 'secondary' ? 'secondary' : 'primary';

    return html`
      <button
        class=${classes}
        ?disabled=${this.disabled}
        @click=${this.#onClick}
      >
        ${this.label}
      </button>
    `;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LitButton);
}

export const LIT_BUTTON_TAG = TAG_NAME;

