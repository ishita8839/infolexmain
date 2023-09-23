import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { Axios } from "../../config";
import requests from "../../libs/request";
import CheckoutForm from "../../components/PayContents/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "sk_test_51NtODDSBCZeEksHtCkHkZ44HuWyD3PqdmNub1LBgiYBHbc8CtcH2Q4LFUdluFM86eywf8LRmtYU5kIYCJWGAGY0300pdXPamAG"
);

const Pay = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await Axios.post(
          `${requests.orders}/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="py-40 pb-10">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
