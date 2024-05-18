import HomePage from "@blog/components/pages/HomePage";


const Home = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  
  return <HomePage />;
};

export default Home;