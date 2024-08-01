import LoadingPage from "@/pageComponents/LoadingPage";
import MainPage from "@/pageComponents/MainPage";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <MainPage />
    </Suspense>
  );
};
export default Home;
