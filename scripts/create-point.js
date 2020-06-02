const getUFs = () => {
    const ufSelect = document.querySelector('[name=uf]');
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(response => {
            for (const { nome, id }
                of response) {
                ufSelect.innerHTML += `<option value="${id}">${nome}</option>`;
            }
        });
};

getUFs();

const getCities = ({ target: { value, options, selectedIndex } }) => {
    const citySelect = document.querySelector('[name=city]');
    const stateInput = document.querySelector('[name=state]');

    stateInput.value = options[selectedIndex].text;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`)
        .then(res => res.json())
        .then(response => {
            for (const { nome, id }
                of response) {
                citySelect.innerHTML += `<option value="${id}">${nome}</option>`;
            }

            citySelect.disabled = false;
        });
};

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);