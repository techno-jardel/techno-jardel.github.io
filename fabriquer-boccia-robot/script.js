let recognizer;
let classLabels = [];
let port;
let writer;
let lastSentCommand = "";

// 1. Chargement du modèle
async function loadModel() {
    let url = document.getElementById("model-url").value.trim();
    if (!url) return alert("Veuillez entrer l'URL du modèle.");
    if (!url.endsWith("/")) url += "/";

    const checkpointURL = url + "model.json";
    const metadataURL = url + "metadata.json";

    document.getElementById("model-status").innerText = "Chargement...";
    
    try {
        recognizer = speechCommands.create("BROWSER_FFT", undefined, checkpointURL, metadataURL);
        await recognizer.ensureModelLoaded();
        classLabels = recognizer.wordLabels();
        
        document.getElementById("model-status").innerText = "Modèle chargé !";
        document.getElementById("btn-listen").disabled = false;

        const labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = "";
        classLabels.forEach((label, i) => {
            labelContainer.innerHTML += `
                <div class="class-container">
                    <div class="class-label"><span>${label}</span><span id="score-${i}">0%</span></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" id="bar-${i}"></div></div>
                </div>`;
        });
    } catch (e) {
        document.getElementById("model-status").innerText = "Erreur d'URL.";
    }
}

// 2. Écoute microphone
async function startListening() {
    if (!recognizer) return;
    document.getElementById("mic-status").innerText = "Écoute active...";

    recognizer.listen(result => {
        let maxScore = 0;
        let topClass = "";

        classLabels.forEach((label, i) => {
            const score = result.scores[i];
            const percentage = (score * 100).toFixed(0);
            document.getElementById(`bar-${i}`).style.width = percentage + "%";
            document.getElementById(`score-${i}`).innerText = percentage + "%";

            if (score > maxScore) {
                maxScore = score;
                topClass = label;
            }
        });

        // Logique d'envoi USB
        if (maxScore > 0.85 && topClass !== "bruit de fond") {
            if (topClass !== lastSentCommand) {
                sendToMicrobit(topClass);
                lastSentCommand = topClass;
            }
        } else if (topClass === "bruit de fond") {
            if (lastSentCommand !== "bruit de fond") {
                sendToMicrobit("bruit de fond");
                lastSentCommand = "bruit de fond";
            }
        }
    }, { probabilityThreshold: 0.7, overlapFactor: 0.5 });
}

// 3. Connexion USB
async function connectUSB() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        const encoder = new TextEncoderStream();
        encoder.readable.pipeTo(port.writable);
        writer = encoder.writable.getWriter();
        document.getElementById("usb-status").innerText = "Connecté !";
    } catch (e) {
        document.getElementById("usb-status").innerText = "Erreur de connexion.";
    }
}

// 4. Envoi de données
async function sendToMicrobit(data) {
    if (writer) {
        await writer.write(data + "\n");
        document.getElementById("usb-log").innerText = "Envoi : " + data;
    }
}