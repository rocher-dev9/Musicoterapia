/*
Name:           Demo Accounting 1
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  12.0.0
*/

(($ => {



})).apply(this, [jQuery]);

document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    const resultContainer = document.getElementById("result");
    const recommendations = {
        relax: "Recomanem l'àudio de relaxació per calmar la teva ment i el teu cos.",
        focus: "Prova l'àudio de concentració per millorar el teu rendiment i enfocament.",
        energy: "Escolta l'àudio d'energia per augmentar la teva vitalitat i motivació."
    };

    const responses = {};

    function showStep(step) {
        steps.forEach((stepDiv, index) => {
            stepDiv.classList.toggle("active", index === step);
        });

        prevButton.style.display = step === 0 ? "none" : "inline-block";
        nextButton.innerText = step === steps.length - 1 ? "Submit" : "Next";
    }

    nextButton.addEventListener("click", function () {
        if (currentStep === steps.length - 1) {
            // Recollim respostes i oferim una recomanació
            const formData = new FormData(document.getElementById("emotional-test"));
            formData.forEach((value, key) => {
                responses[key] = value;
            });

            // Exemple de lògica per determinar el resultat
            let resultKey;
            if (responses.mood === "stress" || responses.energy === "low") {
                resultKey = "relax";
            } else if (responses.focus === "low") {
                resultKey = "focus";
            } else {
                resultKey = "energy";
            }

            resultContainer.innerHTML = `<h3>Resultat:</h3><p>${recommendations[resultKey]}</p><button onclick="playAudio('${resultKey}')">Escoltar àudio</button>`;
        } else {
            currentStep++;
            showStep(currentStep);
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    function playAudio(key) {
        const audioMap = {
            relax: "relax.mp3",
            focus: "focus.mp3",
            energy: "energy.mp3"
        };

        const audio = new Audio(audioMap[key]);
        audio.play();
    }

    showStep(currentStep);
});