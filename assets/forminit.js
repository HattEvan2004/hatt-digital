/* =====================================================================
   Forminit integration — shared by quote.html and contact.html.

   Any <form data-forminit> on the page is submitted to Forminit via
   JavaScript using FormData (so file uploads are sent as real files).
   Behaviour: client-side validation, optional total-upload size limit,
   disabled submit button while sending, success/error status messages,
   form reset on success, and optional package pre-selection.
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     >>> PASTE YOUR REAL FORMINIT FORM ID ON THE NEXT LINE <<<
     Replace 'YOUR_FORM_ID' with the Form ID from your Forminit
     dashboard. This is the ONLY place the Form ID lives — both the
     quote form and the contact form read it from here.
     =================================================================== */
  var FORMINIT_FORM_ID = 'wfjl4ah61iy';
  /* =================================================================== */

  /* Map ?package= URL value -> the visible package option value. */
  var PACKAGE_MAP = {
    starter: 'Starter Website',
    business: 'Business Website',
    growth: 'Growth Website'
  };

  function humanMB(bytes) { return (bytes / (1024 * 1024)).toFixed(1) + ' MB'; }

  /* Send the FormData to Forminit. Uses the CDN SDK when present
     (window.Forminit is a CLASS: new Forminit().submit(formId, formData)),
     and falls back to a direct POST to the same endpoint the SDK uses
     (https://forminit.com/f/{formId}) so a real submission still goes
     through if the SDK didn't load. */
  function sendToForminit(formData) {
    var FI = window.Forminit;
    if (typeof FI === 'function') {
      var client = new FI(); /* browser client → POSTs to /f/{formId} */
      return Promise.resolve(client.submit(FORMINIT_FORM_ID, formData)).then(function (res) {
        /* SDK resolves with { data, redirectUrl, error } — surface errors. */
        if (res && res.error) {
          throw new Error('SDK: ' + (res.error.message || res.error.error || res.error.code || 'rejected'));
        }
        return res;
      });
    }
    /* SDK didn't load — post straight to the endpoint the SDK uses. */
    return fetch('https://forminit.com/f/' + FORMINIT_FORM_ID, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(function (res) {
      if (!res.ok) {
        return res.text().catch(function () { return ''; }).then(function (body) {
          throw new Error('no-SDK HTTP ' + res.status + (body ? ' — ' + body.slice(0, 160) : ''));
        });
      }
      return res;
    });
  }

  function wire(form) {
    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    var fileInputs = form.querySelectorAll('input[type="file"]');
    var maxMB = parseFloat(form.getAttribute('data-forminit-max-mb'));
    var maxBytes = isNaN(maxMB) ? 0 : maxMB * 1024 * 1024;
    var hiddenPkg = form.querySelector('input[name="selected_package"]');
    var pkgSelect = form.querySelector('[data-package-select]');
    var okMsg = form.getAttribute('data-forminit-success') ||
      'Thanks! Your request is in — I’ll reply within one business day.';
    var errMsg = form.getAttribute('data-forminit-error') ||
      'Something went wrong sending your request. Please try again, or email hattdigitalns@gmail.com directly.';

    /* Accessible live status line. */
    var status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    form.appendChild(status);

    function setStatus(msg, kind) {
      status.textContent = msg;
      status.className = 'form-status' + (kind ? ' ' + kind : '');
    }

    /* ---- Package pre-selection + hidden-field sync (quote form only) ---- */
    function syncHiddenPackage() {
      if (hiddenPkg && pkgSelect) hiddenPkg.value = pkgSelect.value;
    }
    if (hiddenPkg && pkgSelect) {
      var raw = (new URLSearchParams(window.location.search).get('package') || '').trim().toLowerCase();
      if (raw && PACKAGE_MAP[raw]) pkgSelect.value = PACKAGE_MAP[raw];
      syncHiddenPackage();
      pkgSelect.addEventListener('change', syncHiddenPackage);
    }

    /* ---- Total upload-size check ---- */
    function totalFileBytes() {
      var total = 0;
      fileInputs.forEach(function (input) {
        if (input.files) {
          for (var i = 0; i < input.files.length; i++) total += input.files[i].size;
        }
      });
      return total;
    }
    function filesTooLarge() { return maxBytes > 0 && totalFileBytes() > maxBytes; }

    fileInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        if (filesTooLarge()) {
          setStatus('Your uploads total ' + humanMB(totalFileBytes()) + '. That’s over the ' +
            maxMB + ' MB limit — remove a file or paste a folder link instead.', 'err');
        } else if (status.classList.contains('err')) {
          setStatus('', '');
        }
      });
    });

    /* ---- Submit ---- */
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      syncHiddenPackage();

      /* Native constraint validation (required fields, email format, …). */
      var els = form.querySelectorAll('input, select, textarea');
      for (var i = 0; i < els.length; i++) {
        if (els[i].type === 'file') continue;
        if (!els[i].checkValidity()) {
          setStatus('Please check the highlighted field above.', 'err');
          els[i].reportValidity();
          els[i].focus();
          return;
        }
      }

      if (filesTooLarge()) {
        setStatus('Your uploads total ' + humanMB(totalFileBytes()) + '. Please keep them under ' +
          maxMB + ' MB — or paste a Drive/Dropbox link instead.', 'err');
        return;
      }

      if (FORMINIT_FORM_ID === 'YOUR_FORM_ID') {
        setStatus('This form isn’t connected yet — the Forminit Form ID still needs to be added.', 'err');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      setStatus('Sending your request…', '');

      sendToForminit(new FormData(form)).then(function () {
        setStatus(okMsg, 'ok');
        form.reset();
        syncHiddenPackage();
        if (submitBtn) submitBtn.disabled = false;
      }).catch(function (err) {
        if (window.console && err) console.error('Forminit submit failed:', err);
        /* Surface the real reason on-page so failures are diagnosable. */
        var detail = err && err.message ? ' [' + err.message + ']' : '';
        setStatus(errMsg + detail, 'err');
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  document.querySelectorAll('form[data-forminit]').forEach(wire);
})();
