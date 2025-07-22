(function ($) {
    Drupal.behaviors.turism1_23 = {
        attach: function (context, settings) {
            jQuery('input.numeric', context).keypress(function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float', context).keypress(function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery(document).off('input change', 'input.input-country');
            jQuery(document).on('input change', 'input.input-country', function () {
                changeSelectCountry(this);
            });
        }
    }
})(jQuery);

function changeSelectCountry(elem) {
    var codIntrodus = jQuery(elem).val().trim().padStart(3, '0');
    var $row = jQuery(elem).closest('tr');
    var $select = $row.find('select.select-country');

    var gasit = false;
    $select.find('option').each(function (index, opt) {
        if (String(opt.value) === codIntrodus) {
            $select.prop('selectedIndex', index);
            gasit = true;
            return false;
        }
    });

    var $cell = jQuery(elem).closest('td');
    var $msg = $cell.find('.invalid-country-msg');

    if ($msg.length === 0) {
        $msg = $('<div class="invalid-country-msg" style="color:red; font-size:12px; margin-top:2px;"></div>');
        $cell.append($msg);
    }

    if (!gasit) {
        jQuery(elem).addClass('invalid-country');
        $select.prop('selectedIndex', 0);
        $msg.text("Nu există așa cod în clasificator");
    } else {
        jQuery(elem).removeClass('invalid-country');
        $msg.remove();
        changeIdCountry($select[0]);
    }
}

function changeIdCountry(elem) {
    var elemnt = jQuery(elem).closest('tr').find('input.input-country');
    var elemnt1 = jQuery(elem).closest('tr').find('input.select-country');

    if (jQuery(elem).val() == elemnt.val())
        return;

    var fields_table1_c1 = jQuery('#tabcon tbody tr td:nth-child(3)').find('input');
    var fields_table1_c2 = jQuery('#tabcon tbody tr td:nth-child(2)').find('select');
    var ElementActiv = document.activeElement.id;
    var IdElementActiv = ElementActiv.substring(10);

    var i = 0;
    var cautare = 0;

    for (i = 0; i < (fields_table1_c1.length - 1); i++) {
        if ((jQuery(elem).val() == jQuery(fields_table1_c2[i]).val()) && ((IdElementActiv - 1) != i)) {
            var val_y = jQuery(elem).val();
            var selectedIndex = fields_table1_c2[i].selectedIndex;
            var selection = fields_table1_c2[i].options[selectedIndex].innerHTML;
            mywebform_alert("Exista deja  tara - " + selection);
            cautare = 1;
        }
    }

    if (cautare == 1) {
        fields_table1_c2[IdElementActiv - 1].selectedIndex = 0;
        fields_table1_c1[IdElementActiv - 1].value = '';
        cautare = 0;
    } else {
        var field_name_cc = "CAP2_R_CC-" + IdElementActiv;
        var country_val = jQuery(fields_table1_c2[IdElementActiv - 1]).val();
        jQuery("#" + field_name_cc).val(country_val).trigger('change');
    }
}

webform.validators.turism1_23 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;

    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['turism1_23'] = 1;
    validateWebform();
};

function concatMessage(errorCode, fieldTitle, msg) {
    var titleParts = [];
    if (errorCode) titleParts.push(getErrorMessage(errorCode));
    if (fieldTitle) titleParts.push(fieldTitle);
    if (titleParts.length) {
        msg = titleParts.join(', ') + '. ' + msg;
    }
    return msg;
}

function getErrorMessage(errorCode) {
    return Drupal.t('Error code: @error_code', { '@error_code': errorCode });
}

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) a.weight = 9999;
    if (!b.hasOwnProperty('weight')) b.weight = 9999;
    return toFloat(a.weight) - toFloat(b.weight);
}