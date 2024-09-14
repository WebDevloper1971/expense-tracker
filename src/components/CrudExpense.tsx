import { useExpenseList } from "../context/ExpenseContext";

export default function CrudExpense() {
  const { expenseList, removeExpenseFromList, deleteAllExpenses } =
    useExpenseList();

  return (
    <div className="bg-yellow-100 flex flex-col  gap-4 items-center lg:p-4 md:p-4 py-2 rounded-[4px] w-full">
      <button
        className="bg-red-900 text-white rounded-md px-4 py-3 lg:text-[0.9rem] text-xs"
        onClick={() => {
          expenseList.forEach(() => deleteAllExpenses());
          alert("all expenses are deleted");
        }}
      >
        Delete all
      </button>

      <table className="table-auto w-full">
        <thead className="bg-violet-600 text-white lg:h-[50px] md:h-[50px] h-[40px] lg:text-sm md:text-sm text-xs">
          <tr>
            <th className="border border-white hidden lg:table-cell md:table-cell">
              Id
            </th>
            <th className="border border-white">Product</th>
            <th className="border border-white hidden lg:table-cell md:table-cell">
              Category
            </th>
            <th className="border border-white">Price</th>
            <th className="border border-white">Date</th>
            <th className="border border-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((m, i) => (
            <tr key={i}>
              <td className="hidden lg:table-cell md:table-cell text-center border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px]">
                {m.id}
              </td>
              <td className="border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px]">
                {m.product}
              </td>
              <td className="hidden lg:table-cell md:table-cell border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px]">
                {m.category}
              </td>
              <td className="border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px]">
                ₹ {m.price}
              </td>
              <td className="border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px] text-center">{`${m.day}-${m.month}-${m.year}`}</td>
              <td className="border border-gray-600 px-4 py-2 lg:text-[0.9rem] text-[10px] text-center">
                <button
                  className="bg-red-900 text-white rounded-md px-4 py-3 lg:text-[0.9rem] text-xs"
                  onClick={() => removeExpenseFromList(m.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
