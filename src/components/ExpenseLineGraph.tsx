import { useEffect, useState } from "react";

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
import { Expense } from "../types/ProjectTypes";

export default function ExpenseLineGraph() {
  const { expenseList } = useExpenseList();

  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const date_today: Date = new Date();
  const year_list: number[] = [];

  for (let i = 2020; i <= date_today.getFullYear(); i++) {
    year_list.push(i);
  }

  // month array
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

  //setting the graph at last expense saved
  useEffect(() => {
    if (expenseList.length > 0) {
      setMonth(expenseList[expenseList.length - 1].month!);
      setYear(expenseList[expenseList.length - 1].year!);
    }
  }, [expenseList]);

  // very important part which format list according to year and month
  const formattedList = () => {
    const totals: Expense[] = [];
    expenseList
      .filter((y) => y.year == year)
      .filter((e) => e.month == month)
      .forEach((x: Expense) => {
        const obj: Expense | undefined = totals.find((o) => o.day === x.day);
        if (obj) {
          obj.product += "," + x.product;
          obj.price = Number(obj.price) + Number(x.price);
        } else {
          totals.push({ ...x, price: Number(x.price) });
        }
      });
    totals.sort((a, b) => a.day! - b.day!);
    console.log(totals);

    return totals;
  };

  // a simple stupid implementation by me to show multiple products with sorted price
  // just placed one graph over another 😃
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
                <p className="" key={i}>{`${i + 1}. ${e}`}</p>
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
        <div className="flex gap-6 sm:flex-row flex-col my-4">
          <div className=" flex flex-col gap-2">
            <label htmlFor="select_year">Select Year</label>
            <select
              value={year}
              onChange={(e) => {
                setYear(parseInt(e.target.value));
              }}
              className="p-2 rounded-[4px] max-w-[100px] w-full"
              id="select_year"
            >
              {year_list.map((y, i) => (
                <option key={i} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex flex-col gap-2">
            <label htmlFor="select_month">Select Month</label>
            <select
              value={month}
              onChange={(e) => {
                setMonth(parseInt(e.target.value));
              }}
              className="p-2 rounded-[4px] max-w-[150px] w-full"
              id="select_month"
            >
              {monthArray.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="month-selector flex justify-between h-[10%] py-3 md:w-full sm:w-full flex-wrap lg:gap-0 gap-2">
          {monthArray.map((m, i) => (
            <button
              className="bg-violet-600 flex items-center justify-center py-2 rounded-[4px] text-xs w-[80px] flex-wrap text-white"
              key={i}
              onClick={() => {
                setMonth(i);
                alert(monthArray[i]);
              }}
            >
              {m}
            </button>
          ))}
        </div> */}
        <div className="graph h-full sm:block hidden">
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

        <div className="graph h-full sm:hidden">
          <ResponsiveContainer height={300}>
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
