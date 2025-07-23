function validate_06_015() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C4'];
    const dependent_rows = ['04', '31', '05', '32', '33', '34'];

    coloane.forEach(col => {
        const val_r03 = parseInt(values[`CAP1_R03_${col}`]) || 0;

        if (val_r03 === 0) {
            dependent_rows.forEach(r => {
                const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
                if (val !== 0) {
                    webform.errors.push({
                        fieldName: `CAP1_R${r}_${col}`,
                        index: 0,
                        weight: 15,
                        msg: concatMessage('06-015', '', Drupal.t(
                            'Cod eroare: 06-015 (Cap.1) col.@col: Dacă rd.03 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                            { '@col': col, '@r': r, '@v': val }
                        ))
                    });
                }
            });
        }
    });
}

function validate_06_016() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C4'];
    const dependent_rows = ['10', '91', '92', '93', '94'];

    coloane.forEach(col => {
        const val_r09 = parseInt(values[`CAP1_R09_${col}`]) || 0;

        if (val_r09 === 0) {
            dependent_rows.forEach(r => {
                const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
                if (val !== 0) {
                    webform.errors.push({
                        fieldName: `CAP1_R${r}_${col}`,
                        index: 0,
                        weight: 16,
                        msg: concatMessage('06-016', '', Drupal.t(
                            'Cod eroare: 06-016 (Cap.1) col.@col: Dacă rd.09 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                            { '@col': col, '@r': r, '@v': val }
                        ))
                    });
                }
            });
        }
    });
}

function validate_06_017() {
    const values = Drupal.settings.mywebform.values;
    const col = 'C3';
    const dependent_rows = ['04', '31', '05'];

    const val_r03 = parseInt(values[`CAP1_R03_${col}`]) || 0;

    if (val_r03 === 0) {
        dependent_rows.forEach(r => {
            const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
            if (val !== 0) {
                webform.errors.push({
                    fieldName: `CAP1_R${r}_${col}`,
                    index: 0,
                    weight: 17,
                    msg: concatMessage('06-017', '', Drupal.t(
                        'Cod eroare: 06-017 (Cap.1) col.@col: Dacă rd.03 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                        { '@col': col, '@r': r, '@v': val }
                    ))
                });
            }
        });
    }
}

function validate_06_018() {
    const values = Drupal.settings.mywebform.values;
    const col = 'C3';
    const dependent_rows = ['10', '91'];

    const val_r09 = parseInt(values[`CAP1_R09_${col}`]) || 0;

    if (val_r09 === 0) {
        dependent_rows.forEach(r => {
            const val = parseInt(values[`CAP1_R${r}_${col}`]) || 0;
            if (val !== 0) {
                webform.errors.push({
                    fieldName: `CAP1_R${r}_${col}`,
                    index: 0,
                    weight: 18,
                    msg: concatMessage('06-018', '', Drupal.t(
                        'Cod eroare: 06-018 (Cap.1) col.@col: Dacă rd.09 = 0, atunci rd.@r trebuie să fie 0 (este @v)',
                        { '@col': col, '@r': r, '@v': val }
                    ))
                });
            }
        });
    }
}