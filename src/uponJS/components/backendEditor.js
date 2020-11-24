import { LitElement, html, css, customElement, property } from "lit-element";

//load script

class backendEditor extends LitElement {
  static get properties() {
    return {
      backendCode: String,
      loading: Boolean,
    };
  }

  constructor() {
    super();

    this.updatebackendCode = this.updatebackendCode.bind(this);
    console.log(window.U.configuration.backendCode);
    this.backendCode = window.U.configuration.backendCode;
  }

  static get styles() {
    return css`
      textarea {
        width: 100%;
        border-radius: 10px;
        background: #fff;
        resize: none;
        box-sizing: border-box;
        height: 60vh;
        bornder: none;
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

  configureVariables() {
    if (window.U.db) transformTypes(window.U.db);

    window.U.configuration.db = window.U.db;
    window.U.configuration.cloudFunctions = window.U.cloudFunctions;
    window.U.configuration.bucket = window.U.bucket;

    for (let key in window.U.cloudFunctions) {
      window.U.cloudFunctions[key] = window.U.cloudFunctions[key].toString();
    }

    function transformTypes(obj) {
      let blackListFunctions = [String, Number, Array, Object, Date, Object];

      for (let key in obj) {
        if (typeof obj[key] === "object") {
          transformTypes(obj[key]);
          continue;
        } else if (typeof obj[key] === "function") {
          if (blackListFunctions.includes(obj[key]) == false)
            obj[key] = { $executeJS: { code: obj[key].toString() } };
        }

        switch (obj[key]) {
          case String:
            obj[key] = "string";
            break;
          case Array:
            obj[key] = "array";
            break;
          case Number:
            obj[key] = "number";
            break;
          case Boolean:
            obj[key] = "boolean";
            break;
          case Date:
            obj[key] = "date";
            break;
          case Object:
            obj[key] = "object";
            break;
        }
      }
    }
  }

  saveBackendCode({ target }) {
    window.U.configuration.backendCode = this.backendCode;
    let script = document.createElement("script");
    script.innerHTML = this.backendCode;
    document.body.appendChild(script);
    let loading = window.U.loading("Updating Backend");
    this.configureVariables();
    window.U.query({ $hostBackend: window.U.configuration }).then(() => {
      loading.kill();
      window.U.say("Backend Updated 😊");
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
