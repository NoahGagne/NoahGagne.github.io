import {BigNumber} from '/bignumber.js-9.1.1/bignumber.js';

const affichageTexte = document.getElementById('affichageTexte');
const bouton1 = document.getElementById('un');
const bouton2 = document.getElementById('deux');
const bouton3 = document.getElementById('trois');
const bouton4 = document.getElementById('quatre');
const bouton5 = document.getElementById('cinq');
const bouton6 = document.getElementById('six');
const bouton7 = document.getElementById('sept');
const bouton8 = document.getElementById('huit');
const bouton9 = document.getElementById('neuf');
const bouton0 = document.getElementById('zero');
const boutonPoint = document.getElementById('point');
const boutonEgal = document.getElementById('egal');
const boutonPlus = document.getElementById('addition');

let nombrePrecedent = new BigNumber(0);
let total = new BigNumber(0);
let operationPrecedente = '';
let resetOnNextImput = false;
let totalAffiche = false;

bouton1.addEventListener("click", () => ajouterCaractere(('1')));
bouton2.addEventListener("click", () => ajouterCaractere(('2')));
bouton3.addEventListener("click", () => ajouterCaractere(('3')));
bouton4.addEventListener("click", () => ajouterCaractere(('4')));
bouton5.addEventListener("click", () => ajouterCaractere(('5')));
bouton6.addEventListener("click", () => ajouterCaractere(('6')));
bouton7.addEventListener("click", () => ajouterCaractere(('7')));
bouton8.addEventListener("click", () => ajouterCaractere(('8')));
bouton9.addEventListener("click", () => ajouterCaractere(('9')));
bouton0.addEventListener("click", () => ajouterCaractere(('0')));

boutonPoint.addEventListener("click", function() {
    if (!affichageTexte.innerText.includes(".") && affichageTexte.innerText) {
        ajouterCaractere(('.'));
    }
});

boutonEgal.addEventListener("click", function() {
    if (!totalAffiche) nombrePrecedent = new BigNumber(parseFloat(affichageTexte.innerText));
    switch (operationPrecedente) {
        case '+':
            additionner();
            break;
        default:
            total = nombrePrecedent;
    }
    affichageTexte.innerText = total;
    resetOnNextImput = false;
    totalAffiche = true;
});

boutonPlus.addEventListener("click", function() {
    if (!totalAffiche) {
        nombrePrecedent = new BigNumber(parseFloat(affichageTexte.innerText));
        additionner();
    }
    operationPrecedente = '+';
    resetOnNextImput = true;
})


function ajouterCaractere(nouveauTexte) {

    if (resetOnNextImput) reset(true);
    else if (totalAffiche) reset (false);
    affichageTexte.innerText += nouveauTexte;
}


function additionner() {
    total.plus(nombrePrecedent);
    resetOnNextImput = true;
}

function reset(garderTotal) {
    if (garderTotal === false) {
        total = 0;
        nombrePrecedent = 0;
        totalAffiche = false;
        operationPrecedente = '';
    }
    affichageTexte.innerText = null;
    resetOnNextImput = false;
    totalAffiche = false;
}
