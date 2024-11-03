import { useExpenseList } from "../context/ExpenseContext";

export default function CrudExpense() {
  const { expenseList, removeExpenseFromList, deleteAllExpenses } =
    useExpenseList();

  return (
    <div className="bg-yellow-100 flex flex-col gap-4 md:p-4 p-2 rounded-[4px] w-full">
      <button
        className="bg-red-900  text-white rounded w-20 h-10 text-xs"
        onClick={() => {
          expenseList.forEach(() => deleteAllExpenses());
          alert("all expenses are deleted");
        }}
      >
        Delete all
      </button>

      <div className="list flex-col gap-6 w-full sm:hidden flex">
        {expenseList.map((m, i) => {
          return (
            <div
              key={i}
              className="relative w-full flex flex-col gap-2 border border-black p-2 rounded"
            >
              <h1 className="w-full flex gap-2">
                <span className="w-[100px] ">Product : </span>
                <span className="line-clamp-1">{m.product}</span>
              </h1>
              <h1 className="w-full flex gap-2">
                <span className="w-[100px] ">Category : </span>
                {m.category}
              </h1>
              <h1 className="w-full flex gap-2">
                <span className="w-[100px] ">Price : </span>
                <span className="text-red-800">₹{m.price}</span>
              </h1>
              <h1 className="w-full flex gap-2">
                <span className="w-[100px]">Date : </span>
                {`${m.day} - ${m.month} - ${m.year}`}
              </h1>
              <button
                className="absolute top-0 right-0 bg-red-900 text-white rounded text-xs"
                onClick={() => {
                  removeExpenseFromList(m.id!);
                  alert("expense is deleted");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="size-7"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <table className="table-fixed">
        <thead className="bg-purple-400 h-10">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((exp, i) => (
            <tr key={i} className="text-center">
              <td>{exp.product}</td>
              <td className="text-red-800">₹ {exp.price}</td>
              <td>{exp.date}</td>
              <td>
                <div className="h-16 flex justify-center items-center">
                  <button
                    onClick={() => removeExpenseFromList(exp.id!)}
                    className="text-xs h-10 w-16 bg-red-800 text-white rounded"
                  >
                    delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
