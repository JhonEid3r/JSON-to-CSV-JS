const jsonText = document.querySelector('#jsonText');
const csvText = document.querySelector('#csvText');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e => {
    convertJSONtoCSV();
});

function convertJSONtoCSV() {
    let json;
    let keys = [];
    let values = [];

    try {
        json = JSON.parse(jsonText.value);
    } catch (error) {
        console.log('Incorrect format JSON', error);
        alert('Incorrect format JSON');
    }

    if (Array.isArray(json)) {
        json.forEach(item => {
            // Extraer nombres de las propiedades del objeto
            const nkeys = Object.keys(item);

            if (keys.length === 0) {
                keys = [...nkeys];
            } else {
                if (nkeys.length !== keys.length) {
                    throw new Error('Number of keys are different');
                } else {
                    console.log('Ok', nkeys);
                }
            }
            const row = keys.map(k => {
                return item[k];
            });
            values.push([...row]);
        });
        console.log(keys, values);
        values.unshift(keys);
        const text = values.map(v => v.join(',')).join('\n');
        csvText.value = text;
    } else {
        alert('Is not an array of objects');
    }
}
