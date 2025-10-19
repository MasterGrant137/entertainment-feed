import { getApplePodcastElements } from "./functions.js";

class EmbedWidget extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <div id="view">
        <h1>This is entertainment.</h1>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['url'];
  }

  async connectedCallback() {
    const view = this.shadowRoot.getElementById('view');
    await this.populateView(view);
  }
  
  async populateView(view) {
    const applePodcastsContainer = await getApplePodcastElements(this.getAttribute('url'));
    view.appendChild(applePodcastsContainer);
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.log(name, oldValue, newValue, 'hit')
  // }

}

customElements.define('embed-widget', EmbedWidget);