document.addEventListener("DOMContentLoaded", function() {
    visualizzaDettagliPiatto();
    aggiungiBottoneTornaAlMenu();
});

function visualizzaDettagliPiatto() {
    try {
        var params = new URLSearchParams(window.location.search);
        var nome = params.get('nome');
        var prezzo = params.get('prezzo');

        if (nome && prezzo) {
            var dettagliPiatto = document.getElementById("dettagliPiatto");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    gestisciRispostaXML(this, nome);
                }
            };
            xhttp.open("GET", "menu.xml", true);
            xhttp.send();
        } else {
            throw new Error("Dettagli del piatto non disponibili.");
        }
    } catch (error) {
        console.error(error.message);
    }
}

function gestisciRispostaXML(xmlhttp, nomePiatto) {
    var xmlDoc = xmlhttp.responseXML;
    var piatti = xmlDoc.getElementsByTagName("piatto");

    for (var i = 0; i < piatti.length; i++) {
        var nome = piatti[i].getElementsByTagName("nome")[0].textContent;

        if (nome === nomePiatto) {
            var prezzo = piatti[i].getElementsByTagName("prezzo")[0].textContent;
            
            // Cerca l'elemento ingredienti
            var ingredientiElement = piatti[i].getElementsByTagName("ingredienti")[0];

            // Ottieni il testo degli ingredienti se l'elemento è presente, altrimenti usa una stringa vuota
            var ingredienti = ingredientiElement ? ingredientiElement.textContent : '';

            // Aggiorna la pagina con le informazioni corrette
            var dettagliPiatto = document.getElementById("dettagliPiatto");
            dettagliPiatto.innerHTML = `
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Prezzo:</strong> €${prezzo}</p>
                <p><strong>Ingredienti:</strong> ${ingredienti}</p>
            `;
            
            // Aggiungi l'immagine alla pagina
            caricaImmagineDalXML(nome);
            
            break;  // Interrompi il ciclo dopo aver trovato il piatto
        }
    }
}

function caricaImmagineDalXML(nomePiatto) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            gestisciRispostaXMLImmagine(this, nomePiatto);
        }
    };
    xhttp.open("GET", "menu.xml", true);
    xhttp.send();
}

function gestisciRispostaXMLImmagine(xmlhttp, nomePiatto) {
    var xmlDoc = xmlhttp.responseXML;
    var piatti = xmlDoc.getElementsByTagName("piatto");

    for (var i = 0; i < piatti.length; i++) {
        var nome = piatti[i].getElementsByTagName("nome")[0].textContent;

        if (nome === nomePiatto) {
            var urlImmagine = piatti[i].getElementsByTagName("immagine")[0].textContent;
            aggiungiImmaginePiatto(urlImmagine);
            break;
        }
    }
}

function aggiungiImmaginePiatto(urlImmagine) {
    var immaginePiatto = document.getElementById("immaginePiatto");
    immaginePiatto.src = urlImmagine;
}

function aggiungiBottoneTornaAlMenu() {
    var bottoneTornaAlMenu = document.getElementById("bottoneTornaAlMenu");
    bottoneTornaAlMenu.addEventListener("click", function() {
        window.location.href = "index.html";
    });
}
