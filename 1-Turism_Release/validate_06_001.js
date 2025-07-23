function validate_06_001() {
    const values = Drupal.settings.mywebform.values;
    const id = 'CAP.1';

    const randuri = ['01', '02', '03', '04', '31', '05', '09', '10', '91', '11'];

    randuri.forEach(r => {
        const f1 = `CAP1_R${r}_C1`;
        const f2 = `CAP1_R${r}_C2`;
        const f3 = `CAP1_R${r}_C3`;

        const v1 = parseInt(values[f1]) || 0;
        const v2 = parseInt(values[f2]) || 0;
        const v3 = parseInt(values[f3]) || 0;

        if (v1 !== v2 + v3) {
            webform.errors.push({
                fieldName: f1,
                index: 0,
                weight: 1,
                msg: concatMessage('06-001', '', Drupal.t(
                    'Cod eroare: 06-001 (Cap.1) Rând @r: col.1 (@v1) ≠ col.2 + col.3 (@v2 + @v3 = @vsum)',
                    {
                        '@r': r,
                        '@v1': v1,
                        '@v2': v2,
                        '@v3': v3,
                        '@vsum': v2 + v3
                    }
                ))
            });
        }
    });
}