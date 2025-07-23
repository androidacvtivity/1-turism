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


            var values = Drupal.settings.mywebform.values;
            watchLiveValidation_A09();
            toggle_A09(values);
            watchAutoSum_CAP2_R001_C1();
            watchAutoSum_CAP2_R001_C2();
            watchLiveNegative_CAP2();
            
        }
    }
})(jQuery);



//-----------------------------------------------------------------

function watchLiveNegative_CAP2() {
    const inputs = [
        'input[name^="CAP2_R_C1"]',
        'input[name^="CAP2_R_C2"]'
    ];

    function checkNegative(elem) {
        const val = parseInt(jQuery(elem).val());
        if (!isNaN(val) && val < 0) {
            jQuery(elem).addClass('input-error').css({
                'border': '2px solid red',
                'background-color': '#ffe6e6'
            });
        } else {
            jQuery(elem).removeClass('input-error').css({
                'border': '',
                'background-color': ''
            });
        }
    }

    const events = 'input change keyup blur';
    inputs.forEach(selector => {
        jQuery(document).on(events, selector, function () {
            checkNegative(this);
        });
    });

    // verificare inițială
    inputs.forEach(selector => {
        jQuery(selector).each(function () {
            checkNegative(this);
        });
    });
}


//-----------------------------------------------------------------
function validate_CAP2_no_negative_values() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.2';
    const field_C1 = 'CAP2_R_C1';
    const field_C2 = 'CAP2_R_C2';

    for (let i = 0; i < values[field_C1].length; i++) {
        const val1 = parseInt(values[field_C1][i]) || 0;
        const val2 = parseInt(values[field_C2][i]) || 0;

        if (val1 < 0) {
            webform.errors.push({
                fieldName: field_C1,
                index: i,
                weight: 10,
                msg: concatMessage('CAP2-NEG', '', Drupal.t(
                    'În rând @row, valoarea CAP2 R C1 nu poate fi negativă',
                    { '@row': id }
                ))
            });
        }

        if (val2 < 0) {
            webform.errors.push({
                fieldName: field_C2,
                index: i,
                weight: 10,
                msg: concatMessage('CAP2-NEG', '', Drupal.t(
                    'În rând @row, valoarea CAP2_R C2 nu poate fi negativă',
                    { '@row': id }
                ))
            });
        }
    }
}

//----------------------------------------------------------------
function watchAutoSum_CAP2_R001_C2() {
    const inputSelector = 'input[name^="CAP2_R_C2"]';
    const targetSelector = '#CAP2_R001_C2';

    function getIntValue(el) {
        const val = parseInt(jQuery(el).val());
        return isNaN(val) ? 0 : val;
    }

    function updateSum() {
        let total = 0;
        jQuery(inputSelector).each(function () {
            total += getIntValue(this);
        });

        jQuery(targetSelector).val(total > 0 ? total : '');
    }

    // Stilul pe câmpul total
    jQuery(targetSelector).prop('readonly', true).css({
        'background-color': '#eee',
        'border': 'none',
        'text-align': 'right'
    });

    // Ascultă evenimentele
    const events = 'input change keyup blur';
    jQuery(document).on(events, inputSelector, updateSum);

    // Inițial
    updateSum();
}

//---------------------------------------------------------------

function watchAutoSum_CAP2_R001_C1() {
    const inputSelector = 'input[name^="CAP2_R_C1"]';
    const targetSelector = '#CAP2_R001_C1';

    function getIntValue(el) {
        const val = parseInt(jQuery(el).val());
        return isNaN(val) ? 0 : val;
    }

    function updateSum() {
        let total = 0;
        jQuery(inputSelector).each(function () {
            total += getIntValue(this);
        });

        jQuery(targetSelector).val(total > 0 ? total : '');
    }

    // Stilul pe câmpul total
    jQuery(targetSelector).prop('readonly', true).css({
        'background-color': '#eee',
        'border': 'none',
        'text-align': 'right'
    });

    // Ascultă evenimentele
    const events = 'input change keyup blur';
    jQuery(document).on(events, inputSelector, updateSum);

    // Inițial
    updateSum();
}

//----------------------------------------------------------------

