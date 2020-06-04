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
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/municipios`)
        .then(res => res.json())
        .then(response => {
            for (const { nome, id }
                of response) {
                citySelect.innerHTML += `<option value="${nome}">${nome}</option>`;
            }

            citySelect.disabled = false;
        });
};

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("imput[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover uma classe javascript

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alredySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //sera true ou false
        return itemFound
    })

    if (alredySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems

}