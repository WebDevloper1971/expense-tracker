import { useExpenseList } from "../context/ExpenseContext";
import { Expense } from "../types/ProjectTypes";
import { FieldValues, useForm } from "react-hook-form";

export default function CreateExpense() {
  const { register, handleSubmit, reset } = useForm();

  const { expenseList, addExpenseToList } = useExpenseList();

  const handleFormSubmit = (data: FieldValues) => {
    const year = data.date?.substring(0, 4);
    const month = data.date?.substring(5, 7);
    const day = data.date?.substring(8, 10);

    const freshExpense: Expense = {
      product: data.product,
      category: data.category,
      price: data.price,
      date: data.date,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    };

    if (expenseList.length < 1) {
      freshExpense.id = 1;
    } else {
      freshExpense.id = expenseList[expenseList.length - 1].id! + 1;
    }

    addExpenseToList(freshExpense);
    reset();
    return alert("expense saved successfully");
  };

  return (
    <>
      <div className="w-full flex items-center rounded-[4px]">
        <form
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          className="py-6 w-full flex flex-col justify-center items-center px-4 gap-4"
        >
          <label htmlFor="category" className="w-full">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full h-12 px-4 rounded"
            required
            id="category"
          >
            <option value="" className="text-gray-600">
              select expense category
            </option>
            {[
              { icon: "📱", name: "smartphone" },
              { icon: "🫑", name: "vegetable" },
              { icon: "📏", name: "stationary" },
              { icon: "💊", name: "medicine" },
              { icon: "⛽", name: "fuel" },
            ].map((c, i) => {
              return (
                <option key={i} value={c.name}>{`${
                  c.icon
                } ${c.name.toUpperCase()}`}</option>
              );
            })}
          </select>

          <label htmlFor="product" className="w-full">
            Product
          </label>
          <input
            {...register("product")}
            id="product"
            className="w-full h-12 px-4 rounded"
            placeholder="enter what you spent on"
            autoComplete="on"
            required
          />

          <label htmlFor="price" className="w-full">
            Price
          </label>
          <input
            {...register("price", { min: 10, max: 100000 })}
            className="w-full h-12 px-4 rounded"
            type="number"
            id="price"
            autoComplete="on"
            placeholder="enter how much you spent"
            required
          />

          <label htmlFor="date" className="w-full">
            Date
          </label>
          <input
            {...register("date")}
            className="w-full h-12 px-4 rounded"
            autoComplete="on"
            id="date"
            type="date"
            required
          />

          <input
            type="submit"
            value="Add Expense"
            className="w-full h-12 bg-black text-white rounded mt-4"
          />
        </form>
      </div>
    </>
  );
}
