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