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