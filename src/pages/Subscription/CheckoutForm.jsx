import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Heading from "../../components/shared/Heading";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const options = [
  { value: 5, label: "1 Minute" },
  { value: 15, label: "5 Days" },
  { value: 20, label: "10 Days" },
];

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [selectedOption, setSelectedOption] = useState({ value: 0 });
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const selectInputRef = useRef();
  const axiosCommon = useAxiosCommon();
  const onClear = () => {
    selectInputRef.current.clearValue();
  };

  useEffect(() => {
    axiosCommon
      .post("/create-payment-intent", { price: selectedOption?.value })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosCommon, selectedOption]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onClear();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
      setError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // 1.payment time
      const now = moment();
      let premiumExpireDate;
      if (selectedOption.value === 5) {
        premiumExpireDate = now.add(1, "minute");
      } else if (selectedOption.value === 15) {
        premiumExpireDate = now.add(5, "days");
      } else if (selectedOption.value === 20) {
        premiumExpireDate = now.add(10, "days");
      }

      // premiumExpireDate object
      const premiumInfo = { premiumExpireDate: premiumExpireDate.valueOf() };

      try {
        const { data } = await axiosCommon.patch(
          `/premium/${user?.email}`,
          premiumInfo
        );
        if (data.modifiedCount) {
          setProcessing(false);
          toast.success("Congrats! You become premium user successfully");
          navigate("/premium-article");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div className="flex  justify-center mt-10">
      <div className="w-[350px] md:w-[400px] lg:w-[500px] pt-5 px-3 md:px-6 lg:px-10 pb-10 bg-gray-200 rounded-lg">
        <Heading title={"Card Info"}></Heading>
        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
          <CardElement
            className="border border-gray-400 p-3 rounded-md bg-white"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          ></CardElement>
          {error && <p className="text-red-500">{error}</p>}

          <div className="form-control w-full mb-4">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              ref={selectInputRef}
              placeholder={"Select Period"}
              className="w-full border border-gray-400 rounded-md "
            />
          </div>
          <button
            className="btn btn-sm btn-primary"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            {processing ? (
              <PiSpinner size={24} className="animate-spin m-auto" />
            ) : (
              `Pay ${selectedOption.value} $`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
