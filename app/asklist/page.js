"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  const [query, setQuery] = useState("");
  const [pass, setPass] = useState(true);

  const filteredItems =
    query === ""
      ? list
      : list.filter((item) => {
          const name = item.chinese_name?.toLowerCase() || "";
          const en_name = item.english_name?.toLowerCase() || "";
          return name.includes(query.toLowerCase()) || en_name.includes(query.toLowerCase());
        });

  async function getList() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/preparation`);
    const res = await response.json();
    if (response.ok) {
      setList(res);
      setLoading(false);
    } else {
      alert(res.msg);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  if (pass) {
    return (
      <div className="flex justify-center items-center mt-40">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">請輸入密碼</label>
          <div className="mt-2">
            <input
              onChange={(e) => {
                const date = new Date();
                const today = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
                const val = e.target.value;
                if (val == today) {
                  setPass(false);
                }
              }}
              type="text"
              className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <div className="spinner"></div>
        <span className="mx-4 text-blue-500">資料讀取中...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-12 place-items-center">
        <div className="text-xl text-center text-gray-500 font-semibold text-center">問班列表</div>
        <div className="p-4">
          <div className="relative rounded-md shadow-sm">
            <input
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              type="text"
              placeholder="姓名、學校、電話"
              className="p-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="isolate inline-flex rounded-md shadow-sm mx-1">
            <button
              onClick={() => {
                window.location.href = "/tutoring";
              }}
              type="button"
              className="rounded-md bg-blue-300 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
            >
              問班<span className="text-gray-200">(Preparation)</span>
            </button>
          </span>
          <span className="isolate inline-flex rounded-md shadow-sm mx-1">
            <button
              onClick={() => {
                window.location.href = "/enrollment";
              }}
              type="button"
              className="rounded-md bg-pink-300 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
            >
              入班<span className="text-gray-200">(Enrollment)</span>
            </button>
          </span>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
            >
              中文姓名
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              英文姓名
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              媽媽姓名
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              媽媽手機
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              爸爸姓名
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              爸爸手機
            </th>
            <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-3"
            >
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredItems.map((person) => (
            <tr
              key={person.id}
              className="even:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{person.chinese_name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.english_name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mother_name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.mother_phone}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.father_name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.father_phone}</td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                {person.admission || (
                  <a
                    href={`/preparation?id=${person.id}`}
                    className="text-indigo-600 hover:text-indigo-900 border border-blue-300 rounded-sm p-1 m-1"
                  >
                    問班
                  </a>
                )}

                <a
                  href={`/enrollment?id=${person.id}`}
                  className="text-indigo-600 hover:text-indigo-900 border border-pink-300 rounded-sm p-1 m-1"
                >
                  入班
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
