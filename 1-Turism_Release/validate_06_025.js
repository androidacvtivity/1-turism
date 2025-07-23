function validate_06_025() {
    const values = Drupal.settings.mywebform.values;

    const cap1_target = 'CAP1_R10_C1';
    const field_cod_tara = 'CAP2_R_CC';
    const field_val = 'CAP2_R_C1';

    const coduri = ['051', '031', '112', '398', '417', '643', '762', '795', '860'];

    const total_cap1 = parseInt(values[cap1_target]) || 0;
    let suma_cap2 = 0;

    for (let i = 0; i < values[field_cod_tara].length; i++) {
        const cod = values[field_cod_tara][i];
        const val = parseInt(values[field_val][i]) || 0;

        if (coduri.includes(cod)) {
            suma_cap2 += val;
        }
    }

    if (total_cap1 !== suma_cap2) {
        webform.errors.push({
            fieldName: cap1_target,
            index: 0,
            weight: 36,
            msg: concatMessage('06-025', '', Drupal.t(
                'Cod eroare: 06-025 (Cap.1) Cap.I rd.10 col1 = Cap.2 col.1 suma rindurilor(051,031,112,398,417,643,762,795,860)'
            ))
        });
    }
}