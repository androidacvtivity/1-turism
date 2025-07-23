function validate_06_002() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const randuri = ['32', '33', '34', '92', '93', '94'];

    randuri.forEach(r => {
        const f1 = `CAP1_R${r}_C1`;
        const f2 = `CAP1_R${r}_C2`;

        const v1 = parseInt(values[f1]) || 0;
        const v2 = parseInt(values[f2]) || 0;

        if (v1 !== v2) {
            webform.errors.push({
                fieldName: f1,
                index: 0,
                weight: 2,
                msg: concatMessage('06-002', '', Drupal.t(
                    'Cod eroare: 06-002 (Cap.1) Rând @r: col.1 (@v1) ≠ col.2 (@v2)',
                    {
                        '@r': r,
                        '@v1': v1,
                        '@v2': v2
                    }
                ))
            });
        }
    });
}