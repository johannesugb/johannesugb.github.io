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
      loadGAonConsent();
      removeDisqusNotAvailableMessages();
      loadDisqusOnConsent();
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
    }
    if (!didConsent) {
      removeDisqusNotAvailableMessages();
      showDisqusNotAvailableMessage()
    }
  },
  onStatusChange: function(status, chosenBefore) {
    var type = this.options.type;
    var didConsent = this.hasConsented();
    if (type == 'opt-in' && didConsent) {
      // enable cookies
      loadGAonConsent();
      removeDisqusNotAvailableMessages();
      loadDisqusOnConsent();
    }
    if (type == 'opt-out' && !didConsent) {
      // disable cookies
    }
    if (!didConsent) {
      removeDisqusNotAvailableMessages();
      showDisqusNotAvailableMessage()
    }
  },
  onRevokeChoice: function() {
    var type = this.options.type;
    if (type == 'opt-in') {
      // disable cookies
    }
    if (type == 'opt-out') {
      // enable cookies
      loadGAonConsent();
      removeDisqusNotAvailableMessages();
      loadDisqusOnConsent();
    }
    if (!this.hasConsented()) {
      removeDisqusNotAvailableMessages();
      showDisqusNotAvailableMessage()
    }
  }
});
