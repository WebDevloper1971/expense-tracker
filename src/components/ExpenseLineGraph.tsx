import { useState } from "react";

import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  Legend,
} from "recharts";
import { useExpenseList } from "../context/ExpenseContext";

export default function ExpenseLineGraph() {
  interface Expense {
    id: number;
    category: string;
    product: string;
    price: number;
    month: number;
    day: number;
    year: number;
  }

  const { expenseList } = useExpenseList();

  const [month, setMonth] = useState<number>(
    expenseList[0] != null ? expenseList[expenseList.length - 1].month : 0
  );
  const [year, setYear] = useState<number>(
    expenseList[0] != null ? expenseList[expenseList.length - 1].year : 0
  );

  const date_today: Date = new Date();
  const year_list: number[] = [];

  for (let i = 2020; i <= date_today.getFullYear(); i++) {
    year_list.push(i);
  }

  const monthArray: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedList = () => {
    const totals: Expense[] = [];
    expenseList
      .filter((y) => y.year == year)
      .filter((e) => e.month == month)
      .forEach((x) => {
        const obj = totals.find((o) => o.day === x.day);
        if (obj) {
          obj.product += "," + x.product;
          obj.price += x.price;
        } else {
          totals.push({ ...x, price: Number(x.price) });
        }
      });
    totals.sort((a, b) => a.day - b.day);
    return totals;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-4 w-40 rounded-[4px] text-[#101010] text-xs flex flex-col gap-4">
          <p className="label">{`Day ${label} :`}</p>
          <div className="products">
            {String(payload[0].value!)
              .split(",")
              .map((e: string, i: number) => (
                <p className="">{`${i + 1}. ${e}`}</p>
              ))}
          </div>
          <p className="desc">{`₹ ${payload[1].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="exp-container flex flex-col gap-4 p-4  rounded-sm bg-yellow-100 w-full ">
        <div className=" flex flex-col gap-2">
          <label htmlFor="select_date">Select Year</label>
          <select
            value={year}
            onChange={(e) => {
              setYear(parseInt(e.target.value));
            }}
            className="p-2 rounded-[4px] lg:w-24 w-full"
            id="select_date"
          >
            {year_list.map((y, i) => (
              <option key={i} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="month-selector flex justify-between h-[10%] py-3 md:w-full sm:w-full flex-wrap lg:gap-0 gap-2">
          {monthArray.map((m, i) => (
            <button
              className="bg-violet-600 flex items-center justify-center py-2 rounded-[4px] text-xs w-[70px] flex-wrap text-white"
              key={i}
              onClick={() => {
                setMonth(i);
                alert(monthArray[i]);
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="graph h-full ">
          <ResponsiveContainer height={492}>
            <AreaChart data={formattedList()} width={500} height={400}>
              <YAxis />
              <XAxis dataKey={"day"} />
              <CartesianGrid strokeDasharray={"5 5"} />

              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Area
                type={"monotone"}
                dataKey={"product"}
                fill="#7c3aed"
                stroke="#000"
              />
              <Area
                type={"monotone"}
                dataKey={"price"}
                fill="#7c3aed"
                stroke="#000"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
