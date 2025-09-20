import { PRODUCTS } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('produtos-grid');
  const paginacao = document.getElementById('produtos-paginacao');
  const carrinhoItens = document.getElementById('carrinho-itens');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const precoMinInput = document.getElementById('preco-min');
  const precoMaxInput = document.getElementById('preco-max');
  const btnFiltrar = document.getElementById('btn-filtrar');
  const carrinhoTotalValor = document.getElementById('carrinho-total-valor');
  const btnFinalizar = document.getElementById('btn-finalizar');

  let carrinho = {};

  const produtosComCategoria = PRODUCTS;
  let produtosFiltrados = produtosComCategoria;
  let paginaAtual = 1;
  const PRODUTOS_POR_PAGINA = 6;

  function renderGrid(produtos, pagina = 1) {
    grid.innerHTML = '';
    const inicio = (pagina - 1) * PRODUTOS_POR_PAGINA;
    const fim = inicio + PRODUTOS_POR_PAGINA;
    const paginaProdutos = produtos.slice(inicio, fim);
    paginaProdutos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto-card';
      card.innerHTML = `
        <h3>${produto.nome}</h3>
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="produto-preco">${produto.preco}</div>
        <button class="produto-add">Adicionar ao carrinho</button>
      `;
      card.querySelector('.produto-add').addEventListener('click', () => addToCart(produto));
      grid.appendChild(card);
    });
    renderPaginacao(produtos.length, pagina);
  }

  function renderPaginacao(totalProdutos, pagina) {
    if (!paginacao) return;
    paginacao.innerHTML = '';
    const totalPaginas = Math.ceil(totalProdutos / PRODUTOS_POR_PAGINA);
    if (totalPaginas <= 1) return;
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.className = (i === pagina) ? 'active' : '';
      btn.addEventListener('click', () => {
        paginaAtual = i;
        renderGrid(produtosFiltrados, paginaAtual);
      });
      paginacao.appendChild(btn);
    }
  }

  function renderCarrinho() {
    carrinhoItens.innerHTML = '';
    let total = 0;
    Object.entries(carrinho).forEach(([nome, item]) => {
      const div = document.createElement('div');
      div.className = 'carrinho-item';
      const produto = produtosComCategoria.find(p => p.nome === nome);
      const valor = produto ? parseFloat(produto.preco.replace('R$', '').replace(',', '.').trim()) : 0;
      total += valor * item.qtd;
      div.innerHTML = `
        <span class="carrinho-item-nome">${item.nome}</span>
        <span class="carrinho-item-qtd">
          <button class="btn-menos">-</button>
          <span>${item.qtd}</span>
          <button class="btn-mais">+</button>
        </span>
        <span class="carrinho-item-preco">R$ ${(valor * item.qtd).toFixed(2).replace('.', ',')}</span>
      `;
      div.querySelector('.btn-mais').addEventListener('click', () => {
        carrinho[nome].qtd += 1;
        renderCarrinho();
      });
      div.querySelector('.btn-menos').addEventListener('click', () => {
        carrinho[nome].qtd -= 1;
        if (carrinho[nome].qtd <= 0) delete carrinho[nome];
        renderCarrinho();
      });
      carrinhoItens.appendChild(div);
    });
    if (carrinhoTotalValor) {
      carrinhoTotalValor.textContent = total.toFixed(2).replace('.', ',');
    }
    if (btnFinalizar) {
      btnFinalizar.disabled = Object.keys(carrinho).length === 0;
    }
  }

  function addToCart(produto) {
    if (carrinho[produto.nome]) {
      carrinho[produto.nome].qtd += 1;
    } else {
      carrinho[produto.nome] = { nome: produto.nome, qtd: 1 };
    }
    renderCarrinho();
  }

  function filtrarProdutos() {
    const categoria = filtroCategoria.value;
    const precoMin = parseFloat(precoMinInput.value.replace(',', '.')) || 0;
    const precoMax = parseFloat(precoMaxInput.value.replace(',', '.')) || Infinity;
    let filtrados = produtosComCategoria;
    if (categoria) {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }
    filtrados = filtrados.filter(p => {
      const valor = parseFloat(p.preco.replace('R$', '').replace(',', '.').trim());
      return valor >= precoMin && valor <= precoMax;
    });
    produtosFiltrados = filtrados;
    paginaAtual = 1;
    renderGrid(produtosFiltrados, paginaAtual);
  }

  if (grid) {
    produtosFiltrados = produtosComCategoria;
    renderGrid(produtosFiltrados, paginaAtual);
  }
  if (filtroCategoria) {
    filtroCategoria.addEventListener('change', filtrarProdutos);
  }
  if (btnFiltrar) {
    btnFiltrar.addEventListener('click', filtrarProdutos);
  }

  //função para verifica se tem um id na url e caso positivo adiciona o produto ao carrinho
  function verificaProdutoNaUrl() {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');
    console.log('Produto ID na URL:', produtoId);
    if (produtoId) {
      const produto = produtosComCategoria.find(p => p.id === parseInt(produtoId));
      console.log('Produto encontrado:', produto);
      if (produto) {
        addToCart(produto);
      }
    }
  }

  // Chama a função após o DOM estar carregado
  verificaProdutoNaUrl();
});
