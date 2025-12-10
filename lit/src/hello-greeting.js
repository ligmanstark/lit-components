import { css, html, LitElement } from 'lit';

const TAG_NAME = 'hello-greeting';

export class HelloGreeting extends LitElement {
  static properties = {
    name: { type: String },
    message: { type: String }
  };

  constructor() {
    super();
    this.name = 'World';
    this.message = 'Добро пожаловать!';
  }

  static styles = css`
    :host {
      display: inline-block;
      padding: 12px 16px;
      border-radius: 10px;
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      color: #1f2933;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      box-shadow: 0 8px 30px rgba(31, 41, 51, 0.1);
    }

    .name {
      font-weight: 700;
      color: #0f6bff;
    }

    .message {
      margin-top: 6px;
      color: #3a4a5a;
    }
  `;

  render() {
    return html`
      <div>
        Привет, <span class="name">${this.name}</span>!
        <div class="message">${this.message}</div>
      </div>
    `;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, HelloGreeting);
}

export const HELLO_GREETING_TAG = TAG_NAME;

