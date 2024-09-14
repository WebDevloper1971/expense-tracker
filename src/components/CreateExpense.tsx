import { useState } from "react";
import { useExpenseList } from "../context/ExpenseContext";

export default function CreateExpense() {
  interface Expense {
    id: number;
    category: string;
    product: string;
    price: number;
    month: number;
    day: number;
    year: number;
  }

  const { expenseList, addExpenseToList } = useExpenseList();

  const [category, setCategory] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const today_date: Date = new Date();

  const handleDate = (str_date: string) => {
    const min_year: number = 2020;
    const input_date: Date = new Date(str_date);
    const year: number = input_date.getFullYear();
    if (year < min_year || year > today_date.getFullYear()) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = () => {
    if (handleDate(date)) {
      const d = new Date(date);

      const id = 1;

      const exp: Expense = {
        id: id,
        category: category,
        product: product,
        price: price!,
        month: d.getMonth(),
        day: d.getDate(),
        year: d.getFullYear(),
      };

      if (expenseList[0] == null) {
        exp.id = 1;
      } else {
        exp.id = expenseList[expenseList.length - 1].id + 1;
      }
      if (exp.category != "" && exp.price != 0 && exp.product != "") {
        addExpenseToList(exp);
        alert("Expense Saved");
      }
    } else {
      alert(`Date Year : 2020 - ${today_date.getFullYear()} `);
    }
  };

  return (
    <>
      <div className="w-full flex items-center  rounded-[4px]">
        <form
          onSubmit={handleFormSubmit}
          className="py-6 w-full flex flex-col justify-center items-center px-4 gap-4"
        >
          <div className="input-group flex flex-col gap-2 px-4 w-full">
            <label htmlFor="category" className="text-black">
              Category
            </label>
            <select
              name=""
              id="category"
              className="p-4 text-sm rounded-[4px] border border-slate-400 overflow-y-auto"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" className="overflow-y-scroll">
                select expense category
              </option>
              <option value="electronics" className="overflow-y-scroll">
                ⚡ Electronics
              </option>
              <option value="smartphones" className="overflow-y-scroll">
                📱 Smartphones
              </option>
              <option value="stationary" className="overflow-y-scroll">
                📏 Stationary
              </option>
              <option value="clothes" className="overflow-y-scroll">
                👕 Clothes
              </option>
              <option value="groceries" className="overflow-y-scroll">
                🛒 Groceries
              </option>
              <option value="fruits" className="overflow-y-scroll">
                🍒 Fruits
              </option>
              <option value="vegetables" className="overflow-y-scroll">
                🫑 Vegetables
              </option>
              <option value="cosmetics" className="overflow-y-scroll">
                💅 Cosmetics
              </option>
              <option value="fuel" className="overflow-y-scroll">
                ⛽ Fuel
              </option>
              <option value="headphones" className="overflow-y-scroll">
                🎧 Headphones
              </option>
              <option value="stock" className="overflow-y-scroll">
                📈 Stocks
              </option>
              <option value="utensils" className="overflow-y-scroll">
                🥣 Utensils
              </option>
              <option value="medicine" className="overflow-y-scroll">
                💊 Medicine
              </option>
              <option value="hospital" className="overflow-y-scroll">
                🏥 Hospital
              </option>
              <option value="work" className="overflow-y-scroll">
                🏢 Work
              </option>
              <option value="travel" className="overflow-y-scroll">
                🚙 Travel
              </option>
            </select>
          </div>
          <div className="input-group flex flex-col gap-2 px-4 w-full ">
            <label htmlFor="product" className="text-black">
              Product
            </label>
            <input
              type="text"
              id="product"
              placeholder="enter what you spent on"
              className="p-4 text-sm rounded-[4px] border border-slate-400"
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>
          <div className="input-group flex flex-col gap-2 px-4 w-full">
            <label htmlFor="price" className="text-black">
              Price
            </label>
            <input
              type="number"
              id="price"
              min={10}
              max={1000000}
              placeholder="enter how much you spent"
              className="p-4 text-sm rounded-[4px] border border-slate-400"
              onChange={(e) => setPrice(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="input-group flex flex-col gap-2 px-4 w-full">
            <label htmlFor="date" className="text-black">
              Date
            </label>
            <input
              type="date"
              id="date"
              contentEditable="false"
              className="p-4 text-sm rounded-[4px] border border-slate-400"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            />
          </div>

          <div className="input-group flex flex-col gap-4 px-4 w-full mt-10">
            <button className="bg-slate-800 text-white text-md font-primaryRegular  px-8 py-6 rounded-[4px]">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
