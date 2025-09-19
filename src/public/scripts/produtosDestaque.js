import { DESTAQUES, PRODUCTS } from './constants.js';

function createProductCard(product) {
  return `
    <div class="produto-card produto-destaque-click" data-id="${product.id}">
      <img src="${product.imagem}" alt="${product.nome}" class="produto-img" />
      <h3 class="produto-nome">${product.nome}</h3>
      <p class="produto-preco">${product.preco}</p>
    </div>
  `;
}

function renderProdutosDestaque() {
  const container = document.getElementById('produtos-destaque');
  if (!container) return;
  const destaquesProdutos = DESTAQUES.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  container.innerHTML = destaquesProdutos.map(createProductCard).join('');
  // Adiciona evento de clique para cada card
  container.querySelectorAll('.produto-destaque-click').forEach(card => {
    card.addEventListener('click', () => {   
    window.location.href = '/produtos';
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProdutosDestaque);
