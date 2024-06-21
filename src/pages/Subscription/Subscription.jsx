import bgImage from "../../assets/Article.jpg";
import Container from "../../components/shared/Container";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Subscription = () => {
  return (
    <Container>
      <Helmet>
        <title>EchoJournal | Subscribe</title>
      </Helmet>
      {/* Banner */}
      <div
        className="h-[250px] md:h-[400px] lg:h-[calc(100vh-200px)] rounded-lg"
        style={{
          background: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="h-full flex justify-center items-center bg-gradient-to-t from-[#1b1820e5]  to-[#150B2B22] rounded-lg p-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white max-w-sm text-center">
            To enjoy our premium article please complete your payment
          </h2>
        </div>
      </div>
      {/* payment */}
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </Container>
  );
};

export default Subscription;
