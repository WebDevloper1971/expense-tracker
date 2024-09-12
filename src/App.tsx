import CreateExpense from "./components/CreateExpense";
import ExpenseLineGraph from "./components/ExpenseLineGraph";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <>
      <ExpenseProvider>
        <main className="lg:mx-28 md:mx-10 sm:mx-2 font-primaryRegular h-full flex flex-col">
          <Header />
          <div className="flex flex-col gap-4 my-10 lg:flex-row md:flex-col sm:flex-col">
            <div className="bg-yellow-100 lg:w-[25%] md:w-full sm:w-full h-full shadow-2xl ">
              <CreateExpense />
            </div>
            <div className="bg-[#181818] lg:w-[75%] md:w-full sm:w-full flex justify-center items-center shadow-2xl h-full">
              <ExpenseLineGraph />
            </div>
          </div>
          <Footer />
        </main>
      </ExpenseProvider>
    </>
  );
}

export default App;
