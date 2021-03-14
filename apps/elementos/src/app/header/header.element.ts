import { css, customElement, html, LitElement, property } from 'lit-element';

declare var caliper;

@customElement('caliber-header')
export class CaliberHeaderElement extends LitElement {

  @property({ type : String }) host = 'https://mahr.io';

  static get styles() {
    return css`
  `;
  }

  render(){
    return html`
      <header class="navbar-light bg-light p-2">
        <div class="container">
          <div class="row">
            <div class="col mt-1">
              <a class="navbar-brand" href="#">
                mahr.io
              </a>
            </div>
            <div class="col-5">
            <input type="text" class="form-control form-control-lg" placeholder="Search...">
            </div>
            <div class="col mt-1">
              <ul class="nav float-right">
                <li class="nav-item">
                  <a class="nav-link" href="#">Sign In</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
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
