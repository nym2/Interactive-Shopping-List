document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingList = document.getElementById('shopping-list');
    
    const items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    items.forEach(item => {
        addItemToDOM(item.text, item.purchased);
    });

    addButton.addEventListener('click', () => {
        const itemText = input.value.trim();
        if (itemText !== '') {
            addItem(itemText);
            input.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList.innerHTML = '';
        localStorage.removeItem('shoppingList');
    });

    shoppingList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const item = e.target;
            item.classList.toggle('purchased');
            updateLocalStorage();
        } else if (e.target.tagName === 'SPAN') {
            const item = e.target.parentElement;
            const newItemText = prompt("Edit item:", item.firstChild.textContent);
            if (newItemText !== null) {
                item.firstChild.textContent = newItemText.trim();
                updateLocalStorage();
            }
        }
    });

    function addItem(text) {
        addItemToDOM(text, false);
        updateLocalStorage();
    }

    function addItemToDOM(text, purchased) {
        const li = document.createElement('li');
        li.textContent = text;
        if (purchased) {
            li.classList.add('purchased');
        }
        const editSpan = document.createElement('span');
        editSpan.textContent = '✏️';
        editSpan.style.cursor = 'pointer';
        editSpan.style.marginLeft = '10px';
        li.appendChild(editSpan);
        shoppingList.appendChild(li);
    }

    function updateLocalStorage() {
        const items = [];
        shoppingList.querySelectorAll('li').forEach(li => {
            items.push({ text: li.firstChild.textContent, purchased: li.classList.contains('purchased') });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
});