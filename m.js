// Nieuwe rekening toevoegen
document.getElementById("nieuweRekening").addEventListener("click", function () {
    const rekeningNaam = prompt("Voer de naam van de nieuwe rekening in:");
    const saldo = prompt("Voer het startsaldo in (€):");
  
    if (rekeningNaam && saldo) {
      const rekeningLijst = document.querySelector(".dashboard");
      const nieuweRekening = document.createElement("div");
      nieuweRekening.classList.add("rekening");
      nieuweRekening.innerHTML = `
        <span>${rekeningNaam}</span>
        <span>€${parseFloat(saldo).toFixed(2)}</span>
      `;
      rekeningLijst.insertBefore(nieuweRekening, rekeningLijst.querySelector("button"));
    } else {
      alert("Rekeningnaam of saldo mag niet leeg zijn!");
    }
  });
  