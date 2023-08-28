(function ($) {
    Drupal.behaviors.turism1_23 = {
        attach: function (context, settings) {
            jQuery('input.numeric').keypress(function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float').keypress(function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
        }
    }
})(jQuery);

// function changeIdCountry(elem) {
//     var elemnt = jQuery(elem).closest('tr').find('input.input-country');
//     if (jQuery(elem).val() == elemnt.val())
//         return;

//     elemnt.val(jQuery(elem).val()).change();
// }

// function changeSelectCountry(elem) {
//     var getValue = jQuery(elem).val();

//     if (jQuery(elem).closest('tr').find('select.select-country option[value=' + getValue + ']').length > 0) {
//         jQuery(elem).closest('tr').find('select.select-country').val(getValue).change();
//         return true;
//     }
//     alert('Nu exista tara cu acest cod');
//     return false;
// }




webform.validators.turism1_23 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;


    // Checking  telefon 
    if (!values.PHONE || !/^[0-9]{9}$/.test(values.PHONE)) {
        webform.errors.push({
            'fieldName': 'PHONE',
            'msg': Drupal.t(' Cod eroare: A.09 Introduceți doar un număr de telefon format din 9 cifre')
        });
    }

    // Check if the first digit is 0
    if (values.PHONE && values.PHONE[0] !== '0') {
        webform.errors.push({
            'fieldName': 'PHONE',
            'msg': Drupal.t(' Cod eroare: A.09 Prima cifră a numărului de telefon trebuie să fie 0')
        });
    }
   //End  Checking  telefon
   
    if (!values.STREET) {
        webform.errors.push({
            'fieldName': 'STREET',
            'msg': Drupal.t('Câmpul nu este completat')
        });
    }
  


    var arr1_columns = [1, 2, 4];
    var arr1_inputs = ['01', '02', '03', '04', '31', '05', '32', '33', '34', '09', '10', '91', '92', '93', '94', '11'];

    var col1_rd3 = 0;
    var col2_rd3 = 0;
    var col3_rd3 = 0;
    var col4_rd3 = 0;

    var col1_rd4 = 0;
    var col2_rd4 = 0;
    var col3_rd4 = 0;
    var col4_rd4 = 0;

    var col1_rd5 = 0;
    var col2_rd5 = 0;
    var col3_rd5 = 0;
    var col4_rd5 = 0;

    var col1_rd9 = 0;
    var col2_rd9 = 0;
    var col3_rd9 = 0;
    var col4_rd9 = 0;

    var col1_rd10 = 0;
    var col2_rd10 = 0;
    var col3_rd10 = 0;
    var col4_rd10 = 0;

    var col1_rd31 = 0;
    var col2_rd31 = 0;
    var col3_rd31 = 0;
    var col4_rd31 = 0;





    var rd16 = 0;
    if (!isNaN(parseInt(values['CAP1_R16_C1']))) {
        rd16 = parseInt(values['CAP1_R16_C1']);
    }

    if (rd16 <= 0) {
        var errorMsg = Drupal.t('Error code: 06-019 Cap.1 Rindul.16 > 0. - Rindul.16 =   @value', { '@value': rd16 });
 
        webform.errors.push({
            'fieldName': 'CAP1_R16_C1',
            'weight': 19,
            'msg': errorMsg
        });
    }




    // var Col1Rd3 = 0;
    // var Col1Rd9 = 0;
    // var Col1Cap2 = 0;
    // var Col2Cap2 = 0;

    // if (!isNaN(parseInt(values['dec_table1_row_r03c1']))) {
    //     Col1Rd3 = parseInt(values['dec_table1_row_r03c1']);
    // }

    // if (!isNaN(parseInt(values['dec_table1_row_r09c1']))) {
    //     Col1Rd9 = parseInt(values['dec_table1_row_r09c1']);
    // }

    // if (!isNaN(parseInt(values['dec_tabcon_row_c1_tot']))) {
    //     Col1Cap2 = parseInt(values['dec_tabcon_row_c1_tot']);
    // }

    // if (!isNaN(parseInt(values['dec_tabcon_row_c2_tot']))) {
    //     Col2Cap2 = parseInt(values['dec_tabcon_row_c2_tot']);
    // }

    // if (Col1Rd3 != Col1Cap2) {
    //     webform.errors.push({
    //         'fieldName': 'dec_tabcon_row_c1_tot',
    //         'weight': 22,
    //         'msg': Drupal.t('Error code: 06-022 (Sect.1) Sect.I row.03 col1 = Sect.II row.001 col1')
    //     });
    // }

    // if (Col1Rd9 != Col2Cap2) {
    //     webform.errors.push({
    //         'fieldName': 'dec_tabcon_row_c2_tot',
    //         'weight': 23,
    //         'msg': Drupal.t('Error code: 06-023 (Sect.1) Sect.I row.09 col1 = Sect.II row.001 col2')
    //     });
    // }

    // for (var j = 0; j < arr1_inputs.length; j++) {
    //     var col1 = 0;
    //     var col2 = 0;
    //     var col3 = 0;
    //     var col4 = 0;
    //     var col5 = 0;

    //     if (!isNaN(parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c1']))) {
    //         col1 = parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c1']);
    //     }

    //     if (!isNaN(parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c2']))) {
    //         col2 = parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c2']);
    //     }

    //     if (!isNaN(parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c3']))) {
    //         col3 = parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c3']);
    //     }

    //     if (!isNaN(parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c4']))) {
    //         col4 = parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c4']);
    //     }

    //     if (!isNaN(parseInt(values['dec_table1_row_r' + arr1_inputs[j] + 'c5']))) {
    //         col5 = parseFloat(values['dec_table1_row_r' + arr1_inputs[j] + 'c5']);
    //     }

    //     if (
    //         arr1_inputs[j] === '01' ||
    //         arr1_inputs[j] === '02' ||
    //         arr1_inputs[j] === '03' ||
    //         arr1_inputs[j] === '09' ||
    //         arr1_inputs[j] === '11'
    //     ) {

    //         if (col1 > 0 && col5 === 0) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c5',
    //                 'weight': 31,
    //                 'msg': Drupal.t('Cod eroare: 06-031 (Cap.1) rd.' + arr1_inputs[j] + ' col1 > 0 atunci  COL5 > 0')
    //             });
    //         }
    //     }

    //     if ((col1 == col3) && col4 != 0) {
    //         webform.errors.push({
    //             'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //             'weight': 32,
    //             'msg': Drupal.t('Cod eroare: 06-032 (Cap.1) Daca COL1 pe rd' + arr1_inputs[j] + ' CAP I = COL3  atunci COL4 = 0')
    //         });
    //     }

    //     if (col4 < col2) {
    //         webform.errors.push({
    //             'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //             'weight': 3,
    //             'msg': Drupal.t('Cod eroare: 06-003 (Cap.1) rd.' + arr1_inputs[j] + ' atunci col4 >= col2')
    //         });
    //     }

    //     if (col2 != 0) {
    //         if ((col4 / col2) < 1) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //                 'weight': 4,
    //                 'msg': Drupal.t('Cod eroare: 06-004 (Cap.1) rd.' + arr1_inputs[j] + ' atunci col4/col2 >= 1')
    //             });
    //         }

    //         if ((col4 / col2) > 30) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //                 'weight': 28,
    //                 'msg': Drupal.t('Cod eroare: 06-028 (Cap.1) rd.' + arr1_inputs[j] + ' atunci Col4/Col2 <= 30')
    //             });
    //         }
    //     }

    //     if (arr1_inputs[j] == '32' || arr1_inputs[j] == '33' || arr1_inputs[j] == '34' || arr1_inputs[j] == '92' || arr1_inputs[j] == '93' || arr1_inputs[j] == '94') {

    //         if (col1 != col2) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c2',
    //                 'weight': 2,
    //                 'msg': Drupal.t('Cod eroare: 06-002 (Cap.1) rd.' + arr1_inputs[j] + ' atunci col1 = col2')
    //             });
    //         }
    //     } else {
    //         if (col1 != col2 + col3) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c1',
    //                 'weight': 1,
    //                 'msg': Drupal.t('Cod eroare: 06-001 (Cap.1) rd.' + arr1_inputs[j] + ' col1 = col2+col3')
    //             });
    //         }
    //     }

    //     if (arr1_inputs[j] == '03' || arr1_inputs[j] == '31' || arr1_inputs[j] == '09') {
    //         col1_rd3 = col1;
    //         col2_rd3 = col2;
    //         col3_rd3 = col3;
    //         col4_rd3 = col4;

    //         col1_rd31 = col1;
    //         col2_rd31 = col2;
    //         col3_rd31 = col3;
    //         col4_rd31 = col4;

    //         col1_rd9 = col1;
    //         col2_rd9 = col2;
    //         col3_rd9 = col3;
    //         col4_rd9 = col4;
    //     }

    //     if (arr1_inputs[j] == '04') {
    //         col1_rd4 = col1;
    //         col2_rd4 = col2;
    //         col3_rd4 = col3;
    //         col4_rd4 = col4;

    //         if (col1_rd3 < col1_rd4) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c1',
    //                 'weight': 6,
    //                 'msg': Drupal.t('Cod eroare: 06-006 (Cap.1) rd.' + arr1_inputs[j] + ' atunci rd.03 >= rd.04')
    //             });
    //         }

    //         if (col2_rd3 < col2_rd4) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c2',
    //                 'weight': 6,
    //                 'msg': Drupal.t('Cod eroare: 06-006 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.03>=rd.04')
    //             });
    //         }

    //         if (col3_rd3 < col3_rd4) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c3',
    //                 'weight': 6,
    //                 'msg': Drupal.t('Cod eroare: 06-006 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.03>=rd.04')
    //             });
    //         }

    //         if (col4_rd3 < col4_rd4) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //                 'weight': 6,
    //                 'msg': Drupal.t('Cod eroare: 06-006 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.03>=rd.04')
    //             });
    //         }
    //     }

    //     if (arr1_inputs[j] == '10') {
    //         col1_rd10 = col1;
    //         col2_rd10 = col2;
    //         col3_rd10 = col3;
    //         col4_rd10 = col4;

    //         if (col1_rd10 > col1_rd9) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c1',
    //                 'weight': 9,
    //                 'msg': Drupal.t('Cod eroare: 06-009 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.09>=rd.10')
    //             });
    //         }

    //         if (col2_rd10 > col2_rd9) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c2',
    //                 'weight': 9,
    //                 'msg': Drupal.t('Cod eroare: 06-009 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.09>=rd.10')
    //             });
    //         }

    //         if (col3_rd10 > col3_rd9) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c3',
    //                 'weight': 9,
    //                 'msg': Drupal.t('Cod eroare: 06-009 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.09>=rd.10')
    //             });
    //         }

    //         if (col4_rd10 > col4_rd9) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //                 'weight': 9,
    //                 'msg': Drupal.t('Cod eroare: 06-009 (Cap.1) rd.' + arr1_inputs[j] + '  atunci rd.09>=rd.10')
    //             });
    //         }
    //     }

    //     if (arr1_inputs[j] == '05') {
    //         col1_rd5 = col1;
    //         col2_rd5 = col2;
    //         col3_rd5 = col3;
    //         col4_rd31 = col4;

    //         if (col1_rd31 < col1_rd5) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c1',
    //                 'weight': 8,
    //                 'msg': Drupal.t('Cod eroare: 06-008 (Cap.1) rd.' + arr1_inputs[j] + '   atunci rd.31>=rd.05')
    //             });
    //         }

    //         if (col2_rd31 < col2_rd5) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c2',
    //                 'weight': 8,
    //                 'msg': Drupal.t('Cod eroare: 06-008 (Cap.1) rd.' + arr1_inputs[j] + '   atunci rd.31>=rd.05')
    //             });
    //         }

    //         if (col3_rd31 < col3_rd5) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c3',
    //                 'weight': 8,
    //                 'msg': Drupal.t('Cod eroare: 06-008 (Cap.1) rd.' + arr1_inputs[j] + '   atunci rd.31>=rd.05')
    //             });
    //         }

    //         if (col4_rd31 < col4_rd5) {
    //             webform.errors.push({
    //                 'fieldName': 'dec_table1_row_r' + arr1_inputs[j] + 'c4',
    //                 'weight': 8,
    //                 'msg': Drupal.t('Cod eroare: 06-008 (Cap.1) rd.' + arr1_inputs[j] + '   atunci rd.31>=rd.05')
    //             });
    //         }
    //     }
    // }

    var fields_table1_cod = jQuery('#tabcon tbody tr td:nth-child(3)').find('input');
    var fields_table1_c1 = jQuery('#tabcon tbody tr td:nth-child(4)').find('input');
    var fields_table1_c2 = jQuery('#tabcon tbody tr td:nth-child(5)').find('input');

    var CSI_4 = 0;
    var CSI_10 = 0;
    var Col1 = 0;
    var Col2 = 0;

    if (!isNaN(parseInt(values['dec_table1_row_r04c1']))) {
        CSI_4 = parseInt(values['dec_table1_row_r04c1']);
    }

    if (!isNaN(parseInt(values['dec_table1_row_r10c1']))) {
        CSI_10 = parseInt(values['dec_table1_row_r10c1']);
    }

    // for (var i = 0; i < values.dec_dinamicTable_row_c1.length; i++) {

    //     var cod_tara = jQuery(fields_table1_cod[i]).val();

    //     if (
    //         cod_tara === '051' ||
    //         cod_tara === '031' ||
    //         cod_tara === '112' ||
    //         cod_tara === '398' ||
    //         cod_tara === '417' ||
    //         cod_tara === '643' ||
    //         cod_tara === '762' ||
    //         cod_tara === '795' ||
    //         cod_tara === '804' ||
    //         cod_tara === '860'
    //     ) {

    //         if (!isNaN(parseInt(jQuery(fields_table1_c1[i]).val()))) {
    //             Col1 = Col1 + parseInt(jQuery(fields_table1_c1[i]).val());
    //         }

    //         if (!isNaN(parseInt(jQuery(fields_table1_c2[i]).val()))) {
    //             Col2 = Col2 + parseInt(jQuery(fields_table1_c2[i]).val());
    //         }
    //     }
    // }

    // if (Col1 !== CSI_4) {
    //     webform.errors.push({
    //         'fieldName': 'dec_table1_row_r04c1',
    //         'weight': 24,
    //         'msg': Drupal.t('Cod eroare: 06-024 (Cap.1) Cap.I rd.04 col1 = Cap.2 col.1 suma rindurilor(051,031,112,398,417,643,762,795,804,860)')
    //     });
    // }

    // if (Col2 !== CSI_10) {
    //     webform.errors.push({
    //         'fieldName': 'dec_table1_row_r10c1',
    //         'weight': 25,
    //         'msg': Drupal.t('Cod eroare: 06-025 (Cap.1) Cap.I rd.10 col1 = Cap.2 col.2 suma rindurilor(051,031,112,398,417,643,762,795,804,860)')
    //     });
    // }


// // Start ----------------------------Cod eroare: Wrong fiscal period!

//     // Function to get the current trimestrial (1 to 4)
//     function get_trimestrial() {
//         var date = new Date();
//         return Math.ceil((date.getMonth() + 1) / 3);
//     }

//     // Function to get the current year
//     function get_current_year() {
//         var date = new Date();
//         return date.getFullYear();
//     }

//     // Get the values from Drupal settings and trim whitespace
//     var trimestrialFromDrupal = Drupal.settings.mywebform.values.TRIM.trim();
//     var yearFromDrupal = Drupal.settings.mywebform.values.YEAR.trim();

//     // Get the current trimestrial and year using the defined functions
//     var currentTrimestrial = get_trimestrial();
//     var currentYear = get_current_year();

//     // Convert the trimmed values to numbers for comparison
//     trimestrialFromDrupal = parseFloat(trimestrialFromDrupal);
//     yearFromDrupal = parseInt(yearFromDrupal);

//     // Compare the values and show an error message if conditions are not met
//     if (trimestrialFromDrupal === currentTrimestrial && yearFromDrupal === currentYear) {
//         webform.errors.push({
//             'fieldName': 'TRIM',
//             'msg': Drupal.t('Cod eroare: Wrong fiscal period!')
//         });
//     }


// // End  ----------------------------Cod eroare: Wrong fiscal period!

    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['turism1_23'] = 1;
    validateWebform();
};



function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.weight = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.weight = 9999;
    }

    return toFloat(a.weight) - toFloat(b.weight);
}
