import { LitElement, html, css } from "lit-element";

//load script

class uploadHostFiles extends LitElement {
  static get properties() {
    return {
      files: Object,
      appName: String,
      publish: Function,
    };
  }

  constructor() {
    super();
    this.uploadFolder = this.uploadFolder.bind(this);
    this.renderAndUpload = this.renderAndUpload.bind(this);
    this.files = {};
  }

  renderAndUpload(file, fileName) {
    if (!fileName) fileName = file.name;

    this.files = {
      ...this.files,
      [fileName]: { file: file, uploadStatus: false },
    };
    this.uploadHostFiles(file, fileName).then(() => {
      this.files = {
        ...this.files,
        [fileName]: { file: file, uploadStatus: true },
      };
    });
  }

  firstUpdated() {
    this.U = global.uponJS_instance[this.appName];
  }

  upload(event, fileName) {
    let files = event.target.files;

    for (let file of files) {
      this.renderAndUpload(file, fileName);
    }
  }

  uploadIndexFile(event) {
    this.upload(event, "index.html");
  }

  static get styles() {
    return css`
      h3 {
        flex: 1;
        text-align: center;
      }

      .buttons {
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        grid-gap: 20px;
        justify-content: flex-end;
      }

      input[type="file"] {
        display: none;
      }

      .custom-file-upload,
      a {
        text-decoration: none;
        font-size: 12px;
        transition: All ease-in 0.25s;
        width: auto;
        background: #000000;
        padding: 15px 35px;
        color: #fff !important;
        font-weight: 100 !important;
        cursor: pointer;
        border: none;
        margin: 0;
        border-radius: 400px;
      }

      .file {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 25px;
        font-weight: 100;
        margin: 30px 0px;
      }
    `;
  }

  //to do
  //upload folder and update name according to the folder name
  // show uploading and uploaded status
  //get an svg we can add whereever we want

  uploadHostFiles = async (file, fileName) => {
    //if folder is selected then add directory
    return await this.U.utility.upload(file, "hostingUpload", fileName); //upload and get the new link, newAttributes.href so that it can be overridden
  };

  returnItems() {
    let toReturn = [];

    for (let fileName in this.files) {
      let item = this.files[fileName];
      toReturn.push(html` <div class="file">
        <span class="name">${fileName}</span>
        <span class="status"
          >${item.uploadStatus ? "✓" : html`<loading-arc-svg />`}
        </span>
      </div>`);
    }

    return toReturn;
  }

  uploadFolder(event) {
    let files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      this.renderAndUpload(files[i], files[i].webkitRelativePath);
    }
  }

  uploadMainDirectory(event) {
    let files = event.target.files;

    function changeRelativePath(path) {
      let dirSplit = path.split("/");
      dirSplit.shift();
      return dirSplit.join("/");
    }

    for (let i = 0; i < files.length; i++) {
      this.renderAndUpload(
        files[i],
        changeRelativePath(files[i].webkitRelativePath)
      );
    }
  }

  render() {
    let U = global.uponJS_instance[this.appName];
    return html`
      <div>
        <div id="files">${this.returnItems()}</div>
        <div class="buttons">
          <label class="custom-file-upload">
            <input
              multiple
              type="file"
              class="custom-file-input"
              @change="${this.upload}"
            />
            + Files
          </label>

          <label class="custom-file-upload">
            <input
              multiple
              webkitdirectory
              type="file"
              class="custom-file-input"
              @change="${this.uploadFolder}"
            />
            + Folders
          </label>

          <label class="custom-file-upload">
            <input
              multiple
              type="file"
              class="custom-file-input"
              @change="${this.uploadIndexFile}"
            />
            + Index File
          </label>

          <label class="custom-file-upload">
            <input
              multiple
              webkitdirectory
              type="file"
              class="custom-file-input"
              @change="${this.uploadMainDirectory}"
            />
            + Main Directory
          </label>

          <a
            style="    
              font-weight: 900;
              color: #000;"
            href="${U.info.serverUrl}"
            target="_blank"
          >
            Visit App
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define("upload-host-files", uploadHostFiles);

class loadingArcSVG extends LitElement {
  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; background: transparent; display: block; shape-rendering: auto;"
      width="50px"
      height="50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect
          x="32"
          y="29.5"
          rx="18"
          ry="0.5"
          width="36"
          height="1"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect
          x="32"
          y="29.5"
          rx="18"
          ry="0.5"
          width="36"
          height="1"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect
          x="32"
          y="29.5"
          rx="18"
          ry="0.5"
          width="36"
          height="1"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <!-- [ldio] generated by https://loading.io/ -->
    </svg>`;
  }
}

