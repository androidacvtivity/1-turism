function validate_06_032() {
    const values = Drupal.settings.mywebform.values;

    const id = 'CAP.1';
    let all_equal_C1_C3 = true;

    // Verificăm dacă toate valorile col1 == col3
    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        const f1 = `CAP1_R${r}_C1`;
        const f3 = `CAP1_R${r}_C3`;

        if (values[f1] !== undefined && values[f3] !== undefined) {
            const v1 = parseInt(values[f1]) || 0;
            const v3 = parseInt(values[f3]) || 0;
            if (v1 !== v3) {
                all_equal_C1_C3 = false;
                break;
            }
        }
    }

    // Dacă toate col1 = col3, verificăm col4 să fie 0
    if (all_equal_C1_C3) {
        for (let i = 1; i <= 99; i++) {
            const r = String(i).padStart(2, '0');
            const f4 = `CAP1_R${r}_C4`;
            if (values[f4] !== undefined) {
                const v4 = parseInt(values[f4]) || 0;
                if (v4 !== 0) {
                    webform.errors.push({
                        fieldName: f4,
                        index: 0,
                        weight: 32,
                        msg: concatMessage('06-032', '', Drupal.t(
                            'Cod eroare: 06-032 (Cap.1) Dacă toate col.1 = col.3, atunci toate col.4 trebuie să fie 0. Rând @r: col.4 = @v4',
                            {
                                '@r': r,
                                '@v4': v4
                            }
                        ))
                    });
                }
            }
        }
    }
}