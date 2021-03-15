window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#000"
    },
    "button": {
      "background": "#f71559"
    }
  },
  "theme": "classic",
  "type": "opt-in",
  onInitialise: function (status) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      if (typeof loadGAonConsent === "function")                  { loadGAonConsent(); }
      if (typeof removeDisqusNotAvailableMessages === "function") { removeDisqusNotAvailableMessages();
      if (typeof loadDisqusOnConsent === "function")              { loadDisqusOnConsent(); }
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
    }
  },
  onStatusChange: function(status, chosenBefore) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      if (typeof loadGAonConsent === "function")                  { loadGAonConsent(); }
      if (typeof removeDisqusNotAvailableMessages === "function") { removeDisqusNotAvailableMessages();
      if (typeof loadDisqusOnConsent === "function")              { loadDisqusOnConsent(); }
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
    }
  },
  onRevokeChoice: function() {
    var type = this.options.type;
    if (type == 'opt-in') {
      // disable cookies
    }
    if (type == 'opt-out') {
      // enable cookies
      if (typeof loadGAonConsent === "function")                  { loadGAonConsent(); }
      if (typeof removeDisqusNotAvailableMessages === "function") { removeDisqusNotAvailableMessages();
      if (typeof loadDisqusOnConsent === "function")              { loadDisqusOnConsent(); }
    }
  }
});
