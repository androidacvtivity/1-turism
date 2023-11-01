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



function changeIdCountry(elem) {
    var elemnt = jQuery(elem).closest('tr').find('input.input-country');
    if (jQuery(elem).val() == elemnt.val())
        return;

    elemnt.val(jQuery(elem).val()).change();
}


// function changeSelectCountry(elem) {
//     var originalValue = jQuery(elem).val().trim();
//     var trimmedValue = originalValue.replace(/\s/g, ''); // Remove all blank spaces

//     if (trimmedValue === "") {
//         alert('Codul țării este gol');
//         return false;
//     }

//     var optionExists = jQuery(elem).closest('tr').find('select.select-country option[value="' + trimmedValue + '"]').length > 0;

//     if (optionExists) {
//         jQuery(elem).closest('tr').find('select.select-country').val(trimmedValue).change();
//         return true;
//     } else {
//         alert('Nu exista tara cu acest cod: ' + trimmedValue);
//         return false;



//     }
// }

webform.validators.turism1_23 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;


   
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
