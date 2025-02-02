document.getElementById("calculo-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Pega os valores dos inputs
    const empresa = document.getElementById("empresa").value;
    const faturacao = parseFloat(document.getElementById("faturacao").value);
    const tarifa = document.getElementById("tarifa").value;

    // Preços de kWh por empresa e tipo de tarifa (em €)
    const precosKwh = {
        edp: { simples: 0.16, pico: 0.18, normal: 0.14 },
        endesa: { simples: 0.15, pico: 0.17, normal: 0.13 },
        galp: { simples: 0.17, pico: 0.19, normal: 0.15 },
        repsol: { simples: 0.16, pico: 0.18, normal: 0.14 },
        goldenergy: { simples: 0.14, pico: 0.16, normal: 0.12 },
        plenitude: { simples: 0.15, pico: 0.17, normal: 0.13 }
    };

    // Verifica se o valor da faturação é válido
    if (!faturacao || faturacao <= 0) {
        alert("Por favor, insira uma faturação válida.");
        return;
    }

    // Variáveis para o consumo
    let precoKWh;
    let resultado;

    if (tarifa === 'simples') {
        precoKWh = precosKwh[empresa].simples;
        // Calcula o consumo para tarifa simples
        const consumoKWh = faturacao / precoKWh;
        resultado = `Consumo estimado: ${consumoKWh.toFixed(2)} kWh com base na fatura de € ${faturacao.toFixed(2)} (Tarifa Simples)`;
    } else if (tarifa === 'bi-horaria') {
        const precoPico = precosKwh[empresa].pico;
        const precoNormal = precosKwh[empresa].normal;
        
        // Para tarifa bi-horária, assume-se 50% de consumo no pico e 50% no normal
        const consumoPico = faturacao / 2 / precoPico;
        const consumoNormal = faturacao / 2 / precoNormal;

        resultado = `Consumo estimado: 
        ${consumoPico.toFixed(2)} kWh no horário de pico e 
        ${consumoNormal.toFixed(2)} kWh no horário normal com base na fatura de € ${faturacao.toFixed(2)} (Tarifa Bi-Horária)`;
    }

    // Exibe o resultado com a moeda Euro (€)
    document.getElementById("resultado-kwh").textContent = resultado;
});
