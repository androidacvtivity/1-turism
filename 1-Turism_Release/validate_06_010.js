function validate_06_010() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const coloane = ['C1', 'C2', 'C4'];
    const randuri_sum = ['91', '92', '93', '94'];

    coloane.forEach(col => {
        const field_r09 = `CAP1_R09_${col}`;
        const val_r09 = parseInt(values[field_r09]) || 0;

        let suma = 0;
        randuri_sum.forEach(r => {
            const field = `CAP1_R${r}_${col}`;
            suma += parseInt(values[field]) || 0;
        });

        if (val_r09 !== suma) {
            webform.errors.push({
                fieldName: field_r09,
                index: 0,
                weight: 10,
                msg: concatMessage('06-010', '', Drupal.t(
                    'Cod eroare: 06-010 (Cap.1) Condiție: rd.09 = rd.(91+92+93+94). col.@col: rd.09 (@v9) ≠ sum = @sum',
                    {
                        '@col': col,
                        '@v9': val_r09,
                        '@sum': suma
                    }
                ))
            });
        }
    });
}