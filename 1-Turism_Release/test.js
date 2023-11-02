for (t = 1; t <= 1; t++) {
    var gridName = 'dinamicTable' + t;
    //dinamicTable1
    var gridId = '#' + gridName;
    //#dinamicTable1
    var field_prefix = 'dec_' + gridName;
    //dec_dinamicTable1
    var table_num = '0' + t + '0';
    //'010'

    if (t == 10) {
        table_num = '130';
    } else if (t == 11) {
        table_num = '140';
    }

    var static_field_prefix = 'dec_table' + t + '_row_r' + table_num;
    //t = 1
    //dec_table1_row_r010


    var cb_field = field_prefix + '_row_cb';
    //dec_dinamicTable1_row_cb
    var cc_field = field_prefix + '_row_cc';
    //dec_dinamicTable1_row_cc


    var c1_field = field_prefix + '_row_c1';
    var c2_field = field_prefix + '_row_c2';
    var c3_field = field_prefix + '_row_c3';
    var c4_field = field_prefix + '_row_c4';
    // dec_dinamicTable1_row_c4

    var c5_field = field_prefix + '_row_c5';
    var c6_field = field_prefix + '_row_c6';

    var c1_static_field = static_field_prefix + 'c1';
    var c2_static_field = static_field_prefix + 'c2';
    var c3_static_field = static_field_prefix + 'c3';
    var c4_static_field = static_field_prefix + 'c4';
    var c5_static_field = static_field_prefix + 'c5';
    var c6_static_field = static_field_prefix + 'c6';



    var c1_is_negative = false;
    var c2_is_negative = false;
    var c3_is_negative = false;
    var c6_is_negative = false;


    for (i = 0; i < values[cb_field].length; i++) {
        
        var some_field_is_filled = values[c1_field][i] != '' || values[c2_field][i] != '' || values[c3_field][i] != '' || values[c5_field][i] != '';

        // some_field_is_filled ? 

        if (values.hasOwnProperty(c4_field)) {
            some_field_is_filled = some_field_is_filled || values[c4_field][i] != '';
        }

        if (!values[cc_field][i]) {
            if (some_field_is_filled) {
                webform.errors.push({
                    'fieldName': cc_field,
                    'weight': 24,
                    'index': i,
                    'msg': concatMessage('13-024', '', Drupal.t('In Rind @row Codul tarii trebue selectat', {
                        '@row': table_num
                    }))
                });
            }
        } else {


            if (!some_field_is_filled || (values[c1_field][i] + values[c2_field][i] + values[c3_field][i] + values[c5_field][i]) == 0) {
                webform.errors.push({
                    'fieldName': cc_field,
                    'weight': 35,
                    'index': i,
                    'msg': concatMessage('13-035', '', Drupal.t('In Rind @row Tara @country lipsesc datele', {
                        '@row': table_num,
                        '@country': values[cc_field][i],
                    }))
                });
            }
        }

        if (t == 1) {
            if (some_field_is_filled || values[cc_field][i]) {
                t010_is_filled = true;
            }
        }


        if (is_negative(values[c1_field][i])) {
            c1_is_negative = true;
            webform.errors.push({
                'fieldName': c1_field,
                'index': i,
                'msg': ''
            });
        }

        if (is_negative(values[c2_field][i])) {
            c2_is_negative = true;
            webform.errors.push({
                'fieldName': c2_field,
                'index': i,
                'msg': ''
            });
        }

        if (is_negative(values[c3_field][i])) {
            c3_is_negative = true;
            webform.errors.push({
                'fieldName': c3_field,
                'index': i,
                'msg': ''
            });
        }

        if (is_negative(values[c6_field][i])) {
            c6_is_negative = true;
            webform.errors.push({
                'fieldName': c6_field,
                'index': i,
                'msg': ''
            });
        }
    }


//--------------------------------------------

    if (is_negative(values[c1_static_field])) {
        c1_is_negative = true;
        webform.errors.push({
            'fieldName': c1_static_field,
            'index': 0,
            'msg': ''
        });
    }

    if (is_negative(values[c2_static_field])) {
        c2_is_negative = true;
        webform.errors.push({
            'fieldName': c2_static_field,
            'index': 0,
            'msg': ''
        });
    }

    if (is_negative(values[c3_static_field])) {
        c3_is_negative = true;
        webform.errors.push({
            'fieldName': c3_static_field,
            'index': 0,
            'msg': ''
        });
    }

    if (is_negative(values[c6_static_field])) {
        c6_is_negative = true;
        webform.errors.push({
            'fieldName': c6_static_field,
            'index': 0,
            'msg': ''
        });
    }

    var negative_error_code = t < 10 ? '13-036' : '13-037';
    var negative_error_weight = t < 10 ? 36 : 37;
    var negative_error_msg = Drupal.t("Valoarea trebuie sa fie pozitivă");
    if (c1_is_negative) {
        webform.errors.push({
            'fieldName': '',
            'index': 0,
            'weight': negative_error_weight,
            'msg': Drupal.settings.mywebform.fields[c1_static_field].title + ' - ' + concatMessage(negative_error_code, '', negative_error_msg)
        });
    }

    if (c2_is_negative) {
        webform.errors.push({
            'fieldName': '',
            'index': 0,
            'weight': negative_error_weight,
            'msg': Drupal.settings.mywebform.fields[c2_static_field].title + ' - ' + concatMessage(negative_error_code, '', negative_error_msg)
        });
    }

    if (c3_is_negative) {
        webform.errors.push({
            'fieldName': '',
            'index': 0,
            'weight': negative_error_weight,
            'msg': Drupal.settings.mywebform.fields[c3_static_field].title + ' - ' + concatMessage(negative_error_code, '', negative_error_msg)
        });
    }

    if (c6_is_negative) {
        webform.errors.push({
            'fieldName': '',
            'index': 0,
            'weight': negative_error_weight,
            'msg': Drupal.settings.mywebform.fields[c6_static_field].title + ' - ' + concatMessage(negative_error_code, '', negative_error_msg)
        });
    }
}