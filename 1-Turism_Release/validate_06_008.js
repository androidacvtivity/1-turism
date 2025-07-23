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
                    'Cod eroare: 06-008 (Cap.1) col.@col: rd.31 (@v31) < rd.05 (@v05)',
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