function watchLiveValidation_A09() {
    const inputSelector = '#PHONE';
    const errorID = 'error-A09';

    function showError(msg) {
        jQuery(`#${errorID}`).remove();
        const error = `<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${msg}</div>`;
        jQuery(inputSelector).after(error);
    }

    function validatePhoneLive() {
        const phone = jQuery(inputSelector).val().trim();
        jQuery(`#${errorID}`).remove();

        if (!/^[0-9]{9}$/.test(phone)) {
            showError('A.09 – Introduceți doar un număr de telefon format din 9 cifre');
        } else if (phone[0] !== '0') {
            showError('A.09 – Prima cifră a numărului de telefon trebuie să fie 0');
        }
    }

    jQuery(inputSelector).on('input blur', validatePhoneLive);
}

function toggle_A09(values) {
    var values = Drupal.settings.mywebform.values;
    const phone = values.PHONE || '';
    const errorID = 'error-A09';

    jQuery(`#${errorID}`).remove();

    if (!/^[0-9]{9}$/.test(phone)) {
        const errorMsg = 'A.09 – Introduceți doar un număr de telefon format din 9 cifre';
        jQuery('#PHONE').after(`<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${errorMsg}</div>`);
    } else if (phone[0] !== '0') {
        const errorMsg = 'A.09 – Prima cifră a numărului de telefon trebuie să fie 0';
        jQuery('#PHONE').after(`<div id="${errorID}" class="webform-inline-error" style="
            color: red;
            font-weight: bold;
            margin-top: 6px;
            padding: 6px 10px;
            background-color: #fce4e4;
            border: 1px solid #d32f2f;
            border-radius: 4px;
            display: inline-block;
        ">${errorMsg}</div>`);
    }
}



