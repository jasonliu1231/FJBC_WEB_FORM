"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const history = [
  { id: "h1", name: "無", en_name: "None" },
  { id: "h2", name: "氣喘", en_name: "Asthma" },
  { id: "h3", name: "易流鼻血", en_name: "Nosebleeds" },
  { id: "h4", name: "過敏體質", en_name: "Allergic tendency" },
  { id: "h5", name: "癲癇", en_name: "Epilepsy" },
  { id: "h6", name: "蠶豆症", en_name: "Favism" },
  { id: "h7", name: "心臟病", en_name: "Heart disease" },
  { id: "h8", name: "肝炎Ａ型", en_name: "Hepatitis A" },
  { id: "h9", name: "肝炎Ｂ型", en_name: "Hepatitis B" },
  { id: "h10", name: "肝炎Ｃ型", en_name: "Hepatitis C" },
  { id: "h11", name: "過敏", en_name: "Allergy" }
];
const mom_style = [
  { id: "ms1", name: "關懷管理", en_name: "Care" },
  { id: "ms2", name: "開明管理", en_name: "Open" },
  { id: "ms3", name: "權威管理", en_name: "Authoritarian" },
  { id: "ms4", name: "自主發展", en_name: "Autonomous" },
  { id: "ms5", name: "較少陪伴", en_name: "Less time spent" }
];
const dad_style = [
  { id: "ds1", name: "關懷管理", en_name: "Care" },
  { id: "ds2", name: "開明管理", en_name: "Open" },
  { id: "ds3", name: "權威管理", en_name: "Authoritarian" },
  { id: "ds4", name: "自主發展", en_name: "Autonomous" },
  { id: "ds5", name: "較少陪伴", en_name: "Less time spent" }
];
const life = [
  { id: "l1", name: "整潔", en_name: "Clean" },
  { id: "l2", name: "勤勞", en_name: "Diligent" },
  { id: "l3", name: "節儉", en_name: "Frugal" },
  { id: "l4", name: "骯髒", en_name: "Dirty" },
  { id: "l5", name: "懶惰", en_name: "Lazy" },
  { id: "l6", name: "浪費", en_name: "Wasteful" },
  { id: "l7", name: "作息有規律", en_name: "Regular schedule" },
  { id: "l8", name: "作息無規律", en_name: "Irregular schedule" }
];
const relationships = [
  { id: "r1", name: "和氣", en_name: "Friendly" },
  { id: "r2", name: "合群", en_name: "Sociable" },
  { id: "r3", name: "活潑", en_name: "Energetic" },
  { id: "r4", name: "信賴他人", en_name: "Trusting" },
  { id: "r5", name: "好爭吵", en_name: "Argumentative" },
  { id: "r6", name: "自我", en_name: "Self-centered" },
  { id: "r7", name: "冷漠", en_name: "Aloof" },
  { id: "r8", name: "不合群", en_name: "Unsociable" }
];
const introvert = [
  { id: "i1", name: "領導力強", en_name: "Strong leadership" },
  { id: "i2", name: "健談", en_name: "Talkative" },
  { id: "i3", name: "慷慨", en_name: "Generous" },
  { id: "i4", name: "熱心公務", en_name: "Enthusiastic about public affairs" },
  { id: "i5", name: "欺負同學", en_name: "Bullying classmates" },
  { id: "i6", name: "常講粗話", en_name: "Often uses vulgar language" },
  { id: "i7", name: "好遊蕩", en_name: "Wanders around" },
  { id: "i8", name: "愛唱反調", en_name: "Rebellious" }
];
const extrovert = [
  { id: "e1", name: "謹慎", en_name: "Cautious" },
  { id: "e2", name: "文靜", en_name: "Quiet" },
  { id: "e3", name: "自信", en_name: "Confident" },
  { id: "e4", name: "情緒穩定", en_name: "Emotionally stable" },
  { id: "e5", name: "畏縮", en_name: "Timid" },
  { id: "e6", name: "過分沈默", en_name: "Excessively silent" },
  { id: "e7", name: "過分依賴", en_name: "Overly dependent" },
  { id: "e8", name: "多愁善感", en_name: "Sentimental" }
];
const learning = [
  { id: "le1", name: "專心", en_name: "Focused" },
  { id: "le2", name: "積極努力", en_name: "Proactive and hardworking" },
  { id: "le3", name: "有恆心", en_name: "Persistent" },
  { id: "le4", name: "沈思好問", en_name: "Thoughtful and inquisitive" },
  { id: "le5", name: "分心", en_name: "Distracted" },
  { id: "le6", name: "被動馬虎", en_name: "Passive and careless" },
  { id: "le7", name: "半途而廢", en_name: "Gives up halfway" },
  { id: "le8", name: "偏好某科", en_name: "Preference for certain subjects" }
];

