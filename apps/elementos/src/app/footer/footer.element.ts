import { css, customElement, html, LitElement, property } from 'lit-element';

declare var caliper;

@customElement('caliber-footer')
export class CaliberHeaderElement extends LitElement {

  @property({ type : String }) host = '/';

  static get styles() {
    return css`
  `;
  }

  render(){
    return html`
    <footer class="navbar-light bg-light p-2">
      <div class="container">
        <div class="row">
          <div class="col mt-1">
          
          </div>
          <div class="col-5 text-center">
          &copy; 2020
          </div>
          <div class="col mt-1">
            
          </div>
        </div>
      </div>
    </footer>
    `;
  }

  firstUpdated() {
    // Dispatch afterRender event
    this.dispatchEvent(new CustomEvent('afterRender', { bubbles: true, composed: true }));
  }

  connectedCallback() {
    super.connectedCallback();

    // Dispatch beforeRender event
    this.dispatchEvent(new CustomEvent('beforeRender', { bubbles: true, composed: true }));
  }
  createRenderRoot() {
    return this;
  }
}
