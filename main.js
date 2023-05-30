window.addEventListener('DOMContentLoaded', (event) => {
    goApe();
});

const setTheStore = async (store) => {
    const storeHTML = `
    <dt class="name">
        <h1>
            <a href="/"><img src="${store.logo}" /></a>
            ${store.name}
        </h1>
    </dt>
    <dd>${store.description}</dd>
    <dd class="address">${store.address}</dd>
    <dd class="phone"><a href="tel:${store.phone}">${store.phone}</dd>
    `;
    document.getElementById('store').innerHTML = storeHTML;
    document.getElementById('store').classList.remove('ping');
};

const stockTheStore = async (stoko) => {
    const dijo = document.getElementById('dijo');
    dijo.classList.remove('ping');

    stoko.forEach((foodGroup, index) => {
        const group = document.createElement('div');
        group.classList.add('food-group', foodGroup.type);
        const groupItemsList = document.createElement('ul');
        foodGroup.options.forEach((foodItem) => {
            const item = document.createElement('li');
            item.classList.add('food-item', `${foodItem.name}`);
            item.innerHTML = `
                <a href="#${foodGroup.type}-${foodItem.name}" class="picture pulse">
                    <img src="${foodItem.picture}" class="pulse"  />
                </a>
                <div class="details">
                    <h3 class="name">${foodItem.name}</h3>
                    <strong class="price">R${foodItem.price},</strong>
                    <span class="quantity">${foodItem.weight}g</span>
                </div>
            `;
            groupItemsList.appendChild(item);
            // item.querySelector('a').style.backgroundImage()
            item.querySelector('img').addEventListener('load', (e) => {
                e.target.parentElement.classList.remove('pulse');
            });
            //console.log(item.querySelector('img'));
        });

        group.appendChild(groupItemsList);
        dijo.append(group);
    });
};

const goApe = async () => {
    const data = await fetch('./data.json');
    const stoko = await data.json();
    await setTheStore(stoko.store);
    await stockTheStore(stoko.dijo);
};
