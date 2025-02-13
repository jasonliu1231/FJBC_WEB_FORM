"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  const [query, setQuery] = useState("");
  const [pass, setPass] = useState(true);
  const [selected, setSelected] = useState(0);

  const filteredItems =
    query === ""
      ? list
      : list.filter((item) => {
          const first_name = item.first_name?.toLowerCase() || "";
          const nick_name = item.nick_name?.toLowerCase() || "";
          const tel = item.tel?.toLowerCase() || "";
          const school_name = item.school_name?.toLowerCase() || "";
          const grade_name = item.grade_name?.toLowerCase() || "";
          return (
            first_name.includes(query.toLowerCase()) ||
            nick_name.includes(query.toLowerCase()) ||
            tel.includes(query.toLowerCase()) ||
            school_name.includes(query.toLowerCase()) ||
            grade_name.includes(query.toLowerCase())
          );
        });

  async function getStudentList() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/student/list`);
    const res = await response.json();
    if (response.ok) {
      setList(res);
      setLoading(false);
    } else {
      alert(res.msg);
    }
  }

  useEffect(() => {
    getStudentList();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-12 place-items-center">
        <div className="text-xl text-center text-gray-500 font-semibold text-center">學生列表</div>
        <div className="p-4 w-full">
          <div className="relative rounded-md shadow-sm">
            <input
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              type="text"
              placeholder="中英文姓名、學校、年級、電話"
              className="p-2 w-full block rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 px-3">
        {filteredItems.map((person) => (
          <div
            key={person.id}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:bg-blue-100"
            onClick={() => {
              if (selected == person.id) {
                window.location.href = `/authorize/student?id=${person.id}`;
              } else {
                setSelected(person.id);
              }
            }}
          >
            <div className="flex items-center justify-center">
              <p className="text-md font-medium text-blue-600">
                {person.first_name}({person.nick_name})
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="truncate text-sm text-gray-500">{person.grade_name}</p>
              <p className="truncate text-sm text-gray-500">{person.tel}</p>
            </div>
            <div>
              <p className="whitespace-nowrap truncate text-sm font-medium text-gray-900">{person.school_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
