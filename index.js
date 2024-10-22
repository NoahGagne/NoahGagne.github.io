import {BigNumber} from '/bignumber.js-9.1.1/bignumber.mjs';

let affichageTexte = document.getElementById('affichageTexte').innerText;
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
let resetAffichage = false;
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
    if (affichageTexte && !affichageTexte.includes(".")) {
        ajouterCaractere(('.'));
    }
});

boutonEgal.addEventListener("click", function () {
    if (!totalAffiche) nombrePrecedent = parseFloat(affichageTexte);
    operationPrecedente ? changerTotal() : total.plus(nombrePrecedent);
    affichageTexte = total;
    resetAffichage = false;
    totalAffiche = true;
});

boutonPlus.addEventListener("click", () => operation('+'));
boutonMoins.addEventListener("click", () => operation('-'));
boutonMultiplie.addEventListener("click", () => operation('*'));
boutonDivise.addEventListener("click", () => operation('/'));

function ajouterCaractere(nouveauTexte) {

    if (resetAffichage) reset(true);
    else if (totalAffiche) reset(false);
    affichageTexte += nouveauTexte;
}

function operation(signe) {
    if (!totalAffiche && !resetAffichage) {
        nombrePrecedent = parseFloat(affichageTexte);
        !total.isZero() ? changerTotal() : total.plus(nombrePrecedent);
    }
    operationPrecedente = signe;
    resetAffichage = true;
}

function changerTotal(signe) {
    switch (signe) {
        case '+':
            total.plus(nombrePrecedent);
            break;
        case '-':
            total.minus(nombrePrecedent);
            break;
        case '*':
            total.multipliedBy(nombrePrecedent);
            break;
        case '/':
            total.dividedBy(nombrePrecedent);
            break;
        default:
            throw new Error('Signe non-valide');
    }
}

function reset(garderTotal) {
    if (garderTotal === false) {
        total = BigNumber(0);
        nombrePrecedent = BigNumber(0);
        totalAffiche = false;
        operationPrecedente = '';
    }
    affichageTexte = null;
    resetAffichage = false;
    totalAffiche = false;
}
