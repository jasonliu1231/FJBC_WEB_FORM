"use client";

import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";

const tutoring = [
  {
    id: 1,
    name: "臺中市私立多易文理短期補習班",
    imageUrl: "/doyi.png",
    addr: "臺中市太平區新興路171號、169號",
    phone: "04-23959481"
  },
  {
    id: 2,
    name: "臺中市私立艾思文理短期補習班",
    imageUrl: "/funapple2.png",
    addr: "臺中市太平區新興路171號、169號",
    phone: "04-23952885"
  },
  {
    id: 3,
    name: "臺中市私立華而敦國際文理短期補習班",
    imageUrl: "/funapple2.png",
    addr: "臺中市北屯區崇德五路146巷28號",
    phone: "04-22471682"
  }
];

export default function Home() {
  return (
    <div className="container mx-auto p-1">
      <div className="text-lg font-medium text-gray-700 my-12 text-center">請選擇補習班</div>
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 xl:gap-x-8"
      >
        {tutoring.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              window.location.href = "preparation?tutoring=" + item.id;
            }}
            className="overflow-hidden rounded-xl shadow-2xl border border-gray-200 bg-gray-50 hover:border-red-400"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 p-6">
              <img
                alt={item.name}
                src={item.imageUrl}
                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-xl font-medium leading-6 text-gray-900">{item.name}</div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-md leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500 flex">
                  <MapPinIcon className="w-5 h-5 mr-4" />
                  {item.addr}
                </dt>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500 flex">
                  <PhoneIcon className="w-5 h-5 mr-4" />
                  {item.phone}
                </dt>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
