function watchLiveValidation_CAP2_R_CC() {
  const validCodes = jQuery('select.select-country option')
    .map(function () { return this.value; })
    .get()
    .filter(v => v !== "");

  jQuery(document).on('input', 'input.input-country', function () {
    const $input = jQuery(this);
    const code = $input.val().trim();
    const $row = $input.closest('tr');
    const $msg = $row.find('.country-error-msg');

    if ($msg.length) $msg.remove();
    $input.removeClass('invalid-country');

    if (code === "") return;

    if (!validCodes.includes(code)) {
      $input.addClass('invalid-country');
      const msg = jQuery('<div class="country-error-msg" style="color:red; font-size:12px;">Codul țării nu este valid</div>');
      $input.closest('td').append(msg);
    }
  });
}