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
                    'Cod eroare: 06-007 (Cap.1) col.@col: rd.03 (@v3) ≠ sum(rd.31-34) = @sum',
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