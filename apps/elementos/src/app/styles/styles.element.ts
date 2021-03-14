import { LitElement, html, customElement, css, property } from 'lit-element';
import { environment } from '../../environments/environment';

declare const VERSION: string;

@customElement('caliber-styles')
export class CaliberXDSElement extends LitElement {

  firstUpdated() {
    // Dispatch afterRender event
    this.dispatchEvent(new CustomEvent('afterRender', { bubbles: true, composed: true }));
    Promise.all([this.addStylesElement()]).then(() => this.loaded());
  }

  loaded() {
    // Dispatch loaded event from inside a method after loading a script inside a custom component, Magical!!
    this.dispatchEvent(new CustomEvent('loaded', { bubbles: true, composed: true }));
  };

  addStylesElement() {
    // Create a <style></style> tag
    const globalStyles = document.createElement('link');
    globalStyles.dataset['globalStyles'] = 'true'; // Add a data attr to check if the script has been added b4

    // Point to the static route until we can replace with CDN
    globalStyles.rel = 'stylesheet';
    globalStyles.type = 'text/css';
    globalStyles.href = `https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css`;

    // Only add the script if it hasn't been added yet
    if (!this.exists('link', 'data-global-styles')) {
      document.querySelector('head').appendChild(globalStyles);
    }

    return new Promise((res) => globalStyles.onload = () => res());
  }

  private exists(element, key): boolean {
    // check if the script has been added to the DOM already
    return !!document.querySelector(`${element}[${key}=\'true\']`);
  }

  render(){
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();

    // Dispatch beforeRender event
    this.dispatchEvent(new CustomEvent('beforeRender', { bubbles: true, composed: true }));
  }
}
