"use client";

import { useState, useEffect, useRef } from "react";
import { Label, Dialog, DialogPanel, DialogTitle, DialogBackdrop, Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { CheckIcon, XMarkIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const tutoring = [
  { id: 1, name: "多易" },
  { id: 2, name: "艾思" },
  { id: 3, name: "華而敦" }
];

const def_create = {
  product_id: 0,
  tutoring_id: 0,
  quantity: 0,
  course_no: "",
  remark: ""
};

const def_login = {
  username: "",
  password: "",
  client_id: "0000"
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginInfo, setLoginInfo] = useState(def_login);
  const [loginLoading, setLoginLoading] = useState(false);
  const [log_error, setLog_error] = useState(false);

  const [stock, setStock] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [createData, setCreateData] = useState(def_create);
  const [courseList, setCourseList] = useState([]);
  const [query, setQuery] = useState("");
  const filteredCourse =
    query === ""
      ? courseList
      : courseList.filter((course) => {
          return course.course_name.toLowerCase().includes(query.toLowerCase());
        });

  async function login() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(loginInfo)
    };
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_8100}/fjbc_login_api/auth/login`, config);
    const data = await response.json();
    if (response.ok) {
      send(data.user.id);
    } else {
      setLog_error(true);
    }
    setLoginLoading(false);
  }

  async function send(user_id) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: user_id
      },
      body: JSON.stringify(createData)
    };
    const response = await fetch(`/api/lend/save`, config);
    const res = await response.json();
    if (response.ok) {
      alert("申請完成，請至櫃檯領取！\nThank you for your application. Please proceed to the counter to collect.");
      window.location.href = "/";
    } else {
      alert(res.msg);
    }
  }

  async function submit() {
    if (!createData.tutoring_id) {
      alert("請選擇補習班\nPlease choose a tutoring center.");
      return;
    }
    if (!createData.product_id) {
      alert("請選擇商品\nPlease select products.");
      return;
    }
    if (!createData.course_no) {
      alert("請選擇使用課程\nPlease select course.");
      return;
    }
    if (!createData.remark) {
      alert("請寫借用原因\nPlease enter the reason.");
      return;
    }
    if (!createData.quantity || createData.quantity < 0) {
      alert("數量請確認\nPlease enter the quantity.");
      return;
    }

    setOpen(true);
  }

  async function getStock() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keyword: keyword
      })
    };
    const response = await fetch(`/api/lend/stock`, config);
    const res = await response.json();

    if (response.ok) {
      setStock(res);
    } else {
      alert(res.msg);
    }
  }

  async function getCourseList() {
    const response = await fetch(`/api/lend/course`);
    const res = await response.json();
    if (response.ok) {
      setCourseList(res);
      setLoading(false);
    } else {
      const msg = error(response.status, res);
      setInfo({
        show: true,
        success: false,
        msg: "錯誤" + msg
      });
    }
  }

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-center text-base font-semibold leading-6 text-gray-900"
                  >
                    租借人登入(Login)
                  </DialogTitle>
                  <div className="mt-2">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">帳號(Username)</label>
                      <div>
                        <input
                          value={loginInfo.username}
                          onChange={(event) => {
                            setLoginInfo({
                              ...loginInfo,
                              username: event.target.value
                            });
                          }}
                          type="text"
                          className="pl-4 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">密碼(Password)</label>
                      <div>
                        <input
                          value={loginInfo.password}
                          onChange={(event) => {
                            setLoginInfo({
                              ...loginInfo,
                              password: event.target.value
                            });
                          }}
                          type="password"
                          className="pl-4 block w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    {log_error ? <div className="text-red-400 text-center">登入失敗，請再試一次(Please try again)</div> : ""}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {loginLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                    <div>
                      <div className="mx-4 text-blue-500">登入中，請稍候...</div>
                      <div className="mx-4 text-blue-500">Logging in, please wait...</div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setLoginLoading(true);
                    }}
                    className="inline-flex w-72 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    確認(submit)
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="container mx-auto">
        <div
          onClick={() => {
            window.history.back();
          }}
          className="top-0 m-2 absolute border-2 border-blue-400 rounded-md"
        >
          <span className="text-blue-400 font-medium px-2 py-1">←</span>
        </div>
        <div className="mt-12 text-xl text-center text-gray-500 font-semibold">
          借用申請單<div className="text-sm">Borrowing Application</div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <div className="spinner"></div>
            <span className="mx-4 text-blue-500">資料讀取中...</span>
          </div>
        ) : (
          <div className="px-4 py-6">
            <div className="grid grid-cols-4 flex items-end">
              <div className="col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  租借查詢<span className="text-gray-500">(Search)</span>
                </label>
                <div className="mt-2 w-full">
                  <input
                    onChange={(event) => {
                      setKeyword(event.target.value);
                    }}
                    placeholder="Please enter the search keyword."
                    type="text"
                    className="pl-4 w-full block rounded-md border-0 x-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="ol-span-1 flex justify-center items-center">
                <button
                  onClick={getStock}
                  type="button"
                  className="rounded-md border border-blue-600 bg-blue-100 px-2 py-1 mx-1 text-md font-semibold text-blue-700 shadow-sm"
                >
                  查詢<span className="text-blue-300">(Search)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-2">
              {stock.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCreateData({
                      ...createData,
                      ...item,
                      quantity: 0
                    });
                  }}
                  className={`${
                    createData.product_id == item.product_id && createData.tutoring_id == item.tutoring_id ? "border-green-400" : "border-gray-200"
                  } col-span-1 border-2 rounded-md p-2 pl-8 relative cursor-pointer`}
                >
                  {createData.product_id == item.product_id && createData.tutoring_id == item.tutoring_id && (
                    <div className="absolute top-0 left-0 bg-green-400 rounded-sm">
                      <CheckIcon className="h-5 w-5 text-white" />
                    </div>
                  )}

                  <div className="text-sm text-blue-600 h-12 overflow-auto">{item.name}</div>
                  <div className="flex justify-between text-sm">
                    <div className="text-gray-500">{tutoring.filter((i) => i.id == item.tutoring_id)[0].name}</div>
                    <div className="text-pink-500">存量：{item.min}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="col-span-1 row-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  借用原因<span className="text-gray-500">(Reason)</span>
                </label>
                <div className="mt-2">
                  <textarea
                    value={createData.remark}
                    onChange={(e) => {
                      setCreateData({
                        ...createData,
                        remark: e.target.value
                      });
                    }}
                    rows={5}
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                  />
                </div>
              </div>
              <div className="col-span-1 mt-2">
                <Combobox
                  as="div"
                  value={createData}
                  onChange={(course) => {
                    setQuery("");
                    setCreateData({
                      ...createData,
                      ...course
                    });
                  }}
                >
                  <Label className="block text-sm/6 font-medium text-gray-900">
                    使用課程<span className="text-gray-500">(Course)</span>
                  </Label>
                  <div className="relative mt-2">
                    <ComboboxInput
                      className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      onChange={(event) => setQuery(event.target.value)}
                      onBlur={() => setQuery("")}
                      displayValue={(course) => course?.course_name}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </ComboboxButton>

                    {filteredCourse.length > 0 && (
                      <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredCourse.map((course) => (
                          <ComboboxOption
                            key={course.course_no}
                            value={course}
                            className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            <span className="block truncate group-data-[selected]:font-semibold">{course.course_name}</span>

                            <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>
              </div>

              <div className="col-span-1 mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  借用數量<span className="text-gray-500">(Quantity)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={createData.quantity}
                    onChange={(e) => {
                      setCreateData({
                        ...createData,
                        quantity: Number(e.target.value)
                      });
                    }}
                    placeholder="Please enter the quantity"
                    type="number"
                    className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <span className="isolate inline-flex rounded-md shadow-sm">
                <button
                  onClick={submit}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  送出<span className="text-gray-300">(Submit)</span>
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
