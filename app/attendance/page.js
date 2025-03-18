"use client";

import { useState, useEffect, useRef } from "react";
import { Label, Dialog, DialogPanel, DialogTitle, DialogBackdrop, Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { QRCodeSVG } from "qrcode.react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const type = useRef(); // 1.到校 2.離校
  const [open, setOpen] = useState(false);
  const [QRCode, setQRCode] = useState("");
  const [deadline, setDeadline] = useState(0);

  async function getArrival() {
    const response = await fetch(`/api/attendance/arrival`);
    const res = await response.json();
    if (response.ok) {
      setQRCode(res.id);
      setOpen(true);
      setDeadline(150);
    } else {
      alert("錯誤");
    }
  }

  async function getLeave() {
    const response = await fetch(`/api/attendance/leave`);
    const res = await response.json();
    if (response.ok) {
      setQRCode(res.id);
      setOpen(true);
      setDeadline(150);
    } else {
      alert("錯誤");
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    if (deadline <= 0) {
      if (type.current == 1) {
        getArrival();
      } else if (type.current == 2) {
        getLeave();
      }

      return;
    }

    const timer = setInterval(() => {
      setDeadline((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // 清除計時器，避免累積
  }, [deadline]);

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
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <DialogTitle
                  as="h3"
                  className="text-center font-semibold leading-6 text-gray-900"
                >
                  QRCode
                </DialogTitle>
                <div className="mt-3 flex items-center justify-center">{QRCode != "" && <QRCodeSVG value={QRCode} />}</div>
                <div
                  onClick={() => {
                    if (type.current == 1) {
                      getArrival();
                    } else if (type.current == 2) {
                      getLeave();
                    }
                  }}
                  className="mt-4 text-xl text-center text-red-600 flex justify-center items-center"
                >
                  <span>剩餘時間：{deadline}</span>
                  <ArrowPathIcon className="mx-4 w-7 h-7" />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="container mx-auto">
        <div className="flex justify-between m-20">
          <div
            onClick={() => {
              type.current = 1;
              getArrival();
            }}
            className="mx-4 w-full bg-green-400 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <div className="text-gray-700 text-4xl font-semibold text-center">
              <div className="">到校</div>
              <div className="">Arrival</div>
            </div>
          </div>
          <div
            onClick={() => {
              type.current = 2;
              getLeave();
            }}
            className="mx-4 w-full bg-pink-400 px-8 py-12 rounded-md shadow-2xl block cursor-pointer"
          >
            <div className="text-gray-700 text-4xl font-semibold text-center">
              <div className="">離校</div>
              <div className="">Leave</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
