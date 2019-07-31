import React, { useState } from 'react';
import './App.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import InputMask from 'react-input-mask';
import valid from 'card-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const validator = new SimpleReactValidator();

function App() {
  const [paymentData, setPaymentData] = useState({});
  const [cardNumberValidData, setCardNumberValidData] = useState(null);
  const [cardDateValidData, setCardDateValidData] = useState(null);
  const [cardNameValidData, setCardNameValidData] = useState(null);
  const [cardCvvValidData, setCardCvvValidData] = useState(null);
  const [cardInstallmentsValidData, setCardInstallmentsValidData] = useState(null);

  function changeInput(event) {
    switch (event.target.name) {
      case 'CARD_NUMBER':
        setPaymentData({ ...paymentData, cardNumber: event.target.value });
        break;
      case 'CARD_NAME':
        setPaymentData({ ...paymentData, cardName: event.target.value });
        break;
      case 'CARD_DATE':
        setPaymentData({ ...paymentData, cardDate: event.target.value });
        break;
      case 'CARD_CVV':
        setPaymentData({ ...paymentData, cardCvv: event.target.value });
        break;
      case 'CARD_INSTALLMENTS':
        setPaymentData({ ...paymentData, cardInstallments: event.target.value });
        break;

      default:
        break;
    }
  }

  function notify() {
    toast.error('Preencha os campos corretamente!');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formIsValid = (cardNumberValidData && cardNumberValidData.isValid)
      * (cardDateValidData && cardDateValidData.isValid)
      * (cardNameValidData && cardNameValidData.split(' ').length > 1)
      * (cardCvvValidData && cardCvvValidData.isValid)
      * (cardInstallmentsValidData && cardInstallmentsValidData !== null);

    if (!formIsValid) {
      notify();
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="checkout">
        <aside>
          <p className="backSelectPayment">
            <MdKeyboardArrowLeft fontSize={25} /> Alterar forma de pagamento
          </p>
          <div className="title">
            <h1>
              Adicionar um novo <br /> cartão de crédito
            </h1>
          </div>
          <div className="card card-front">
            <span className="number">
              {paymentData.cardNumber ? paymentData.cardNumber : '**** **** **** ****'}
            </span>
            <div className="group">
              <span className="name">
                {paymentData.cardName ? paymentData.cardName : 'Nome do Titular'}
              </span>
              <span className="date">{paymentData.cardDate ? paymentData.cardDate : '00/00'}</span>
            </div>
          </div>
        </aside>
        <div className="content">
          <div className="steps">
            <p className="step step_one">Carrinho</p>
            <MdKeyboardArrowRight fontSize={25} />
            <p className="step step_two">Pagamento</p>
            <MdKeyboardArrowRight fontSize={25} />
            <p className="step step_three">Confirmaçã</p>
          </div>
          <form className="payment" onSubmit={handleSubmit}>
            <div
              className={
                cardNumberValidData && cardNumberValidData.isValid
                  ? 'form-control'
                  : 'form-control error'
              }
            >
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=""
                type="text"
                placeholder="Número do cartão1"
                name="CARD_NUMBER"
                value={paymentData.cardNumber || ''}
                required
                onChange={changeInput}
                onBlur={(event) => {
                  setCardNumberValidData(valid.number(event.target.value));
                }}
              />
              {cardNumberValidData && !cardNumberValidData.isValid && (
                <span className="error-info">Número de cartão inválido</span>
              )}
            </div>

            <div
              className={
                cardNameValidData && cardNameValidData.split(' ').length === 1
                  ? 'form-control error'
                  : 'form-control'
              }
            >
              <InputMask
                type="text"
                placeholder="Nome (igual ao cartão)"
                value={paymentData.cardName || ''}
                name="CARD_NAME"
                required
                onChange={changeInput}
                onBlur={(event) => {
                  setCardNameValidData(event.target.value);
                }}
              />
              {cardNameValidData && cardNameValidData.split(' ').length === 1 && (
                <span className="error-info">Insira seu nome completo</span>
              )}
            </div>

            <div className="input-group">
              <div
                className={
                  cardDateValidData && cardDateValidData.isValid
                    ? 'form-control'
                    : 'form-control error'
                }
              >
                <InputMask
                  mask="99/99"
                  maskChar=""
                  type="text"
                  value={paymentData.cardDate || ''}
                  placeholder="Validade"
                  name="CARD_DATE"
                  required
                  onChange={changeInput}
                  onBlur={(event) => {
                    setCardDateValidData(valid.expirationDate(event.target.value));
                  }}
                />
                {cardDateValidData && !cardDateValidData.isValid && (
                  <span className="error-info">Data inválida</span>
                )}
              </div>

              <div
                className={
                  cardCvvValidData && cardCvvValidData.isValid
                    ? 'form-control'
                    : 'form-control error'
                }
              >
                <InputMask
                  mask="999"
                  maskChar=""
                  type="text"
                  placeholder="CVV"
                  name="CARD_CVV"
                  value={paymentData.cardCvv || ''}
                  required
                  onChange={changeInput}
                  onBlur={(event) => {
                    setCardCvvValidData(valid.cvv(event.target.value));
                  }}
                />
                {cardCvvValidData && !cardCvvValidData.isValid && (
                  <span className="error-info">Código inválido</span>
                )}
              </div>
            </div>

            <div
              className={
                cardCvvValidData && cardCvvValidData.isValid ? 'form-control' : 'form-control error'
              }
            >
              <select
                placeholder="Número de parcelas"
                name="CARD_INSTALLMENTS"
                required
                onChange={changeInput}
                value={paymentData.cardInstallments || ''}
                onBlur={(event) => {
                  setCardInstallmentsValidData(event.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Número de parcelas
                </option>
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
                <option value="4">4x</option>
                <option value="5">5x</option>
              </select>

              {!cardInstallmentsValidData && cardInstallmentsValidData !== null && (
                <span className="error-info">Insira o número de parcelas</span>
              )}
            </div>
            <button type="submit">Continuar</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
