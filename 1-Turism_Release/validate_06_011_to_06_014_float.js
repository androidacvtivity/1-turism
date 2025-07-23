function validate_06_011() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r11 = toNum(values[`CAP1_R11_${col}`]) || 0;
        const r01 = toNum(values[`CAP1_R01_${col}`]) || 0;
        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;

        const suma = r01 + r02;
        if (r11 !== suma) {
            webform.errors.push({
                fieldName: `CAP1_R11_${col}`,
                index: 0,
                weight: 11,
                msg: concatMessage('06-011', '', Drupal.t(
                    'Cod eroare: 06-011 (Cap.1) col.@col: rd.11 (@v11) ≠ rd.01 + rd.02 (@v01 + @v02 = @sum)',
                    {
                        '@col': col, '@v11': r11, '@v01': r01, '@v02': r02, '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_012() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r11 = toNum(values[`CAP1_R11_${col}`]) || 0;
        const r01 = toNum(values[`CAP1_R01_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;

        const suma = r01 + r03 + r09;
        if (r11 !== suma) {
            webform.errors.push({
                fieldName: `CAP1_R11_${col}`,
                index: 0,
                weight: 12,
                msg: concatMessage('06-012', '', Drupal.t(
                    'Cod eroare: 06-012 (Cap.1) col.@col: rd.11 (@v11) ≠ rd.01 + rd.03 + rd.09 (@v01 + @v03 + @v09 = @sum)',
                    {
                        '@col': col, '@v11': r11, '@v01': r01, '@v03': r03, '@v09': r09, '@sum': suma
                    }
                ))
            });
        }
    });
}

function validate_06_013() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;

        if (r02 === r03 && r09 !== 0) {
            webform.errors.push({
                fieldName: `CAP1_R09_${col}`,
                index: 0,
                weight: 13,
                msg: concatMessage('06-013', '', Drupal.t(
                    'Cod eroare: 06-013 (Cap.1) col.@col: Dacă rd.02 = rd.03 (@v02), atunci rd.09 trebuie să fie 0 (este @v09)',
                    {
                        '@col': col, '@v02': r02, '@v09': r09
                    }
                ))
            });
        }
    });
}

function validate_06_014() {
    const values = Drupal.settings.mywebform.values;
    const coloane = ['C1', 'C2', 'C3', 'C4', 'C5'];

    coloane.forEach(col => {
        const toNum = col === 'C5' ? parseFloat : parseInt;

        const r02 = toNum(values[`CAP1_R02_${col}`]) || 0;
        const r09 = toNum(values[`CAP1_R09_${col}`]) || 0;
        const r03 = toNum(values[`CAP1_R03_${col}`]) || 0;

        if (r02 === r09 && r03 !== 0) {
            webform.errors.push({
                fieldName: `CAP1_R03_${col}`,
                index: 0,
                weight: 14,
                msg: concatMessage('06-014', '', Drupal.t(
                    'Cod eroare: 06-014 (Cap.1) col.@col: Dacă rd.02 = rd.09 (@v02), atunci rd.03 trebuie să fie 0 (este @v03)',
                    {
                        '@col': col, '@v02': r02, '@v03': r03
                    }
                ))
            });
        }
    });
}