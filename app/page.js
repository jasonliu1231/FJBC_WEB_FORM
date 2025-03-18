import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-12 text-xl text-center text-gray-500 font-semibold">FJBC_表單</div>
        <div className="px-3 text-center text-2xl grid sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          <a
            href="./lend"
            className="col-span-1 w-full bg-blue-200 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <span className="text-gray-500">
              借用登記
              <div className="text-sm">Borrowing Application</div>
              <div className="mt-1 flex justify-center">
                <CursorArrowRaysIcon className="w-10 h-10" />
              </div>
            </span>
          </a>
          {/* <a
            href="./purchase"
            className="col-span-1 w-full bg-green-200 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <span className="text-gray-500">
              採購申請
              <div className="text-sm">Purchase Order Application</div>
              <div className="mt-1 flex justify-center">
                <CursorArrowRaysIcon className="w-10 h-10" />
              </div>
            </span>
          </a> */}
          <a
            href="./asklist"
            className="col-span-1 w-full bg-pink-200 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <span className="text-gray-500">
              新生表單
              <div className="text-sm">New Student Form</div>
              <div className="mt-1 flex justify-center">
                <CursorArrowRaysIcon className="w-10 h-10" />
              </div>
            </span>
          </a>
          <a
            href="./authorize"
            className="col-span-1 w-full bg-orange-200 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <span className="text-gray-500">
              舊生表單
              <div className="text-sm">Old Student Form</div>
              <div className="mt-1 flex justify-center">
                <CursorArrowRaysIcon className="w-10 h-10" />
              </div>
            </span>
          </a>
          <a
            href="./attendance"
            className="col-span-1 w-full bg-green-200 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <span className="text-gray-500">
              教師打卡
              <div className="text-sm">Attendance Teacher</div>
              <div className="mt-1 flex justify-center">
                <CursorArrowRaysIcon className="w-10 h-10" />
              </div>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
