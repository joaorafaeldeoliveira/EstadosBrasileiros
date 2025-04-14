
const estados = [
  { id: "AC", nome: "Acre" }, { id: "AL", nome: "Alagoas" }, { id: "AP", nome: "Amapá" },
  { id: "AM", nome: "Amazonas" }, { id: "BA", nome: "Bahia" }, { id: "CE", nome: "Ceará" },
  { id: "DF", nome: "Distrito Federal" }, { id: "ES", nome: "Espírito Santo" }, { id: "GO", nome: "Goiás" },
  { id: "MA", nome: "Maranhão" }, { id: "MT", nome: "Mato Grosso" }, { id: "MS", nome: "Mato Grosso do Sul" },
  { id: "MG", nome: "Minas Gerais" }, { id: "PA", nome: "Pará" }, { id: "PB", nome: "Paraíba" },
  { id: "PR", nome: "Paraná" }, { id: "PE", nome: "Pernambuco" }, { id: "PI", nome: "Piauí" },
  { id: "RJ", nome: "Rio de Janeiro" }, { id: "RN", nome: "Rio Grande do Norte" }, { id: "RS", nome: "Rio Grande do Sul" },
  { id: "RO", nome: "Rondônia" }, { id: "RR", nome: "Roraima" }, { id: "SC", nome: "Santa Catarina" },
  { id: "SP", nome: "São Paulo" }, { id: "SE", nome: "Sergipe" }, { id: "TO", nome: "Tocantins" }
];


let estadoAtual = null;
let pontuacao = 0;
let tempoRestante = 60;
let timer = null;
let jogoAtivo = false;


const perguntaElement = document.getElementById('pergunta');
const mensagemElement = document.getElementById('mensagem');
const pontuacaoElement = document.getElementById('pontuacao');
const timerElement = document.getElementById('timer');
const estadosElementos = document.querySelectorAll('.state');
const botaoReiniciar = document.getElementById('reiniciar');


function iniciarJogo() {
  pontuacao = 0;
  tempoRestante = 60;
  jogoAtivo = true;

  atualizarPontuacao();
  atualizarTimer();
  novaPergunta();

  estadosElementos.forEach(estado => estado.style.pointerEvents = 'auto');

  clearInterval(timer);
  timer = setInterval(() => {
    tempoRestante--;
    atualizarTimer();
    if (tempoRestante <= 0) finalizarJogo();
  }, 1000);
}


function finalizarJogo() {
  jogoAtivo = false;
  clearInterval(timer);

  perguntaElement.textContent = "Fim do jogo!";
  mensagemElement.textContent = `Sua pontuação final: ${pontuacao}`;

  estadosElementos.forEach(estado => {
    estado.style.pointerEvents = 'none';
  });
}

function novaPergunta() {
  if (!jogoAtivo) return;

  estadosElementos.forEach(e => e.classList.remove('acerto', 'erro'));

  const estadosDisponiveis = estados.filter(e => e.id !== estadoAtual?.id);
  estadoAtual = estadosDisponiveis[Math.floor(Math.random() * estadosDisponiveis.length)];

  perguntaElement.textContent = `Onde fica o estado: ${estadoAtual.nome}?`;
  mensagemElement.textContent = "";
}


function atualizarPontuacao() {
  pontuacaoElement.textContent = `Pontuação: ${pontuacao}`;
}


function atualizarTimer() {
  timerElement.textContent = `Tempo: ${tempoRestante}s`;
}


function configurarEventosEstados() {
  estadosElementos.forEach(estado => {
    estado.addEventListener('click', () => {
      if (!jogoAtivo || !estadoAtual) return;

      if (estado.id === estadoAtual.id) {
        estado.classList.add('acerto');
        mensagemElement.textContent = "✅ Acertou! +1 ponto";
        pontuacao++;
        tempoRestante = Math.min(tempoRestante + 3, 120);
        
      } else {
        estado.classList.add('erro');
        document.getElementById(estadoAtual.id)?.classList.add('acerto');
        mensagemElement.textContent = `❌ Errou! Era ${estadoAtual.nome}`;
      }

      atualizarPontuacao();
      atualizarTimer();
      setTimeout(novaPergunta, 1500);
    });
  });
}

botaoReiniciar.addEventListener('click', () => {
  iniciarJogo();
});


window.addEventListener('load', () => {
  configurarEventosEstados();
  iniciarJogo();
});
