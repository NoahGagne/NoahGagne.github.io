import {BigNumber} from '/bignumber.js-9.1.1/bignumber.mjs';

let affichageTexte = document.getElementById('affichageTexte');
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
const boutonMoins = document.getElementById("soustraction");
const boutonMultiplie = document.getElementById('multiplication');
const boutonDivise = document.getElementById('division');

let nombrePrecedent;
let total = new BigNumber(0);
let operationPrecedente = '';
let doitResetAffichage = false;
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

boutonPoint.addEventListener("click", function () {
    if (affichageTexte && !affichageTexte.innerText.includes(".")) {
        ajouterCaractere(('.'));
    }
});

boutonEgal.addEventListener("click", function () {
    if (!totalAffiche) nombrePrecedent = parseFloat(affichageTexte.innerText);
    operationPrecedente ? changerTotal(operationPrecedente) : total.plus(nombrePrecedent);
    affichageTexte.innerText = total;
    doitResetAffichage = false;
    totalAffiche = true;
});

boutonPlus.addEventListener("click", () => operation('+'));
boutonMoins.addEventListener("click", () => operation('-'));
boutonMultiplie.addEventListener("click", () => operation('*'));
boutonDivise.addEventListener("click", () => operation('/'));

function ajouterCaractere(nouveauTexte) {

    if (doitResetAffichage) reset(true);
    else if (totalAffiche) reset(false);
    affichageTexte.innerText += nouveauTexte;
}

function operation(signe) {
    if (!totalAffiche && !doitResetAffichage) {
        nombrePrecedent = parseFloat(affichageTexte.innerText);
        !total.isZero() ? changerTotal() : total.plus(nombrePrecedent);
    }
    operationPrecedente = signe;
    doitResetAffichage = true;
}

function changerTotal(signe) {
    switch (signe) {
        case '+':
            total = total.plus(nombrePrecedent);
            break;
        case '-':
            total = total.minus(nombrePrecedent);
            break;
        case '*':
            total = total.multipliedBy(nombrePrecedent);
            break;
        case '/':
            total = total.dividedBy(nombrePrecedent);
            break;
        default:
            throw new Error('Signe non-valide');
    }


}

function reset(garderTotal) {
    if (garderTotal === false) {
        total = new BigNumber(0);
        nombrePrecedent = 0;
        totalAffiche = false;
        operationPrecedente = '';
    }
    affichageTexte.innerText = '';
    doitResetAffichage = false;
    totalAffiche = false;
}
