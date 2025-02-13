"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { CogIcon, XCircleIcon } from "@heroicons/react/20/solid";

const def = {
  name: "",
  quantity: 0,
  unit: "",
  specification: "",
  price: 0,
  remark: ""
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [product, setProduct] = useState(def);
  const sendData = useRef({});
  const logData = useRef({});
  const option = useRef(-1);
  const [loading, setLoading] = useState(true);
  const [loginLoding, setLoginLoding] = useState(false);
  const [log, setLog] = useState(false);
  const [tutoring, setTutoring] = useState([]);
  const [productList, setProductsList] = useState([]);

  async function login() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        username: logData.current.username,
        password: logData.current.password,
        client_id: "0000"
      })
    };
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_8100}/fjbc_login_api/auth/login`, config);
    const data = await response.json();
    setLoginLoding(false);
    if (response.ok) {
      sendData.current.createby = data.user.first_name;
      sendData.current.user_id = data.user.id;
      send();
    } else {
      setLog(true);
    }
  }

  async function send() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: sendData.current.user_id
      },
      body: JSON.stringify(sendData.current)
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/purchase`, config);
    const res = await response.json();
    if (response.ok) {
      alert("申請完成!\nThank you for your application.");
      window.location.href = "/";
    } else {
      alert(res.msg);
    }
  }

  async function submit() {
    if (!sendData.current.tutoringid) {
      alert("請選擇補習班\nPlease choose a tutoring center.");
      return;
    }
    if (!sendData.current.className) {
      alert("請輸入班級\nPlease enter the class name.");
      return;
    }
    if (!sendData.current.deadline) {
      alert("請選擇期限\nPlease select deadline.");
      return;
    }
    if (!sendData.current.reason) {
      alert("請輸入用途\nPlease enter the reason.");
      return;
    }
    let products = productList.filter((i) => !(i.name == "" && i.quantity == 0 && i.specification == ""));
    let err = false;
    products.forEach((i) => {
      if (i.name == "" || i.quantity == 0 || i.specification == "") {
        alert("請輸入商品名稱、數量、規格\nPlease enter the product name、quantity and specification.");
        err = true;
        return;
      }
    });
    if (err) {
      return;
    }

    sendData.current.products = products;

    setOpen(true);
  }

  function setProducts(val, i) {
    const list = productList.map((origin, index) => {
      if (i == index) {
        return val;
      } else {
        return origin;
      }
    });
    setProductsList(list);
  }

  useEffect(() => {
    const api1 = fetch(`${process.env.NEXT_PUBLIC_API}/api/tutoring`);
    Promise.all([api1])
      .then(async ([response1, response2]) => {
        const result1 = await response1.json();
        setTutoring(result1);
        setLoading(false);
      })
      .catch((error) => {
        alert("讀取不到資料，請聯繫資訊組!");
      });
  }, []);
  return (
    <>
      {/* 帳號登入 */}
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
              className="min-w-full relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
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
                          onChange={(event) => {
                            logData.current.username = event.target.value;
                          }}
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">密碼(Password)</label>
                      <div>
                        <input
                          onChange={(event) => {
                            logData.current.password = event.target.value;
                          }}
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    {log ? <div className="text-red-400 text-center">登入失敗(error)</div> : ""}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                {loginLoding ? (
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
                      setLoginLoding(true);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    確認(submit)
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* 商品 */}
      <Dialog
        open={openProduct}
        onClose={setOpenProduct}
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
              className="min-w-full relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-center text-base font-semibold leading-6 text-gray-900"
                  >
                    商品(Product)
                  </DialogTitle>
                  <div className="mt-2">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-red-500">商品名稱(name)</label>
                      <div>
                        <input
                          value={product.name}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              name: event.target.value
                            });
                          }}
                          placeholder="品名(name)"
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-red-500">數量(Quantity)</label>
                      <div>
                        <input
                          value={product.quantity}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              quantity: event.target.value
                            });
                          }}
                          placeholder="需求數(quantity)"
                          type="number"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">單位(Unit)</label>
                      <div>
                        <input
                          value={product.unit}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              unit: event.target.value
                            });
                          }}
                          placeholder="EX:張、本、支"
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-red-500">規格(Specification)</label>
                      <div>
                        <input
                          value={product.specification}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              specification: event.target.value
                            });
                          }}
                          placeholder="請稍加敘述物品大小、版本、品牌或是其他資訊"
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">單價(Price)</label>
                      <div>
                        <input
                          value={product.price}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              price: event.target.value
                            });
                          }}
                          placeholder="NT"
                          type="number"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-gray-900">備註(Remark)</label>
                      <div>
                        <input
                          value={product.remark}
                          onChange={(event) => {
                            setProduct({
                              ...product,
                              remark: event.target.value
                            });
                          }}
                          placeholder="如有教師用書請額外備註"
                          type="text"
                          className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (!product.name || product.quantity == 0 || !product.specification) {
                      alert("商品名稱、數量、規格，請勿遺漏！");
                      return;
                    }
                    if (option.current < 0) {
                      setProductsList([...productList, product]);
                      setProduct(def);
                    } else {
                      setProducts(product, option.current);
                      setProduct(def);
                    }

                    setOpenProduct(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  確認(submit)
                </button>
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
          採購申請單<div className="text-sm">Purchase Order</div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <div className="spinner"></div>
            <span className="mx-4 text-blue-500">資料讀取中...</span>
          </div>
        ) : (
          <div className="px-4 py-6">
            <div className="mt-2">
              <label className="block font-medium leading-6 text-gray-900">
                <span className="text-red-500">*</span>
                使用補習班<span className="text-gray-500">(Tutoring Centers)</span>
              </label>
              <select
                onChange={(event) => {
                  sendData.current.tutoringid = event.target.value;
                }}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300"
              >
                <option>Please select a tutoring centers</option>
                {tutoring.map((i) => (
                  <option
                    key={i.id}
                    value={i.id}
                  >
                    {i.tutoring_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                <span className="text-red-500">*</span>
                班級<span className="text-gray-500">(Class)</span>
              </label>
              <div className="mt-2">
                <input
                  onChange={(event) => {
                    sendData.current.className = event.target.value;
                  }}
                  placeholder="Please enter the class name."
                  type="text"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                <span className="text-red-500">*</span>
                需求日期<span className="text-gray-500">(Deadline)</span>
              </label>
              <div className="mt-2">
                <input
                  onChange={(event) => {
                    sendData.current.deadline = event.target.value;
                  }}
                  type="date"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                <span className="text-red-500">*</span>
                請購理由<span className="text-gray-500">(Reason)</span>
              </label>
              <div className="mt-2">
                <input
                  onChange={(event) => {
                    sendData.current.reason = event.target.value;
                  }}
                  placeholder="Please enter the reason."
                  type="text"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                <span className="text-red-500">*</span>
                商品<span className="text-gray-500">(Product)</span>
                <span
                  onClick={() => {
                    option.current = -1;
                    setOpenProduct(true);
                  }}
                  className="text-gray-600 border-2 border-green-300 ml-4 p-1 rounded-md"
                >
                  新增(Add)
                </span>
              </label>
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-2"
              >
                {productList.map((item, index) => (
                  <li
                    key={index}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <div className="flex w-full justify-between space-x-3 p-3">
                      <div className="flex-1 truncate min-w-1/3">
                        <div className="truncate text-lg font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.remark}</div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">{item.quantity}</h3>
                          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {item.unit}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-sm text-gray-500">{item.specification}</p>
                      </div>
                    </div>
                    <div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="flex w-0 flex-1">
                          <div
                            onClick={() => {
                              option.current = index;
                              setProduct(item);
                              setOpenProduct(true);
                            }}
                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <CogIcon
                              aria-hidden="true"
                              className="h-5 w-5 text-green-400"
                            />
                            修改
                          </div>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                          <div
                            onClick={() => {
                              const check = confirm(`確定要刪除${item.name}嗎？`);
                              if (check) {
                                setProductsList(productList.filter((_, ii) => ii != index));
                              }
                            }}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <XCircleIcon
                              aria-hidden="true"
                              className="h-5 w-5 text-red-400"
                            />
                            刪除
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
