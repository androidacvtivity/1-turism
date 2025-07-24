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
    validate_06_025();
    validate_06_022();
    validate_06_023();
    validate_06_031();
    validate_06_032();
    validate_06_003();
    validate_06_004();
    validate_06_028();
    validate_06_001();
    validate_06_002();
    validate_06_006();
    validate_06_007();  
    validate_06_008();  
    validate_06_009();  
    validate_06_010(); 
    validate_06_011();   
    validate_06_012();  
    validate_06_013();  
    validate_06_014();  
    validate_06_015();  
    validate_06_016();  
    validate_06_017();  
    validate_06_018();  
    validate_06_019();  
    validate_06_022();  
    validate_06_023();  
    validate_06_028(); 
    validate_06_030(); 
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['turism1_23'] = 1;
    validateWebform();
};

function validate_06_030() {
    const values = Drupal.settings.mywebform.values;

    const val_c1 = parseInt(values['CAP1_R11_C1']) || 0;
    const val_c5 = parseFloat(values['CAP1_R11_C5']) || 0;

    if (val_c1 > 0 && val_c5 <= 0) {
        webform.errors.push({
            fieldName: 'CAP1_R11_C5',
            index: 0,
            weight: 30,
            msg: concatMessage('06-030', '', Drupal.t(
                'Cod eroare: 06-030 (Cap.1) Dacă rd.11 col.1 > 0 (@v1), atunci rd.11 col.5 trebuie să fie > 0 (este @v5)',
                {
                    '@v1': val_c1,
                    '@v5': val_c5
                }
            ))
        });
    }
}

function validate_06_028() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        if (r === '16') continue;

        const f2 = `CAP1_R${r}_C2`;
        const f4 = `CAP1_R${r}_C4`;

        if (values[f2] !== undefined && values[f4] !== undefined) {
            const v2 = parseFloat(values[f2]) || 0;
            const v4 = parseFloat(values[f4]) || 0;

            if (v2 > 0 && (v4 / v2) > 30) {
                webform.errors.push({
                    fieldName: f4,
                    index: 0,
                    weight: 28,
                    msg: concatMessage('06-028', '', Drupal.t(
                        'Cod eroare: 06-028 (Cap.1) Condiție: col.4 / col.2 ≤ 30. Rând @r: (@v4 / @v2 = @rap > 30)',
                        {
                            '@r': r,
                            '@v2': v2,
                            '@v4': v4,
                            '@rap': (v4 / v2).toFixed(2)
                        }
                    ))
                });
            }
        }
    }
}

function validate_06_022() {
    const values = Drupal.settings.mywebform.values;

    const cap1 = parseInt(values['CAP1_R03_C1']) || 0;
    const cap2 = parseInt(values['CAP2_R001_C1']) || 0;

    if (cap1 !== cap2) {
        webform.errors.push({
            fieldName: 'CAP1_R03_C1',
            index: 0,
            weight: 22,
            msg: concatMessage('06-022', '', Drupal.t(
                'Cod eroare: 06-022 (Cap.1) rd.03 col.1 (@v1) ≠ Cap.II rd.001 col.1 (@v2)',
                { '@v1': cap1, '@v2': cap2 }
            ))
        });
        webform.errors.push({
            fieldName: 'CAP2_R001_C1',
            index: 0,
            weight: 22,
            msg: concatMessage('06-022', '', Drupal.t(
                'Cod eroare: 06-022 (Cap.1) rd.03 col.1 (@v1) ≠ Cap.II rd.001 col.1 (@v2)',
                { '@v1': cap1, '@v2': cap2 }
            ))
        });
    }
}

function validate_06_023() {
    const values = Drupal.settings.mywebform.values;

    const cap1 = parseInt(values['CAP1_R09_C1']) || 0;
    const cap2 = parseInt(values['CAP2_R001_C2']) || 0;

    if (cap1 !== cap2) {
        webform.errors.push({
            fieldName: 'CAP1_R09_C1',
            index: 0,
            weight: 23,
            msg: concatMessage('06-023', '', Drupal.t(
                'Cod eroare: 06-023 (Cap.1) rd.09 col.1 (@v1) ≠ Cap.II rd.001 col.2 (@v2)',
                { '@v1': cap1, '@v2': cap2 }
            ))
        });
        webform.errors.push({
            fieldName: 'CAP2_R001_C2',
            index: 0,
            weight: 23,
            msg: concatMessage('06-023', '', Drupal.t(
                'Cod eroare: 06-023 (Cap.1) rd.09 col.1 (@v1) ≠ Cap.II rd.001 col.2 (@v2)',
                { '@v1': cap1, '@v2': cap2 }
            ))
        });
    }
}


