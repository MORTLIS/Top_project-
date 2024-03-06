const BASE_URL = '/api/v1';

// Добавить прокрутку к форме
document.querySelectorAll('.scroll-lead-form').forEach((elem) => {
    elem.onclick = () => {
        const div = document.getElementById('lead-form-section');
        const input = document.getElementById('lead-form-name');

        if (div) {
            div.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        if (input) {
            input.focus();
        }
        return false;
    }
})


document.getElementById('auctionSelect').onchange = (e) => {
    const auctionType = e.target.value;
    const url = BASE_URL + `/calculator/locations?auction=${auctionType}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const select = document.getElementById('locationSelect');
            const docFragment = document.createDocumentFragment();

            // Assuming the data is an array of objects with 'value' and 'text' properties
            data.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.text;
                docFragment.appendChild(opt); // Append option to the document fragment
            });

            select.replaceChildren(docFragment);
            select.disabled = false;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
};


document.getElementById("calculatorSubmitForm").onsubmit = () => {
    const costField = document.getElementById("costField")
    const locationSelect = document.getElementById("locationSelect")
    const engineTypeSelect = document.getElementById("engineTypeSelect")
    const engineSizeField = document.getElementById("engineSizeField")
    const ageSelect = document.getElementById("ageSelect")


    // Функция для проверки, является ли значение положительным числом
    function isPositiveNumber(value) {
        const number = parseFloat(value);
        return !isNaN(number) && isFinite(number) && number > 0;
    }

    let isValid = true; // Флаг валидности формы

    // Проверяем поля cost, location_id и engine_type
    if (!isPositiveNumber(costField.value)) {
        alert("Некоректно вказана вартість");
        isValid = false;
    }

    if (!isPositiveNumber(locationSelect.value)) {
        alert("Оберіть аукціон та локацію");
        isValid = false;
    }

    if (!isPositiveNumber(engineSizeField.value)) {
        alert("Некоректно вказаний обʼєм двигуна");
        isValid = false;
    }

    // Если форма валидна, продолжаем обработку
    if (isValid) {
        const formData = {
            cost: costField.value,
            place_id: locationSelect.value,
            engine_type: engineTypeSelect.value,
            engine_size: engineSizeField.value,
            age: ageSelect.value
        };

        fetch(BASE_URL + '/calculator/calculate', {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json' // Тип содержимого
            },
            body: JSON.stringify(formData) // Сериализуем данные формы в JSON
        }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }
        ).then(data => {
            console.log(data)
            document.getElementById('totalTax').innerText = data.tax
            document.getElementById('totalDelivery').innerText = data.delivery
            document.getElementById('totalSum').innerText = data.total
        })
    }


    return false
}