customElements.define("loading-arc-svg", loadingArcSVG);

class loadingSVG extends LitElement {
  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; background: transparent; display: block; shape-rendering: auto;"
      width="50px"
      height="50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9876543209876543s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(4.444444444444445 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9753086419753086s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(8.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9629629629629629s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(13.333333333333334 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9506172839506173s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(17.77777777777778 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9382716049382716s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(22.22222222222222 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9259259259259259s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(26.666666666666668 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9135802469135802s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(31.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9012345679012346s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(35.55555555555556 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8888888888888888s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(40 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8765432098765432s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(44.44444444444444 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8641975308641975s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(48.888888888888886 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8518518518518519s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(53.333333333333336 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8395061728395061s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(57.77777777777778 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8271604938271605s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(62.22222222222222 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8148148148148148s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(66.66666666666667 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8024691358024691s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(71.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7901234567901234s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(75.55555555555556 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7777777777777778s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(80 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7654320987654321s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(84.44444444444444 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7530864197530864s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(88.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7407407407407407s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(93.33333333333333 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7283950617283951s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(97.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7160493827160493s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(102.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7037037037037037s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(106.66666666666667 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.691358024691358s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(111.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6790123456790124s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(115.55555555555556 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(120 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.654320987654321s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(124.44444444444444 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6419753086419753s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(128.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6296296296296297s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(133.33333333333334 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6172839506172839s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(137.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6049382716049383s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(142.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5925925925925926s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(146.66666666666666 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5802469135802469s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(151.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5679012345679012s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(155.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5555555555555556s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(160 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5432098765432098s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(164.44444444444446 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5308641975308642s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(168.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5185185185185185s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(173.33333333333334 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5061728395061729s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(177.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.49382716049382713s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(182.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.48148148148148145s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(186.66666666666666 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4691358024691358s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(191.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4567901234567901s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(195.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4444444444444444s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(200 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.43209876543209874s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(204.44444444444446 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.41975308641975306s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(208.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4074074074074074s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(213.33333333333334 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3950617283950617s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(217.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.38271604938271603s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(222.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.37037037037037035s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(226.66666666666666 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.35802469135802467s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(231.11111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.345679012345679s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(235.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(240 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.32098765432098764s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(244.44444444444446 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.30864197530864196s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(248.88888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2962962962962963s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(253.33333333333334 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2839506172839506s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(257.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2716049382716049s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(262.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.25925925925925924s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(266.6666666666667 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.24691358024691357s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(271.1111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2345679012345679s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(275.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2222222222222222s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(280 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.20987654320987653s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(284.44444444444446 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.19753086419753085s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(288.8888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.18518518518518517s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(293.3333333333333 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.1728395061728395s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(297.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.16049382716049382s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(302.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.14814814814814814s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(306.6666666666667 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.13580246913580246s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(311.1111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.12345679012345678s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(315.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.1111111111111111s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(320 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.09876543209876543s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(324.44444444444446 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.08641975308641975s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(328.8888888888889 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.07407407407407407s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(333.3333333333333 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.06172839506172839s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(337.77777777777777 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.04938271604938271s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(342.22222222222223 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.037037037037037035s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(346.6666666666667 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.024691358024691357s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(351.1111111111111 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.012345679012345678s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(355.55555555555554 50 50)">
        <rect
          x="43.5"
          y="29"
          rx="6.5"
          ry="5"
          width="13"
          height="10"
          fill="#0a0a0a"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <!-- [ldio] generated by https://loading.io/ -->
    </svg>`;
  }
}
customElements.define("loading-svg", loadingSVG);
