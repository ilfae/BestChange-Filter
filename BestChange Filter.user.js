// ==UserScript==
// @name        BestChange Filter
// @version     1.3
// @namespace    KittenWoof
// @match       https://www.bestchange.ru/*
// @grant       none
// @updateURL    https://github.com/ilfae/BestChange-Filter/raw/refs/heads/main/BestChange%20Filter.user.js
// @downloadURL  https://github.com/ilfae/BestChange-Filter/raw/refs/heads/main/BestChange%20Filter.user.js
// @icon         https://www.bestchange.ru/favicon.ico
// ==/UserScript==

const filterMenu = document.createElement("div");
filterMenu.style.position = "fixed";
filterMenu.style.top = "10px";
filterMenu.style.right = "10px";
filterMenu.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
filterMenu.style.border = "1px solid #ccc";
filterMenu.style.padding = "10px";
filterMenu.style.zIndex = "1000";
filterMenu.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";

filterMenu.innerHTML = `
    <label style="margin-right: 5px;">Ваш бюджет: <input type="number" id="filterMax" style="width: 60px; padding: 5px; border: 1px solid #ccc; border-radius: 3px;"></label>
    <button id="applyFilter" style="padding: 5px 10px; border: none; border-radius: 3px; background-color: #4CAF50; color: white; cursor: pointer;">Фильтровать</button>
    <button id="resetFilter" style="padding: 5px 10px; border: none; border-radius: 3px; background-color: #f44336; color: white; cursor: pointer;">Сбросить</button>
`;

document.body.appendChild(filterMenu);

const maxInput = document.getElementById("filterMax");
let max = Infinity;
let filterInterval;

function filterRows(max) {
    const rows = document.querySelectorAll("div.fm1");
    rows.forEach(row => {
        const value = parseInt(row.textContent.replace(/\D/g, ""), 10);
        const parentRow = row.closest("tr");
        if (value <= max) {
            parentRow.style.display = "";
        } else {
            parentRow.style.display = "none";
        }
    });
}

document.getElementById("applyFilter").addEventListener("click", () => {
    max = parseInt(maxInput.value, 10) || Infinity;
    filterRows(max);

    if (filterInterval) {
        clearInterval(filterInterval);
    }

    filterInterval = setInterval(() => {
        max = parseInt(maxInput.value, 10) || Infinity;
        filterRows(max);
    }, 1000);
});

document.getElementById("resetFilter").addEventListener("click", () => {
    max = Infinity;
    maxInput.value = '';
    filterRows(max);

    clearInterval(filterInterval);
    filterInterval = null;
});
