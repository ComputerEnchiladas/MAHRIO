import { Response, NextFunction, Request } from 'express';
import packageFile from '../../../../../package.json';

export let init = (req: Request, res: Response, next: NextFunction) => {
    // Prepare the sso object
    let sdkScripts = `
      window.caliber = window.caliber || {};
      window.caliber.services = window.caliber.services || {};
      window.caliber.services.sso = window.caliber.services.sso || {};
      window.caliber.utils = window.caliber.utils || {};
      window.caliber.utils.logError = function(error) {
        if (window.console) {
          if (console.error) {
            console.error(error);
          } else {
            console.log(error);
          }
        }
      };
      window.caliber.utils.log = function(error) {
        if (window.console) {
          window.console.log && window.console.log(error);
        }
      };
      window.caliber.utils.logGroup = function(error) {
        if (window.console) {
          window.console.group && window.console.group(error);
        }
      };
      window.caliber.utils.logGroupEnd = function() {
        if (window.console) {
          window.console.groupEnd && window.console.groupEnd();
        }
      };
      // custom formatted logging method for errors.
      window.caliber.utils.formattedError = function(error, fontColor,fontSize) {
        if (window.console) {
          window.console.log && window.console.log("%c"+error, "color:"+fontColor+"; font-size:"+fontSize+"; font-weight: bold;  font-style: italic;");
        }
      };
    `;
  
    // If SSO, prepare the sso space in the caliper client scripts
    if (!!req['user']) {
      const escapedUserData = JSON.stringify({...req['user'] }).replace(/'/g, "\\'");
      sdkScripts += `window.caliber.services.sso.user = JSON.parse('${escapedUserData}');`;  // Leave one line break to avoid previous JS code breaking
    }

    // Return the bootstrapping js code
    const injectedJs = `
    (function(document, window) {
        // Prepare the sdk namespaces first, log functions
        ${sdkScripts}

        window.caliber.utils.logGroup('[Caliper: WebComponents]');
        window.caliber.utils.log('Loading Web Component polyfills if needed.');
        // First inject the wc polyfill loader
  
        window.caliber.utils.log('All Web Component features are now available.');
        window.caliber.utils.logGroupEnd();

        // Inject the components bundle when the features are ready
        const eb = document.createElement('script');
        eb.async = true;
        eb.defer = true;
        eb.src = 'http://127.0.0.1:8080/static/elementos/main.elementos.min.js?${packageFile.version}';

        // Trigger the caliper:loaded event after the script is loaded
        eb.onload = function() {
            window.caliber.loaded = true;
            document.dispatchEvent(new CustomEvent('caliber:loaded', {
              bubbles: false,
              composed: false }));
        };

        // Append the script to the head of the document
        document.querySelector('head').appendChild(eb);

        // Check if header,alert,footer,sdk,styles exist in the DOM, if not add them
        window.caliber.utils.logGroup('[Caliber: Bootstrap]');
        window.caliber.utils.log('Checking for required web components in the document.');

        window.addEventListener('DOMContentLoaded', (event) => {
          console.log('DOM fully loaded and parsed');
          const body = document.querySelector('body');

          if (!document.querySelector('caliber-styles')) {
              window.caliber.utils.log('<caliber-styles/> not found, adding to the document.');
              const caliberStyles = document.createElement('caliber-styles');
              body.appendChild(caliberStyles);
          }
          if (!document.querySelector('caliber-header')) {
              window.caliber.utils.log('<caliber-header/> not found, adding to the document.');
              const caliberHeader = document.createElement('caliber-header');
              body.insertBefore(caliberHeader, body.firstChild);
          }
          if (!document.querySelector('caliber-footer')) {
              window.caliber.utils.log('<caliber-footer/> not found, adding to the document.');
              const caliberFooter = document.createElement('caliber-footer');
              body.appendChild(caliberFooter);
          }

          window.caliber.utils.log('All required web components added to the document.');
          window.caliber.utils.logGroupEnd();
        });
    })(document, window);
    `;
  
    // Send the JS to the browser
    res.set('Content-Type', 'application/javascript');
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('Expires', '-1');
    res.set('Pragma', 'no-cache');
    res.send(injectedJs);
  };
  