function loadMenu() {
    fetch('menu.xml')
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');
            visualizzareMenu(xmlDoc);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
}

function createMenuItem(nome, prezzoUnitario) {
    var elementoPiatto = document.createElement("li");
    elementoPiatto.innerHTML = `<span data-nome="${nome}" data-prezzo="${prezzoUnitario.toFixed(2)}">${nome}</span> - <span>€${prezzoUnitario.toFixed(2)}</span>`;

    elementoPiatto.addEventListener("click", function() {
        var name = this.querySelector("span").getAttribute("data-nome");
        var price = this.querySelector("span").getAttribute("data-prezzo");

        var urlNuovaPagina = "pagina_piatto.html?nome=" + encodeURIComponent(name) + "&prezzo=" + encodeURIComponent(price);
        window.location.href = urlNuovaPagina;
    });

    return elementoPiatto;
}

function visualizzareMenu(xml) {
    var listaMenu = document.getElementById("listamenu");
    var sezioni = xml.getElementsByTagName("section");

    for (var i = 0; i < sezioni.length; i++) {
        var sezione = sezioni[i];
        var categoria = sezione.getAttribute("categoria");
        var piatti = sezione.getElementsByTagName("piatto");

        var elementoSezione = document.createElement("li");
        elementoSezione.innerHTML = `<strong>${categoria}</strong><ul></ul>`;

        for (var j = 0; j < piatti.length; j++) {
            var piatto = piatti[j];
            var nome = piatto.getElementsByTagName("nome")[0].textContent;
            var prezzoUnitario = parseFloat(piatto.getElementsByTagName("prezzo")[0].textContent);

            var elementoPiatto = createMenuItem(nome, prezzoUnitario);
            elementoSezione.querySelector("ul").appendChild(elementoPiatto);
        }

        listaMenu.appendChild(elementoSezione);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadMenu();
});
