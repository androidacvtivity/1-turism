function watchLiveToggle_CAP2_R_CC() {
  const validCodes = jQuery('select.select-country option')
    .map(function () { return this.value; })
    .get()
    .filter(v => v !== "");

  jQuery('input.input-country').each(function () {
    const $input = jQuery(this);

    const toggleValidation = function () {
      const code = $input.val().trim();
      const $row = $input.closest('tr');
      let $msg = $row.find('.country-error-msg');

      $input.removeClass('invalid-country');
      if ($msg.length) $msg.remove();

      if (code === "") return;

      if (!validCodes.includes(code)) {
        $input.addClass('invalid-country');
        $msg = jQuery('<div class="country-error-msg" style="color:red; font-size:12px;">Codul țării nu este valid</div>');
        $input.closest('td').append($msg);
      }
    };

    // rulăm inițial
    toggleValidation();

    // ascultăm schimbările
    $input.on('input', toggleValidation);
  });
}