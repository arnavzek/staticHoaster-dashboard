import { LitElement, html, css } from "lit-element";

//load script

class backendEditor extends LitElement {
  static get properties() {
    return {
      backendCode: String,
      appName: String,
      loading: Boolean,
    };
  }

  constructor() {
    super();

    this.updatebackendCode = this.updatebackendCode.bind(this);
  }

  firstUpdated() {
    this.U = global.uponJS_instance[this.appName];
    this.backendCode = this.U.configuration.backendCode;
  }

  static get styles() {
    return css`
      textarea {
        width: 100%;
        border-radius: 10px;
        background: #fff;
        resize: none;
        box-sizing: border-box;
        background-color: rgb(0 0 0 / 8%);
        height: 60vh;
        border: none;
        margin: 30px 0;
        outline: none;
        padding: 20px;
      }

      button {
        padding: 10px 30px;
        border: none;
        background: #222;
        color: #fff;
        border-radius: 50px;
        font-weight: 500;
      }
    `;
  }

  updatebackendCode(event) {
    this.backendCode = event.target.value;
    console.log(this.backendCode);
  }

  saveBackendCode({ target }) {
    let U = global.uponJS_instance[this.appName];
    U.configuration.backendCode = this.backendCode;

    let loading = U.say("Updating Backend...");

    U.query({ $hostBackend: U.configuration }).then(() => {
      loading.kill();
      U.say("Backend Updated 😊");
    });
  }

  render() {
    return html`
      <textarea @keyup=${this.updatebackendCode.bind(this)} id="textEditor">
${this.backendCode}</textarea
      >

      <button @click="${this.saveBackendCode.bind(this)}">Save</button>
    `;
  }
}

customElements.define("backend-editor", backendEditor);