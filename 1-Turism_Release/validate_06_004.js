function validate_06_004() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    for (let i = 1; i <= 99; i++) {
        const r = String(i).padStart(2, '0');
        if (r === '16') continue;

        const f2 = `CAP1_R${r}_C2`;
        const f4 = `CAP1_R${r}_C4`;

        if (values[f2] !== undefined && values[f4] !== undefined) {
            const v2 = parseFloat(values[f2]) || 0;
            const v4 = parseFloat(values[f4]) || 0;

            if (v2 > 0 && (v4 / v2) < 1) {
                webform.errors.push({
                    fieldName: f4,
                    index: 0,
                    weight: 4,
                    msg: concatMessage('06-004', '', Drupal.t(
                        'Cod eroare: 06-004 (Cap.1) Rând @r: col.4 / col.2 = @rap < 1',
                        {
                            '@r': r,
                            '@rap': (v4 / v2).toFixed(2)
                        }
                    ))
                });
            }
        }
    }
}