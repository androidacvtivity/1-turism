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