export default function Home() {
  const userID = useRef();
  const [user, setUser] = useState("");
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const sigCanvas = useRef(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const [grade, setGrade] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [distList, setDistList] = useState([]);
  const [school, setSchool] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  const filteredDist = user.city_id ? distList?.filter((i) => i.city_id == user.city_id) : [];

  const schoolList = school?.filter((item) => {
    return item.city_id == user.city_id && item.dist_id == user.dist_id && item.school_type_id == user.school_type_id;
  });

  const filteredSchool =
    query === ""
      ? schoolList
      : schoolList.filter((item) => {
          return item.school_name.toLowerCase().includes(query.toLowerCase());
        });

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  function handelSelect(id) {
    if (select.some((i) => i == id)) {
      setSelect(select.filter((i) => i != id));
    } else {
      setSelect([...select, id]);
    }
  }

  async function saveStudentData() {
    if (user.first_name == "") {
      alert("中文姓名不可以是空白");
      return;
    }

    const list = user.parent_list.filter((parent) => parent.first_name == "");
    if (list.length > 0) {
      alert("家長姓名不可以是空白");
      return;
    }

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ select, userData: user })
    };
    const response = await fetch(`/api/student/person`, config);
    const res = await response.json();
    if (response.ok) {
      getStudentData(res.id);
      setUpdate(false);
    } else {
      const msg = error(response.status, res);
      setInfo({
        show: true,
        success: false,
        msg: "錯誤" + msg
      });
    }
  }

  async function submit() {
    const dataURL = sigCanvas.current.toDataURL();
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: userID.current, dataURL: dataURL })
    };
    const response = await fetch(`/api/student/person`, config);
    const res = await response.json();
    if (response.ok) {
      window.location.href = "/authorize";
    } else {
      const msg = error(response.status, res);
      setInfo({
        show: true,
        success: false,
        msg: "錯誤" + msg
      });
    }
  }

  async function getStudentData() {
    const response = await fetch(`/api/student/person?id=${userID.current}`);
    const res = await response.json();
    if (response.ok) {
      if (res.aptitude.selectid) {
        setSelect(res.aptitude.selectid);
      }
      if (res.student.school_id) {
        setSelectedSchool(school.filter((item) => item.id == res.student.school_id)[0]);
      }
      setUser(res.student);
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

  async function getSchoolData() {
    const grade = fetch(`${process.env.NEXT_PUBLIC_API}/api/grade`);
    const school = fetch(`${process.env.NEXT_PUBLIC_API}/api/school`);

    Promise.all([grade, school]).then(async ([response1, response2]) => {
      const result1 = await response1.json();
      const result2 = await response2.json();
      setGrade(result1);
      setSchool(result2.school);
      setCityList(result2.city);
      setDistList(result2.dist);
    });
  }

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    userID.current = id;

    getSchoolData();
  }, []);

  useEffect(() => {
    getStudentData();
  }, [school]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <div className="spinner"></div>
        <span className="mx-4 text-blue-500">資料讀取中...</span>
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={open1}
        onClose={setOpen1}
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    資料保護
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">為維護學生「肖像權」同意並授權我方拍攝，使用於我方網頁、活動相簿、FB、活動文宣等用途。</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setCheck1(true);
                    setOpen1(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  確認並詳細閱讀
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={open2}
        onClose={setOpen2}
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    【學期期間】學生個人因素請假退費與補課規範
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <table>
                        <tbody className="align-top text-left">
                          <tr>
                            <td>一、</td>
                            <td className="text-gray-500">事假：皆不退費與補課</td>
                          </tr>
                          <tr>
                            <td>二、</td>
                            <td className="text-gray-500">
                              病假： 十天內病假皆不予退費，學生回校後由帶班老師跟家長確認課後時間金行補課。
                              超過連續十天以上（包含十天和六日）病假，學校將退還定參與點心費用，學費（包含課輔費用）與交通不與退費。學生回校由帶班教師跟家長確認課後時間進行補課。
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setCheck2(true);
                    setOpen2(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  確認並詳細閱讀
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={open3}
        onClose={setOpen3}
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    退費手續
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <table>
                        <tbody className="align-top text-left">
                          <tr>
                            <td>一、</td>
                            <td className="text-gray-500">依教育部訂定之短期補習班設立及管理準則及各直轄市、縣(市)政府訂定之短期補習班設立及管理自治法規之相關規定辦理。</td>
                          </tr>
                          <tr>
                            <td>二、</td>
                            <td className="text-gray-500">如直轄市、縣(市)政府訂定更有利於消費者之規定者，從其規定。</td>
                          </tr>
                          <tr>
                            <td>三、</td>
                            <td className="text-gray-500">
                              學生有下列情形之一者，將予以退班，並依上述退費手續辦理
                              <div className="list-decimal">
                                <div>1. 學生有互毆、竊盜、或其他違法行為，經我方查明屬實，情節重大者。</div>
                                <div>2. 故意毀損補習班設備，情節嚴重者。</div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setCheck3(true);
                    setOpen3(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  確認並詳細閱讀
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={open4}
        onClose={setOpen4}
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
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    【離班退費辦法】補習班學生繳納費用後離班者，補習班應依下列規定辦理退費
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      <p className="text-pink-400">台中市短期補習班管理規則第 36 條第 1 項</p>
                      <table>
                        <tbody className="align-top text-left">
                          <tr>
                            <td>一、</td>
                            <td className="text-gray-500">事學生於開課日三十日前提出退費申請者，退還當期開班約定繳納費用總額百分之九十五，惟補習班所收取之百分之五部分最高不得超過新臺幣一千元。</td>
                          </tr>
                          <tr>
                            <td>二、</td>
                            <td className="text-gray-500">學生於開課日前三十日內提出退費申請者，退還當期開班約定繳納費用總額百分之九十。</td>
                          </tr>
                          <tr>
                            <td>三、</td>
                            <td className="text-gray-500">學生於實際開課日起至第十日前，且未逾全期（或總課程時數）三分之一期間內提出退費申請者，退還當期開班約定繳納費用總額百分之八十。</td>
                          </tr>
                          <tr>
                            <td>四、</td>
                            <td className="text-gray-500">學生於實際開課日第十日起且未逾全期（或總課程時數）三分之一期間內提出退費申請者，退還約定繳納費用百分之六十。</td>
                          </tr>
                          <tr>
                            <td>五、</td>
                            <td className="text-gray-500">學生於全期（或總課程時數）三分之一以上且未逾全期(或總課程時數)二分之一期間內提出退費申請者，退還約定繳納費用百分之四十。</td>
                          </tr>
                          <tr>
                            <td>六、</td>
                            <td className="text-gray-500">學生於全期（或總課程時數）二分之一以上提出退費申請者，所收取之當期費用得全數不予退還。</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setCheck4(true);
                    setOpen4(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  確認並詳細閱讀
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="container mx-auto p-2 animate-fadeIn ">
        <div className="bg-white ring-1 ring-gray-200 rounded-md p-4">
          <span className="flex justify-between items-start p-2">
            <div className="text-red-500 text-sm">
              <div className="">請確認基本資料是否正確，如需修改請點選右方修改按鈕，並儲存。</div>
              <div className="">如資料正確請幫我們閱讀條款並簽名。</div>
            </div>

            <button
              onClick={() => {
                setUpdate(!update);
              }}
              type="button"
              className="relative inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-gray-100"
            >
              {`${update ? " 瀏覽(View)" : "修改(Update)"}`}
            </button>
          </span>
          {update ? (
            <>
              <div className="my-3 text-xl font-semibold text-pink-500">基本資料</div>
              <div className="bg-white px-4">
                <div className="border-2 rounded-md p-4 grid grid-cols-4 gap-2 font-semibold">
                  <div className="text-lg font-medium leading-6 text-sky-500">中文姓名：</div>
                  <div>
                    <input
                      type="text"
                      className="border w-full p-1 rounded-md"
                      value={user.first_name}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          first_name: e.target.value
                        });
                      }}
                    />
                  </div>

                  <div className="text-lg font-medium leading-6 text-sky-500">英文姓名：</div>
                  <div>
                    <input
                      type="text"
                      className="border w-full p-1 rounded-md"
                      value={user.nick_name}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          nick_name: e.target.value
                        });
                      }}
                    />
                  </div>

                  <div className="text-lg font-medium leading-6 text-sky-500">年級：</div>
                  <div>
                    <select
                      onChange={(e) => {
                        setUser({
                          ...user,
                          grade_id: e.target.value
                        });
                      }}
                      value={user.grade_id}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                    >
                      <option>請選擇年級</option>
                      {grade &&
                        grade.map((i) => (
                          <option
                            key={i.id}
                            value={i.id}
                          >
                            {i.grade_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="text-lg font-medium leading-6 text-sky-500">學校：</div>
                  <div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="col-span-1">
                        <select
                          value={user.city_id}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              city_id: e.target.value
                            });
                          }}
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                        >
                          {cityList &&
                            cityList?.map((i) => (
                              <option
                                key={i.id}
                                value={i.id}
                              >
                                {i.city_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-span-1">
                        <select
                          value={user.dist_id}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              dist_id: e.target.value
                            });
                          }}
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                        >
                          {filteredDist &&
                            filteredDist?.map((i) => (
                              <option
                                key={i.id}
                                value={i.id}
                              >
                                {i.dist_name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-span-1">
                        <select
                          value={user.school_type_id}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              school_type_id: e.target.value
                            });
                          }}
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                        >
                          <option value={1}>幼兒園</option>
                          <option value={2}>國小</option>
                          <option value={3}>國中</option>
                          <option value={4}>高中</option>
                        </select>
                      </div>
                    </div>
                    <Combobox
                      as="div"
                      value={selectedSchool}
                      onChange={(select) => {
                        if (select) {
                          setQuery("");
                          setSelectedSchool(select);
                          setUser({
                            ...user,
                            school_id: select.id
                          });
                        }
                      }}
                    >
                      <div className="relative">
                        <ComboboxInput
                          className="w-full rounded-md border-0 bg-white py-1 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                          onChange={(event) => setQuery(event.target.value)}
                          onBlur={() => setQuery("")}
                          displayValue={(selectedSchool) => selectedSchool?.school_name || "請選擇學校"}
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </ComboboxButton>

                        {filteredSchool?.length > 0 && (
                          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
                            {filteredSchool.map((item) => (
                              <ComboboxOption
                                key={item.id}
                                value={item}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                              >
                                <span className="block truncate group-data-[selected]:font-semibold">{item.school_name}</span>
                              </ComboboxOption>
                            ))}
                          </ComboboxOptions>
                        )}
                      </div>
                    </Combobox>
                  </div>

                  <div className="text-lg font-medium leading-6 text-sky-500">生日：</div>
                  <div>
                    <input
                      type="date"
                      className="border w-full p-1 rounded-md"
                      value={user.birthday}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          birthday: e.target.value
                        });
                      }}
                    />
                  </div>

                  <div className="text-lg font-medium leading-6 text-sky-500">地址：</div>
                  <div>
                    <input
                      type="text"
                      className="border w-full p-1 rounded-md"
                      value={user.address}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          address: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="text-lg font-medium leading-6 my-2">家長資訊</div>
                <div className="border-2 rounded-md p-4 grid grid-cols-2 gap-3 font-semibold">
                  {user.parent_list.map((parent, index) => (
                    <div
                      key={index}
                      className="border p-2 rounded-md"
                    >
                      <div className="grid grid-cols-2 my-1">
                        <span className="text-lg font-medium leading-6 text-sky-500">姓名：</span>
                        <input
                          type="text"
                          className="border w-full p-1 rounded-md"
                          value={parent.first_name}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              parent_list: user.parent_list.map((item, ii) => {
                                if (index == ii) {
                                  return {
                                    ...item,
                                    first_name: e.target.value
                                  };
                                } else {
                                  return item;
                                }
                              })
                            });
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 my-1">
                        <span className="text-lg font-medium leading-6 text-sky-500">電話：</span>
                        <input
                          type="text"
                          className="border w-full p-1 rounded-md"
                          value={parent.tel}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              parent_list: user.parent_list.map((item, ii) => {
                                if (index == ii) {
                                  return {
                                    ...item,
                                    tel: e.target.value
                                  };
                                } else {
                                  return item;
                                }
                              })
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-3 text-xl font-semibold text-pink-500">性向</div>
              <div className="bg-white px-4">
                <div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    身體將康狀況、過敏，需補習班留意<span className="text-gray-400">(History)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {history.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    母親管教方式<span className="text-gray-400">(Mother’s parenting approach)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {mom_style.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    父親管教方式<span className="text-gray-400">(Father’s parenting approach)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {dad_style.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    生活習慣<span className="text-gray-400">(Life)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {life.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    人際關係<span className="text-gray-400">(Interpersonal relationships)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {relationships.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    外向行為<span className="text-gray-400">(Introvert)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {introvert.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    內向行為<span className="text-gray-400">(Extrovert)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {extrovert.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    學習狀況<span className="text-gray-400">(Learning)</span>
                  </label>
                  <div className="grid grid-cols-3 border-2 rounded-md p-1 mb-4">
                    {learning.map((i) => (
                      <div
                        key={i.id}
                        className="flex items-center col-span-1"
                      >
                        <div>
                          <input
                            checked={select.some((ii) => ii == i.id)}
                            onChange={() => {
                              handelSelect(i.id);
                            }}
                            type="checkbox"
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="ml-4 p-1">
                          <div className="text-gray-700 text-md">
                            {i.name}
                            <div className="text-gray-500">{i.en_name}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="my-3 text-xl font-semibold text-pink-500">基本資料</div>
              <div className="bg-white px-4">
                <div className="border-2 rounded-md p-4 grid grid-cols-4">
                  <span className="text-lg font-medium leading-6 text-sky-500">中文姓名：</span>
                  <span>{user.first_name}</span>

                  <span className="text-lg font-medium leading-6 text-sky-500">英文姓名：</span>
                  <span>{user.nick_name}</span>

                  <span className="text-lg font-medium leading-6 text-sky-500">年級：</span>
                  <span>{grade.filter((item) => item.id == user.grade_id)[0]?.grade_name}</span>

                  <span className="text-lg font-medium leading-6 text-sky-500">學校：</span>
                  <span>{user.school_name}</span>

                  <span className="text-lg font-medium leading-6 text-sky-500">生日：</span>
                  <span>{new Date(user.birthday).toLocaleDateString()}</span>

                  <span className="text-lg font-medium leading-6 text-sky-500">地址：</span>
                  <span>{user.address}</span>
                </div>
                <div className="text-lg font-medium leading-6 my-2">家長資訊</div>
                <div className="border-2 rounded-md p-4 grid grid-cols-2">
                  {user.parent_list.map((parent, index) => (
                    <div key={index}>
                      <div>
                        <span className="text-lg font-medium leading-6 text-sky-500">姓名：</span>
                        <span>{parent.first_name}</span>
                      </div>
                      <div>
                        <span className="text-lg font-medium leading-6 text-sky-500">電話：</span>
                        <span>{parent.tel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-3 text-xl font-semibold text-pink-500">性向</div>
              <div className="bg-white px-4">
                <div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    身體將康狀況、過敏，需補習班留意<span className="text-gray-400">(History)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {history.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    母親管教方式<span className="text-gray-400">(Mother’s parenting approach)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {mom_style.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    父親管教方式<span className="text-gray-400">(Father’s parenting approach)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {dad_style.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    生活習慣<span className="text-gray-400">(Life)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {life.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    人際關係<span className="text-gray-400">(Interpersonal relationships)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {relationships.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    外向行為<span className="text-gray-400">(Introvert)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {introvert.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    內向行為<span className="text-gray-400">(Extrovert)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {extrovert.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <label className="mt-2 block text-lg font-medium leading-6 text-sky-500">
                    學習狀況<span className="text-gray-400">(Learning)</span>
                  </label>
                  <div className="grid grid-cols-5 border-2 rounded-md p-1 mb-4">
                    {learning.map((i) => {
                      if (select.some((ii) => ii == i.id)) {
                        return (
                          <div
                            key={i.id}
                            className="flex items-center col-span-1"
                          >
                            <div className="text-gray-700 text-md">
                              {i.name}
                              <div className="text-sm text-gray-400">{i.en_name}</div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          {update && (
            <div className="flex justify-center pb-4">
              <button
                onClick={() => {
                  saveStudentData();
                }}
                type="button"
                className="relative inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-gray-200"
              >
                儲存(Save)
              </button>
            </div>
          )}
        </div>

        <div className="bg-white ring-1 ring-gray-200 rounded-md">
          <div className="text-center mt-2 py-4">
            <div className="text-xl text-gray-500">以下是退費辦法，請詳細閱讀保障您的權益。</div>
            <div className="text-gray-500">Below are the refund policies. Please read them carefully to protect your rights.</div>
          </div>
          <fieldset className="flex justify-center">
            <legend className="text-center">
              請點選閱讀<span className="text-gray-400">(Please click to read)</span>
            </legend>
            <div className="space-y-5">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={check1}
                    disabled
                  />
                </div>
                <div
                  onClick={() => {
                    setOpen1(true);
                  }}
                  className="ml-3 text-sm leading-6"
                >
                  <label className="font-medium text-blue-500 cursor-pointer">
                    一、資料保護<p className="text-blue-300">(Personal data authorization)</p>
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={check2}
                    disabled
                  />
                </div>
                <div
                  onClick={() => {
                    setOpen2(true);
                  }}
                  className="ml-3 text-sm leading-6"
                >
                  <label className="font-medium text-blue-500 cursor-pointer">
                    二、【學期期間】學生個人因素請假退費與補課規範<p className="text-blue-300">(Leave, refund, and make-up class policy due to personal reasons)</p>
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={check3}
                    disabled
                  />
                </div>
                <div
                  onClick={() => {
                    setOpen3(true);
                  }}
                  className="ml-3 text-sm leading-6"
                >
                  <label className="font-medium text-blue-500 cursor-pointer">
                    三、退費手續<p className="text-blue-300">(Refund procedure)</p>
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    checked={check4}
                    disabled
                  />
                </div>
                <div
                  onClick={() => {
                    setOpen4(true);
                  }}
                  className="ml-3 text-sm leading-6"
                >
                  <label className="font-medium text-blue-500 cursor-pointer">
                    四、【離班退費辦法】補習班學生繳納費用後離班者，補習班應依下列規定辦理退費<p className="text-blue-300">(Refund policy)</p>
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <p className="text-center text-red-400 pt-1">詳細閱讀完畢後請請簽名並送出。</p>
          <p className="text-center text-red-200">(Please sign and submit after reading the details.)</p>
          <div className="flex justify-center pb-4">
            <div>
              <button
                className="block border-4 border-red-200 rounded-md m-1 px-2.5 py-1.5  text-md font-semibold shadow-sm text-pink-400"
                onClick={clearSignature}
              >
                清除簽名<p className="text-pink-200">(Clear)</p>
              </button>
            </div>

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "sigCanvas border-2 bg-white" }}
            />
          </div>
          <div className="flex justify-center pb-4">
            {check1 && check2 && check3 && check4 && (
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={submit}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  送出<span className="text-gray-300">(Submit)</span>
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
