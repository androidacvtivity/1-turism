function validate_06_033() {
    const values = Drupal.settings.mywebform.values;
    const randuri = ['01', '02', '03', '09', '11'];

    randuri.forEach(r => {
        const v2 = parseInt(values[`CAP1_R${r}_C2`]) || 0;
        const v3 = parseInt(values[`CAP1_R${r}_C3`]) || 0;
        const v5 = parseFloat(values[`CAP1_R${r}_C5`]) || 0;

        if (v2 === 0 && v3 > 0 && (v5 / v3) > 1) {
            webform.warnings.push({
                fieldName: `CAP1_R${r}_C5`,
                index: 0,
                weight: 33,
                msg: concatMessage('06-033', '', Drupal.t(
                    'Cod eroare: 06-033 (Cap.1) Rând @r: Dacă col.2 este 0 și col.3 > 0, atunci col.5 / col.3 ≤ 1 (este @rap)',
                    {
                        '@r': r,
                        '@rap': (v5 / v3).toFixed(2)
                    }
                ))
            });
        }
    });
}