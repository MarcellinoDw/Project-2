const knopOvermaken = document.getElementById('open-overdracht');
const formulierOvermaken = document.getElementById('overdracht-formulier');
const selectVan = document.getElementById('rekening-van');
const selectNaar = document.getElementById('rekening-naar');
const inputBedrag = document.getElementById('bedrag-overdragen');
const knopBevestigen = document.getElementById('bevestig-overdracht');
const knopAnnuleren = document.getElementById('annuleer-overdracht');

const rekeningItems = Array.from(document.querySelectorAll('.rekening-item'));

function toonFormulier() {
  formulierOvermaken.classList.remove('verborgen');
}

function bevestigOverdracht() {
  const vanIndex = parseInt(selectVan.value);
  const naarIndex = parseInt(selectNaar.value);
  const bedrag = parseFloat(inputBedrag.value);

  if (isNaN(bedrag) || bedrag <= 0) {
    alert('Voer een geldig bedrag in.');
    return;
  }

  if (vanIndex === naarIndex) {
    alert('De rekeningen moeten verschillend zijn.');
    return;
  }

  const vanRekening = rekeningItems[vanIndex];
  const naarRekening = rekeningItems[naarIndex];

  const vanSaldoElement = vanRekening.querySelector('.rekening-saldo');
  const naarSaldoElement = naarRekening.querySelector('.rekening-saldo');

  const vanSaldo = parseFloat(vanSaldoElement.textContent.replace('€', '').replace(',', '.'));
  const naarSaldo = parseFloat(naarSaldoElement.textContent.replace('€', '').replace(',', '.'));

  if (bedrag > vanSaldo) {
    alert('Onvoldoende saldo.');
    return;
  }

  vanSaldoElement.textContent = `€${(vanSaldo - bedrag).toFixed(2).replace('.', ',')}`;
  naarSaldoElement.textContent = `€${(naarSaldo + bedrag).toFixed(2).replace('.', ',')}`;

  formulierOvermaken.classList.add('verborgen');
  inputBedrag.value = '';
  toonSuccesVenster();
}

function annuleerOverdracht() {
  formulierOvermaken.classList.add('verborgen');
  inputBedrag.value = '';
}

function toonSuccesVenster() {
  const succesVenster = document.getElementById('succes-venster');
  succesVenster.classList.remove('verborgen');
}

function sluitSuccesVenster() {
  const succesVenster = document.getElementById('succes-venster');
  succesVenster.classList.add('verborgen');
}

document.getElementById('sluit-sucess').addEventListener('click', sluitSuccesVenster);
knopOvermaken.addEventListener('click', toonFormulier);
knopBevestigen.addEventListener('click', bevestigOverdracht);
knopAnnuleren.addEventListener('click', annuleerOverdracht);
