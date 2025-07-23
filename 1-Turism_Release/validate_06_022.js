function validate_06_022() {
    const values = Drupal.settings.mywebform.values;

    const field_cap1 = 'CAP1_R03_C1';
    const field_cap2 = 'CAP2_R001_C1';

    const val_cap1 = parseInt(values[field_cap1]) || 0;
    const val_cap2 = parseInt(values[field_cap2]) || 0;

    if (val_cap1 !== val_cap2) {
        webform.errors.push({
            fieldName: field_cap1,
            index: 0,
            weight: 22,
            msg: concatMessage('06-022', '', Drupal.t(
                'Cod eroare: 06-022 (Cap.1) Cap.I rd.03 col1 ≠ Cap.II rd.001 col1'
            ))
        });
    }
}