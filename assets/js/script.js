
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const serviceID = 'service_hg5q05e'; // serviceID do EmailJS
    const templateID = 'template_tcezpbn'; // templateID do EmailJS

    const templateParams = {
        nome: document.querySelector('#nome').value,
        telefone: document.querySelector('#telefone').value,
        carro: document.querySelector('#carro').value,
        canal: document.querySelector('#canal-comunicacao').value,
        vendedor: document.querySelector('#vendedor').value 
    }

    if (!templateParams.carro) {templateParams.carro = 'Sem carro de preferencia'};
    if (!templateParams.telefone) {templateParams.telefone = 'Cliente sem telefone / ou não quis fornecer'};
    if (!templateParams.canal) {templateParams.canal = 'Canal de comunicação inexistente'};
    if (!templateParams.vendedor) {templateParams.vendedor = 'Sem vendedor de preferencia'};
    
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(res) {
            alert('Email enviado com sucesso', res.status, res.text);
            location.reload();

        }, function(error) {
            alert('Ocorreu um erro. Contate o T.I e faça o cadastro do cliente com papel e caneta até o problema ser resolvido');

            if (error.status === 0) {
                console.log('Falha de conexão. Verifique sua internet.');
            } else if (error.status === 400) {
                console.log('Solicitação inválida. Verifique os dados fornecidos.');
            } else if (error.status === 401) {
                console.log('Credenciais inválidas. Verifique seu serviceID e templateID.');
            } else if (error.status === 403) {
                console.log('Acesso negado. Verifique suas permissões.');
            } else if (error.status === 429) {
                console.log('Cota de envios excedida. Tente novamente mais tarde.');
            } else {
                console.log('Ocorreu um erro desconhecido: ' + error.text);
            }

        });
})

