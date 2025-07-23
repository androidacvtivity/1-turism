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
                    'Cod eroare: 06-006 (Cap.1) col.@col: rd.03 (@v3) < rd.04 (@v4)',
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