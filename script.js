/* ==========================================
   SELEÇÃO DE ELEMENTOS DO DOM
   ================================---------- */
const htmlDocumento = document.documentElement;
const botaoTema = document.getElementById("botao-tema");
const botaoMenu = document.getElementById("botao-menu");
const navMenu = document.getElementById("nav-menu");
const linksMenu = document.querySelectorAll(".nav-link");
const elementoAno = document.getElementById("ano-atual");
const botaoTopo = document.getElementById("botao-topo");
const elementoMaquina = document.getElementById("elemento-maquina");

/* ==========================================
   1. ALTERNADOR DE TEMA (DARK / LIGHT MODE)
   ================================---------- */
// Verifica se o usuário já possui preferência salva no navegador
const temaSalvo = localStorage.getItem("tema-portfolio") || "dark";
htmlDocumento.setAttribute("data-tema", temaSalvo);

botaoTema.addEventListener("click", () => {
    const temaAtual = htmlDocumento.getAttribute("data-tema");
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    
    htmlDocumento.setAttribute("data-tema", novoTema);
    localStorage.setItem("tema-portfolio", novoTema);
});

/* ==========================================
   2. MENU MOBILE / HAMBÚRGUER
   ================================---------- */
botaoMenu.addEventListener("click", () => {
    navMenu.classList.toggle("ativo");
    const iconeMenu = botaoMenu.querySelector("i");
    
    // Alterna o ícone entre barras e 'X' (fechar)
    if (navMenu.classList.contains("ativo")) {
        iconeMenu.classList.remove("bi-list");
        iconeMenu.classList.add("bi-x-lg");
    } else {
        iconeMenu.classList.remove("bi-x-lg");
        iconeMenu.classList.add("bi-list");
    }
});

// Fecha o menu mobile automaticamente ao clicar em um link
linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("ativo");
        const iconeMenu = botaoMenu.querySelector("i");
        iconeMenu.classList.remove("bi-x-lg");
        iconeMenu.classList.add("bi-list");
    });
});

/* ==========================================
   3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
   ================================---------- */
const palavras = [
    "Estudante de Desenvolvimento Full Stack",
    "Desenvolvedor Front-end",
    "Entusiasta de Tecnologia"
];
let indicePalavra = 1; // Começa na segunda palavra (a primeira é injetada diretamente ou tratada no loop)
let indiceCaractere = 0;
let estaApagando = false;
let velocidadeDigitacao = 100;

function executarMaquinaEscrever() {
    const palavraAtual = palavras[indicePalavra % palavras.length];
    
    if (estaApagando) {
        elementoMaquina.textContent = palavraAtual.substring(0, indiceCaractere - 1);
        indiceCaractere--;
        velocidadeDigitacao = 50;
    } else {
        elementoMaquina.textContent = palavraAtual.substring(0, indiceCaractere + 1);
        indiceCaractere++;
        velocidadeDigitacao = 100;
    }

    // Condição para alternar entre apagar e escrever
    if (!estaApagando && indiceCaractere === palavraAtual.length) {
        estaApagando = true;
        velocidadeDigitacao = 2000; // Pausa no final da palavra
    } else if (estaApagando && indiceCaractere === 0) {
        estaApagando = false;
        indicePalavra++;
        velocidadeDigitacao = 500; // Pausa antes de digitar a próxima
    }

    setTimeout(executarMaquinaEscrever, velocidadeDigitacao);
}

// Inicia o efeito assim que a página carregar
document.addEventListener("DOMContentLoaded", () => {
    // Define o texto inicial de forma estática antes do efeito rodar
    if (elementoMaquina) {
        setTimeout(executarMaquinaEscrever, 1000);
    }
});

/* ==========================================
   4. ANO DINÂMICO NO RODAPÉ
   ================================---------- */
if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
}

/* ==========================================
   5. BOTÃO "VOLTAR AO TOPO" E SCROLL
   ================================---------- */
window.addEventListener("scroll", () => {
    // Exibe ou oculta o botão de voltar ao topo com base na rolagem
    if (window.scrollY > 400) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }
});

botaoTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});