function validate_06_019() {
    const values = Drupal.settings.mywebform.values;

    let sumaCol1 = 0;
    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        const val = parseInt(values[`CAP1_R${r}_C1`]) || 0;
        sumaCol1 += val;
    }

    const valR16 = parseInt(values['CAP1_R16_C1']) || 0;

    if (sumaCol1 > 0 && valR16 <= 0) {
        webform.errors.push({
            fieldName: 'CAP1_R16_C1',
            index: 0,
            weight: 19,
            msg: concatMessage('06-019', '', Drupal.t(
                'Cod eroare: 06-019 (Cap.1) Dacă suma col.1 > 0 (@sum), atunci rd.16 trebuie să fie > 0 (este @v16)',
                { '@sum': sumaCol1, '@v16': valR16 }
            ))
        });
    }
}


function validate_06_015() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C4'];
    const dependent_rows = ['04', '31', '05', '32', '33', '34'];

    coloane.forEach(col => {
        const val_r03 = parseInt(values[`CAP1_R03_${col}`]) || 0;

        if (val_r03 === 0) {
            dependent_rows.forEach(r => {
                const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
                if (val !== 0) {
                    webform.errors.push({
                        fieldName: `CAP1_R${r}_${col}`,
                        index: 0,
                        weight: 15,
                        msg: concatMessage('06-015', '', Drupal.t(
                            'Cod eroare: 06-015 (Cap.1) col.@col: Dacă rd.03 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                            { '@col': col, '@r': r, '@v': val }
                        ))
                    });
                }
            });
        }
    });
}

function validate_06_016() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C4'];
    const dependent_rows = ['10', '91', '92', '93', '94'];

    coloane.forEach(col => {
        const val_r09 = parseInt(values[`CAP1_R09_${col}`]) || 0;

        if (val_r09 === 0) {
            dependent_rows.forEach(r => {
                const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
                if (val !== 0) {
                    webform.errors.push({
                        fieldName: `CAP1_R${r}_${col}`,
                        index: 0,
                        weight: 16,
                        msg: concatMessage('06-016', '', Drupal.t(
                            'Cod eroare: 06-016 (Cap.1) col.@col: Dacă rd.09 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                            { '@col': col, '@r': r, '@v': val }
                        ))
                    });
                }
            });
        }
    });
}

function validate_06_017() {
    const values = Drupal.settings.mywebform.values;
    const col = 'C3';
    const dependent_rows = ['04', '31', '05'];

    const val_r03 = parseInt(values[`CAP1_R03_${col}`]) || 0;

    if (val_r03 === 0) {
        dependent_rows.forEach(r => {
            const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
            if (val !== 0) {
                webform.errors.push({
                    fieldName: `CAP1_R${r}_${col}`,
                    index: 0,
                    weight: 17,
                    msg: concatMessage('06-017', '', Drupal.t(
                        'Cod eroare: 06-017 (Cap.1) col.@col: Dacă rd.03 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                        { '@col': col, '@r': r, '@v': val }
                    ))
                });
            }
        });
    }
}

function validate_06_018() {
    const values = Drupal.settings.mywebform.values;
    const col = 'C3';
    const dependent_rows = ['10', '91'];

    const val_r09 = parseInt(values[`CAP1_R09_${col}`]) || 0;

    if (val_r09 === 0) {
        dependent_rows.forEach(r => {
            const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
            if (val !== 0) {
                webform.errors.push({
                    fieldName: `CAP1_R${r}_${col}`,
                    index: 0,
                    weight: 18,
                    msg: concatMessage('06-018', '', Drupal.t(
                        'Cod eroare: 06-018 (Cap.1) col.@col: Dacă rd.09 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                        { '@col': col, '@r': r, '@v': val }
                    ))
                });
            }
        });
    }
}


