import React, { useState } from 'react';
import './App.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdDone } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import Card from './components/Card';

// const validator = new SimpleReactValidator();

function App() {
  const [paymentData, setPaymentData] = useState({});
  const [cardNumberValidData, setCardNumberValidData] = useState(null);
  const [cardBackFace, setCardBackFace] = useState(false);

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
          <Card
            cardBackFace={cardBackFace}
            cardNumberValidData={cardNumberValidData}
            paymentData={paymentData}
          />
        </aside>
        <div className="content">
          <div className="steps">
            <p className="step step_one active">
              <i>
                <MdDone fontSize={20} />
              </i>
              Carrinho
            </p>
            <MdKeyboardArrowRight fontSize={25} />
            <p className="step step_two">
              <i>2</i>Pagamento
            </p>
            <MdKeyboardArrowRight fontSize={25} />
            <p className="step step_three">
              <i>3</i>Confirmação
            </p>
          </div>
          <Form
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            setCardBackFace={setCardBackFace}
            setCardNumberValidData={setCardNumberValidData}
            cardNumberValidData={cardNumberValidData}
          />
        </div>
      </section>
    </>
  );
}

export default App;
