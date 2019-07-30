import React from 'react';
import './App.scss';

function App() {
  return (
    <section className="checkout">
      <aside>
        <p>Alterar forma de pagamento</p>
        <div className="title">
          <h1>Adicionar um novo cartão de crédito</h1>
        </div>
      </aside>
      <div className="content">
        <div className="steps">
          <p className="step step-one">Carrinho</p>
          <p className="step step-two">Pagamento</p>
          <p className="step step-three">Confirmaçã</p>
        </div>
        <form className="payment">
          <input type="text" placeholder="Número do cartão" required />
          <input type="text" placeholder="Nome (igual ao cartão)" required />
          <div className="input-group">
            <input type="text" placeholder="Validade" required />
            <input type="text" placeholder="CVV" required />
          </div>
          <select name="" id="" placeholder="Número de parcelas">
            <option value="1" selected disabled hidden>
              Número de parcelas
            </option>
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="3">3x</option>
            <option value="4">4x</option>
            <option value="5">5x</option>
          </select>
        </form>
      </div>
    </section>
  );
}

export default App;