function validate_06_011() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r11 = toNum(values[`CAP1_R11_${col}`]) || 0;
        const r01 = toNum(values[`CAP1_R01_${col}`]) || 0;
        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;

        const suma = r01 + r02;
        if (r11 !== suma) {
            webform.errors.push({
                fieldName: `CAP1_R11_${col}`,
                index: 0,
                weight: 11,
                msg: concatMessage('06-011', '', Drupal.t(
                    'Cod eroare: 06-011 (Cap.1) col.@col: rd.11 (@v11) ≠ rd.01 + rd.02 (@v01 + @v02 = @sum)',
                    {
                        '@col': col, '@v11': r11, '@v01': r01, '@v02': r02, '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_012() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r11 = toNum(values[`CAP1_R11_${col}`]) || 0;
        const r01 = toNum(values[`CAP1_R01_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;

        const suma = r01 + r03 + r09;
        if (r11 !== suma) {
            webform.errors.push({
                fieldName: `CAP1_R11_${col}`,
                index: 0,
                weight: 12,
                msg: concatMessage('06-012', '', Drupal.t(
                    'Cod eroare: 06-012 (Cap.1) col.@col: rd.11 (@v11) ≠ rd.01 + rd.03 + rd.09 (@v01 + @v03 + @v09 = @sum)',
                    {
                        '@col': col, '@v11': r11, '@v01': r01, '@v03': r03, '@v09': r09, '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_013() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;

        if (r02 === r03 && r09 !== 0) {
            webform.errors.push({
                fieldName: `CAP1_R09_${col}`,
                index: 0,
                weight: 13,
                msg: concatMessage('06-013', '', Drupal.t(
                    'Cod eroare: 06-013 (Cap.1) col.@col: Dacă rd.02 = rd.03 (@v02), atunci rd.09 trebuie să fie 0 (este @v09)',
                    {
                        '@col': col, '@v02': r02, '@v09': r09
                    }
                ))
            });
        }
    });
}

function validate_06_014() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;

        if (r02 === r09 && r03 !== 0) {
            webform.errors.push({
                fieldName: `CAP1_R03_${col}`,
                index: 0,
                weight: 14,
                msg: concatMessage('06-014', '', Drupal.t(
                    'Cod eroare: 06-014 (Cap.1) col.@col: Dacă rd.02 = rd.09 (@v02), atunci rd.03 trebuie să fie 0 (este @v03)',
                    {
                        '@col': col, '@v02': r02, '@v03': r03
                    }
                ))
            });
        }
    });
}

function validate_06_010() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C4'];
    const randuri_sum = ['91', '92', '93', '94'];

    coloane.forEach(col => {
        const field_r09 = `CAP1_R09_${col}`;
        const val_r09 = parseInt(values[field_r09]) || 0;

        let suma = 0;
        randuri_sum.forEach(r => {
            const field = `CAP1_R${r}_${col}`;
            suma += parseInt(values[field]) || 0;
        });

        if (val_r09 !== suma) {
            webform.errors.push({
                fieldName: field_r09,
                index: 0,
                weight: 10,
                msg: concatMessage('06-010', '', Drupal.t(
                    'Cod eroare: 06-010 (Cap.1) Condiție: rd.09 = rd.(91+92+93+94). col.@col: rd.09 (@v9) ≠ sum = @sum',
                    {
                        '@col': col,
                        '@v9': val_r09,
                        '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_009() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C3', 'C4'];

    coloane.forEach(col => {
        const field_r09 = `CAP1_R09_${col}`;
        const field_r10 = `CAP1_R10_${col}`;

        const val_r09 = parseInt(values[field_r09]) || 0;
        const val_r10 = parseInt(values[field_r10]) || 0;

        if (val_r09 < val_r10) {
            webform.errors.push({
                fieldName: field_r09,
                index: 0,
                weight: 9,
                msg: concatMessage('06-009', '', Drupal.t(
                    'Cod eroare: 06-009 (Cap.1) Condiție: rd.09 ≥ rd.10. col.@col: rd.09 (@v9) < rd.10 (@v10)',
                    {
                        '@col': col,
                        '@v9': val_r09,
                        '@v10': val_r10
                    }
                ))
            });
        }
    });
}

function validate_06_008() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C3', 'C4'];

    coloane.forEach(col => {
        const field_r31 = `CAP1_R31_${col}`;
        const field_r05 = `CAP1_R05_${col}`;

        const val_r31 = parseInt(values[field_r31]) || 0;
        const val_r05 = parseInt(values[field_r05]) || 0;

        if (val_r31 < val_r05) {
            webform.errors.push({
                fieldName: field_r31,
                index: 0,
                weight: 8,
                msg: concatMessage('06-008', '', Drupal.t(
                    'Cod eroare: 06-008 (Cap.1) Condiție: rd.31 ≥ rd.05. col.@col: rd.31 (@v31) < rd.05 (@v05)',
                    {
                        '@col': col,
                        '@v31': val_r31,
                        '@v05': val_r05
                    }
                ))
            });
        }
    });
}
function validate_06_007() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C4'];
    const randuri_sum = ['31', '32', '33', '34'];

    coloane.forEach(col => {
        const field_r3 = `CAP1_R03_${col}`;
        const val_r3 = parseInt(values[field_r3]) || 0;

        let suma = 0;
        randuri_sum.forEach(r => {
            const field = `CAP1_R${r}_${col}`;
            suma += parseInt(values[field]) || 0;
        });

        if (val_r3 !== suma) {
            webform.errors.push({
                fieldName: field_r3,
                index: 0,
                weight: 7,
                msg: concatMessage('06-007', '', Drupal.t(
                    'Cod eroare: 06-007 (Cap.1) col.1,2,4 atunci rd.03=rd.(31+32+33+34) col.@col: rd.03 (@v3) ≠ sum(rd.31-34) = @sum',
                    {
                        '@col': col,
                        '@v3': val_r3,
                        '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_006() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C3', 'C4'];

    coloane.forEach(col => {
        const field_r3 = `CAP1_R03_${col}`;
        const field_r4 = `CAP1_R04_${col}`;

        const val_r3 = parseInt(values[field_r3]) || 0;
        const val_r4 = parseInt(values[field_r4]) || 0;

        if (val_r3 < val_r4) {
            webform.errors.push({
                fieldName: field_r3,
                index: 0,
                weight: 6,
                msg: concatMessage('06-006', '', Drupal.t(
                    'Cod eroare: 06-006 (Cap.1) rd.03>=rd.04 col.@col: rd.03 (@v3) < rd.04 (@v4)',
                    {
                        '@col': col,
                        '@v3': val_r3,
                        '@v4': val_r4
                    }
                ))
            });
        }
    });
}

function validate_06_002() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const randuri = ['32', '33', '34', '92', '93', '94'];

    randuri.forEach(r => {
        const f1 = `CAP1_R${r}_C1`;
        const f2 = `CAP1_R${r}_C2`;

        const v1 = parseInt(values[f1]) || 0;
        const v2 = parseInt(values[f2]) || 0;

        if (v1 !== v2) {
            webform.errors.push({
                fieldName: f1,
                index: 0,
                weight: 2,
                msg: concatMessage('06-002', '', Drupal.t(
                    'Cod eroare: 06-002 (Cap.1) Rând @r: col.1 (@v1) ≠ col.2 (@v2)',
                    {
                        '@r': r,
                        '@v1': v1,
                        '@v2': v2
                    }
                ))
            });
        }
    });
}

function validate_06_001() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const randuri = ['01', '02', '03', '04', '31', '05', '09', '10', '91', '11'];

    randuri.forEach(r => {
        const f1 = `CAP1_R${r}_C1`;
        const f2 = `CAP1_R${r}_C2`;
        const f3 = `CAP1_R${r}_C3`;

        const v1 = parseInt(values[f1]) || 0;
        const v2 = parseInt(values[f2]) || 0;
        const v3 = parseInt(values[f3]) || 0;

        if (v1 !== v2 + v3) {
            webform.errors.push({
                fieldName: f1,
                index: 0,
                weight: 1,
                msg: concatMessage('06-001', '', Drupal.t(
                    'Cod eroare: 06-001 (Cap.1) Rând @r: col.1 (@v1) ≠ col.2 + col.3 (@v2 + @v3 = @vsum)',
                    {
                        '@r': r,
                        '@v1': v1,
                        '@v2': v2,
                        '@v3': v3,
                        '@vsum': v2 + v3
                    }
                ))
            });
        }
    });
}

function validate_06_028() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        if (r === '16') continue;

        const f2 = `CAP1_R${r}_C2`;
        const f4 = `CAP1_R${r}_C4`;

        if (values[f2] !== undefined && values[f4] !== undefined) {
            const v2 = parseFloat(values[f2]) || 0;
            const v4 = parseFloat(values[f4]) || 0;

            if (v2 > 0 && (v4 / v2) > 30) {
                webform.errors.push({
                    fieldName: f4,
                    index: 0,
                    weight: 28,
                    msg: concatMessage('06-028', '', Drupal.t(
                        'Cod eroare: 06-028 (Cap.1) Col4 / Col2<=30  Rând @r: col.4 / col.2 = @rap > 30',
                        {
                            '@r': r,
                            '@rap': (v4 / v2).toFixed(2)
                        }
                    ))
                });
            }
        }
    }
}


function validate_06_004() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        if (r === '16') continue;

        const f2 = `CAP1_R${r}_C2`;
        const f4 = `CAP1_R${r}_C4`;

        if (values[f2] !== undefined && values[f4] !== undefined) {
            const v2 = parseFloat(values[f2]) || 0;
            const v4 = parseFloat(values[f4]) || 0;

            if (v2 > 0 && (v4 / v2) < 1) {
                webform.errors.push({
                    fieldName: f4,
                    index: 0,
                    weight: 4,
                    msg: concatMessage('06-004', '', Drupal.t(
                        'Cod eroare: 06-004 (Cap.1) col4/col2>=1  Rând @r: col.4 / col.2 = @rap < 1',
                        {
                            '@r': r,
                            '@rap': (v4 / v2).toFixed(2)
                        }
                    ))
                });
            }
        }
    }
}

function validate_06_003() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        if (r === '16') continue;

        const f2 = `CAP1_R${r}_C2`;
        const f4 = `CAP1_R${r}_C4`;

        if (values[f2] !== undefined && values[f4] !== undefined) {
            const v2 = parseInt(values[f2]) || 0;
            const v4 = parseInt(values[f4]) || 0;

            if (v4 < v2) {
                webform.errors.push({
                    fieldName: f4,
                    index: 0,
                    weight: 3,
                    msg: concatMessage('06-003', '', Drupal.t(
                        'Cod eroare: 06-003 (Cap.1) col4>=col2 Rând @r: col.4 (@v4) < col.2 (@v2)',
                        { '@r': r, '@v4': v4, '@v2': v2 }
                    ))
                });
            }
        }
    }
}


function validate_06_032() {
    const values = Drupal.settings.mywebform.values;

    const id = 'CAP.1';
    let all_equal_C1_C3 = true;

    // Verificăm dacă toate valorile col1 == col3
    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        const f1 = `CAP1_R${r}_C1`;
        const f3 = `CAP1_R${r}_C3`;

        if (values[f1] !== undefined && values[f3] !== undefined) {
            const v1 = parseInt(values[f1]) || 0;
            const v3 = parseInt(values[f3]) || 0;
            if (v1 !== v3) {
                all_equal_C1_C3 = false;
                break;
            }
        }
    }

    // Dacă toate col1 = col3, verificăm col4 să fie 0
    if (all_equal_C1_C3) {
        for (let i = 1; i <= 99; i++) {
            const r = String(i).padStart(2, '0');
            const f4 = `CAP1_R${r}_C4`;
            if (values[f4] !== undefined) {
                const v4 = parseInt(values[f4]) || 0;
                if (v4 !== 0) {
                    webform.errors.push({
                        fieldName: f4,
                        index: 0,
                        weight: 32,
                        msg: concatMessage('06-032', '', Drupal.t(
                            'Cod eroare: 06-032 (Cap.1) Dacă toate col.1 = col.3, atunci toate col.4 trebuie să fie 0. Rând @r: col.4 = @v4',
                            {
                                '@r': r,
                                '@v4': v4
                            }
                        ))
                    });
                }
            }
        }
    }
}

function validate_06_032() {
    const values = Drupal.settings.mywebform.values;

    const id = 'CAP.1';
    let all_equal_C1_C3 = true;

    // Verificăm dacă toate valorile col1 == col3
    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        const f1 = `CAP1_R${r}_C1`;
        const f3 = `CAP1_R${r}_C3`;

        if (values[f1] !== undefined && values[f3] !== undefined) {
            const v1 = parseInt(values[f1]) || 0;
            const v3 = parseInt(values[f3]) || 0;
            if (v1 !== v3) {
                all_equal_C1_C3 = false;
                break;
            }
        }
    }

    // Dacă toate col1 = col3, verificăm col4 să fie 0
    if (all_equal_C1_C3) {
        for (let i = 1; i <= 99; i++) {
            const r = String(i).padStart(2, '0');
            const f4 = `CAP1_R${r}_C4`;
            if (values[f4] !== undefined) {
                const v4 = parseInt(values[f4]) || 0;
                if (v4 !== 0) {
                    webform.errors.push({
                        fieldName: f4,
                        index: 0,
                        weight: 32,
                        msg: concatMessage('06-032', '', Drupal.t(
                            'Cod eroare: 06-032 (Cap.1) Dacă toate col.1 = col.3, atunci toate col.4 trebuie să fie 0. Rând @r: col.4 = @v4',
                            {
                                '@r': r,
                                '@v4': v4
                            }
                        ))
                    });
                }
            }
        }
    }
}

function validate_06_031() {
    const values = Drupal.settings.mywebform.values;

    const id = 'CAP.1';
    const randuri = ['01', '02', '03', '09', '11'];

    randuri.forEach(r => {
        const field_C1 = `CAP1_R${r}_C1`;
        const field_C5 = `CAP1_R${r}_C5`;

        const val_C1 = parseInt(values[field_C1]) || 0;
        const val_C5 = parseInt(values[field_C5]) || 0;

        if (val_C1 > 0 && val_C5 <= 0) {
            const msg = concatMessage('06-031', '', Drupal.t(
                'Cod eroare: 06-031 (Cap.1) Dacă rd.@r col.1 > 0, atunci și col.5 trebuie să fie > 0 (col1=@c1, col5=@c5)',
                { '@r': r, '@c1': val_C1, '@c5': val_C5 }
            ));

            webform.errors.push({
                fieldName: field_C5,
                index: 0,
                weight: 31,
                msg: msg
            });
        }
    });
}




function validate_06_023() {
    const values = Drupal.settings.mywebform.values;

    const field_cap1 = 'CAP1_R09_C1';
    const field_cap2 = 'CAP2_R001_C2';

    const val_cap1 = parseInt(values[field_cap1]) || 0;
    const val_cap2 = parseInt(values[field_cap2]) || 0;

    if (val_cap1 !== val_cap2) {
        const msgText = concatMessage('06-023', '', Drupal.t(
            'Cod eroare: 06-023 (Cap.1) Cap.I rd.09 col1 (@val1) ≠ Cap.II rd.001 col2 (@val2)',
            {
                '@val1': val_cap1,
                '@val2': val_cap2
            }
        ));

        webform.errors.push({
            fieldName: field_cap1,
            index: 0,
            weight: 23,
            msg: msgText
        });

        webform.errors.push({
            fieldName: field_cap2,
            index: 0,
            weight: 23,
            msg: msgText
        });
    }
}

function validate_06_022() {
    const values = Drupal.settings.mywebform.values;

    const field_cap1 = 'CAP1_R03_C1';
    const field_cap2 = 'CAP2_R001_C1';

    const val_cap1 = parseInt(values[field_cap1]) || 0;
    const val_cap2 = parseInt(values[field_cap2]) || 0;

    if (val_cap1 !== val_cap2) {
        const msgText = concatMessage('06-022', '', Drupal.t(
            'Cod eroare: 06-022 (Cap.1) Cap.I rd.03 col1 (@val1) ≠ Cap.II rd.001 col1 (@val2)',
            {
                '@val1': val_cap1,
                '@val2': val_cap2
            }
        ));

        webform.errors.push({
            fieldName: field_cap1,
            index: 0,
            weight: 22,
            msg: msgText
        });

        webform.errors.push({
            fieldName: field_cap2,
            index: 0,
            weight: 22,
            msg: msgText
        });
    }
}
//--------------------------------------------------
function validate_06_025() {
    const values = Drupal.settings.mywebform.values;

    const cap1_target = 'CAP1_R10_C1';
    const field_cod_tara = 'CAP2_R_CC';
    const field_val = 'CAP2_R_C1';

    const coduri = ['051', '031', '112', '398', '417', '643', '762', '795', '860'];

    const total_cap1 = parseInt(values[cap1_target]) || 0;
    let suma_cap2 = 0;

    for (let i = 0; i < values[field_cod_tara].length; i++) {
        const cod = values[field_cod_tara][i];
        const val = parseInt(values[field_val][i]) || 0;

        if (coduri.includes(cod)) {
            suma_cap2 += val;
        }
    }

    if (total_cap1 !== suma_cap2) {
        webform.errors.push({
            fieldName: cap1_target,
            index: 0,
            weight: 36,
            msg: concatMessage('06-025', '', Drupal.t(
                'Cod eroare: 06-025 (Cap.1) Cap.I rd.10 col1 (@cap1) ≠ suma Cap.II col.1 pe coduri (051,031,112,398,417,643,762,795,860) = @sum',
                {
                    '@cap1': total_cap1,
                    '@sum': suma_cap2
                }
            ))
        });
    }
}

//--------------------------------------------------
//Show values
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
                'Cod eroare: 06-024 (Cap.1) Cap.I rd.04 col1 (@cap1) ≠ suma Cap.II col.1 pe coduri (051,031,112,398,417,643,762,795,860) = @sum',
                {
                    '@cap1': total_CAP1_R04,
                    '@sum': suma_CAP2
                }
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