function changeSelectCountry(elem) {
    var codIntrodus = jQuery(elem).val().trim();
    var $row = jQuery(elem).closest('tr');
    var $select = $row.find('select.select-country');

    var gasit = false;
    var duplicat = false;

    // verificăm dacă codul introdus există în dropdown
    $select.find('option').each(function (index, opt) {
        if (String(opt.value) === codIntrodus) {
            $select.prop('selectedIndex', index);
            gasit = true;
            return false;
        }
    });

    // verificăm dacă codul introdus există deja în alt rând
    var allInputs = jQuery('input[name^="CAP2_R_CC"]');
    var allSelects = jQuery('select.select-country');
    var currentIndex = allInputs.index(elem);

    allSelects.each(function (i, otherSelect) {
        if (i !== currentIndex && jQuery(otherSelect).val() === codIntrodus) {
            var selectedIndex = otherSelect.selectedIndex;
            var selection = otherSelect.options[selectedIndex].innerHTML;
            mywebform_alert("Exista deja  tara - " + selection);
            duplicat = true;
            return false;
        }
    });

    if (duplicat) {
        jQuery(elem).val('');
        $select.prop('selectedIndex', 0);
        jQuery(elem).addClass('invalid-country');
        return;
    }

    if (!gasit) {
        jQuery(elem).addClass('invalid-country');
        $select.prop('selectedIndex', 0);
    } else {
        jQuery(elem).removeClass('invalid-country');
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

    validate_06_038();
    validate_CAP2_CA_CB_CC();
    validate_CAP2_R001_C1();
    validate_CAP2_R001_C2();

    validate_CAP2_no_negative_values();
    validate_06_024();

    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['turism1_23'] = 1;
    validateWebform();
};
//--------------------------------------------------

function validate_06_024() {
    const values = Drupal.settings.mywebform.values;

    const cap1_field = 'CAP1_R04_C1';
    const field_cod_tara = 'CAP2_R_CC';
    const field_val = 'CAP2_R_C1';

    const coduri_selectate = ['051', '031', '112', '398', '417', '643', '762', '795', '860'];

    const total_CAP1_R04 = parseInt(values[cap1_field]) || 0;
    let suma_CAP2 = 0;

    for (let i = 0; i < values[field_cod_tara].length; i++) {
        const cod = values[field_cod_tara][i];
        const val = parseInt(values[field_val][i]) || 0;

        if (coduri_selectate.includes(cod)) {
            suma_CAP2 += val;
        }
    }

    if (total_CAP1_R04 !== suma_CAP2) {
        webform.errors.push({
            fieldName: cap1_field,
            index: 0,
            weight: 35,
            msg: concatMessage('06-024', '', Drupal.t(
                'Cod eroare: 06-024 (Cap.1) Cap.I rd.04 col1 = Cap.2 col.1 suma rindurilor(051,031,112,398,417,643,762,795,860)'
            ))
        });
    }
}


//-------------------------------------------------
function validate_CAP2_R001_C2() {
    const values = Drupal.settings.mywebform.values;
    const field_total = 'CAP2_R001_C2';
    const field_list = 'CAP2_R_C2';
    const id = 'CAP.2';

    const total_declared = parseInt(values[field_total]) || 0;

    let sum = 0;
    for (let i = 0; i < values[field_list].length; i++) {
        sum += parseInt(values[field_list][i]) || 0;
    }

    if (total_declared !== sum) {
        webform.errors.push({
            fieldName: field_total,
            index: 0,
            weight: 20,
            msg: concatMessage('06-038.3', '', Drupal.t(
                'Valoarea totală CAP2 R001 C2 (@total) nu este egală cu suma rândurilor (@sum)',
                { '@total': total_declared, '@sum': sum }
            ))
        });
    }
}
//-----------------------------------------------------------
function validate_CAP2_R001_C1() {
    const values = Drupal.settings.mywebform.values;
    const field_total = 'CAP2_R001_C1';
    const field_list = 'CAP2_R_C1';
    const id = 'CAP.2';

    const total_declared = parseInt(values[field_total]) || 0;

    let sum = 0;
    for (let i = 0; i < values[field_list].length; i++) {
        sum += parseInt(values[field_list][i]) || 0;
    }

    if (total_declared !== sum) {
        webform.errors.push({
            fieldName: field_total,
            index: 0,
            weight: 20,
            msg: concatMessage('06-038.2', '', Drupal.t(
                'Valoarea totală CAP2 R001 C1 (@total) nu este egală cu suma rândurilor (@sum)',
                { '@total': total_declared, '@sum': sum }
            ))
        });
    }
}

//-----------------------------------------------------------
function validate_CAP2_CA_CB_CC() {
    const values = Drupal.settings.mywebform.values;
    const field_CA = 'CAP2_R_CA';
    const field_CB = 'CAP2_R_CB';
    const field_CC = 'CAP2_R_CC';
    const id = 'CAP.2';

    for (let i = 0; i < values[field_CA].length; i++) {
        const val_CA = parseInt(values[field_CA][i]) || 0;
        const val_CB = values[field_CB][i];
        const val_CC = values[field_CC][i];

        const cb_completat = val_CB !== undefined && val_CB !== null && val_CB !== '';
        const cc_completat = val_CC !== undefined && val_CC !== null && val_CC !== '';

        if (val_CA > 1 && (!cb_completat || !cc_completat)) {
            webform.errors.push({
                fieldName: field_CA,
                index: i,
                weight: 30,
                msg: concatMessage('06-038.1', '', Drupal.t(
                    'În rând @row: Dacă Nr.rand  > 1, trebuie completate și Ţara și Codul ţării',
                    { '@row': id }
                ))
            });
        }
    }
}


function validate_06_038() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.2';
    const cod_tara_field = 'CAP2_R_CC';
    const field_col1 = 'CAP2_R_C1';
    const field_col2 = 'CAP2_R_C2';

    for (let i = 0; i < values[cod_tara_field].length; i++) {
        const cod = values[cod_tara_field][i];
        const val1 = parseInt(values[field_col1][i]) || 0;
        const val2 = parseInt(values[field_col2][i]) || 0;

        const some_field_is_filled = val1 || val2;

        if (cod) {
            if (!some_field_is_filled || (val1 + val2 === 0)) {
                webform.errors.push({
                    fieldName: cod_tara_field,
                    weight: 25,
                    index: i,
                    msg: concatMessage('06-038', '', Drupal.t('In Rind @row Tara @country lipsesc datele', {
                        '@row': id,
                        '@country': cod,
                    }))
                });
            }
        }
    }
}
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