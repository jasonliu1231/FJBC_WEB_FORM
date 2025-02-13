"use client";

import { useState, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { formatDate, formatDateTime } from "../date";

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
  const [subData, setSubData] = useState({});
  const [userId, setUserId] = useState();
  const [select, setSelect] = useState([]);
  const sigCanvas = useRef(null);
  const [page, setPage] = useState(1);
  const [grade, setGrade] = useState();
  const [city, setCity] = useState(2);
  const [dist, setDist] = useState(120);
  const [cityList, setCityList] = useState();
  const [distList, setDistList] = useState();
  const [school, setSchool] = useState();
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false); // 用來觸發重新渲染

  const schoolList = school
    ? school.filter((item) => {
        return item.city_id == city && item.dist_id == dist;
      })
    : [];

  const filteredSchool =
    query === ""
      ? schoolList
      : schoolList.filter((item) => {
          return item.school_name?.toLowerCase().includes(query.toLowerCase()) && item.city_id == city && item.dist_id == dist;
        });

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const oldSignature = () => {
    if (subData.signature) {
      sigCanvas.current.fromDataURL(subData.signature);
    } else {
      alert("沒有原始簽名黨！");
    }
  };

  async function submit() {
    const dataURL = sigCanvas.current.toDataURL();
    subData.admission = true;
    const config = {
      method: userId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        preparation: subData,
        preparationdetail: select,
        signature: dataURL
      })
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/preparation`, config);
    const res = await response.json();
    if (response.ok) {
      alert("感謝您的填寫，請將平板交予工作人員！");
      window.location.href = `/asklist`;
    } else {
      alert(res.msg);
    }
  }

  function handelSelect(uuid) {
    if (select.some((i) => i == uuid)) {
      setSelect(select.filter((i) => i != uuid));
    } else {
      setSelect([...select, uuid]);
    }
  }

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    const api1 = fetch(`${process.env.NEXT_PUBLIC_API}/api/grade`);
    const api2 = fetch(`${process.env.NEXT_PUBLIC_API}/api/school`);
    const api = [api1, api2];
    if (id) {
      const api3 = fetch(`${process.env.NEXT_PUBLIC_API}/api/preparation?id=${id}`);
      api.push(api3);
      setUserId(id);
    }

    Promise.all(api)
      .then(async ([response1, response2, response3]) => {
        const result1 = await response1.json();
        const result2 = await response2.json();

        setGrade(result1);
        setSchool(result2.school);
        setCityList(result2.city);
        setDistList(result2.dist);
        if (id) {
          const result3 = await response3.json();
          setSubData(result3.entity);
          setSelect(result3.detail.map((i) => i.selectid));
        }

        setLoading(false);
      })
      .catch((error) => {
        alert("讀取不到資料，請聯繫資訊組!");
      });
  }, []);

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
      {" "}
      <div className="container mx-auto">
        <div className="mt-12 text-4xl text-center text-gray-500 font-semibold">
          填寫基本資料<div className="text-sm">Enrollment Information</div>
        </div>

        {page == 1 && (
          <div className="animate-fadeIn">
            <div className="text-center my-4 px-12">
              <div className="text-xl text-gray-500">入班前請幫我們填寫基本資料，讓我們認識您與孩子。</div>
              <div className="text-gray-500">Before joining the class, please help us fill out some basic information so that we can get to know you and your child.</div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  學生姓名<span className="text-gray-400">(Student name)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.chinese_name || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        chinese_name: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="中文姓名(Chinese name)"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  學生姓名<span className="text-gray-400">(Student name)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.english_name || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        english_name: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="英文姓名(English name)"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  學校<span className="text-gray-400">(School)</span>
                </label>
                <div className="flex my-2">
                  <div className="w-1/2 mr-1">
                    <select
                      defaultValue={city}
                      onChange={(e) => {
                        setCity(e.target.value);
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
                  <div className="w-1/2">
                    <select
                      defaultValue={dist}
                      onChange={(e) => {
                        setDist(e.target.value);
                      }}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                    >
                      {distList &&
                        distList?.map((i) => (
                          <option
                            key={i.id}
                            value={i.id}
                          >
                            {i.dist_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <Combobox
                  as="div"
                  value={selectedPerson}
                  onChange={(person) => {
                    setQuery("");
                    setSelectedPerson(person);
                    setSubData({
                      ...subData,
                      school_id: person.id
                    });
                  }}
                >
                  <div className="relative">
                    <ComboboxInput
                      className="w-full rounded-md border-0 bg-white py-1 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      onChange={(event) => setQuery(event.target.value)}
                      onBlur={() => setQuery("")}
                      value={subData.school_id ? filteredSchool.filter((i) => i.id == subData.school_id)[0]?.school_name : ""}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </ComboboxButton>

                    {filteredSchool?.length > 0 && (
                      <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5">
                        {filteredSchool.map((person) => (
                          <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <span className="block truncate group-data-[selected]:font-semibold">{person?.school_name}</span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  年級<span className="text-gray-400">(Grade)</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        grade_id: e.target.value
                      });
                    }}
                    value={subData.grade_id || ""}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  >
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
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  性別<span className="text-gray-400">(Gender)</span>
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        gender: e.target.value
                      });
                    }}
                    value={subData.gender || ""}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  >
                    <option></option>
                    <option value={1}>男生(Boy)</option>
                    <option value={2}>女生(Girl)</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  生日<span className="text-gray-400">(Birthday)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.birthday ? formatDate(subData.birthday) : ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        birthday: e.target.value
                      });
                    }}
                    type="date"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  地址<span className="text-gray-400">(Address)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.address || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        address: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="EX:台中市太平區..."
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  媽媽姓名<span className="text-gray-400">(Mother’s name)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.mother_name || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        mother_name: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="中文姓名(Chinese name)"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  媽媽手機<span className="text-gray-400">(Mother’s phone)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.mother_phone || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        mother_phone: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="EX:09xxxxxxxx"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  爸爸姓名<span className="text-gray-400">(Father’s name)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.father_name || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        father_name: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="中文姓名(Chinese name)"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  爸爸手機<span className="text-gray-400">(Father’s phone)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.father_phone || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        father_phone: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="EX:09xxxxxxxx"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  緊急聯絡人<span className="text-gray-400">(Emergency contact name)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.emergency_contact_name || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        emergency_contact_name: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="中文姓名(Chinese name)"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-lg font-medium leading-6 text-gray-900">
                  聯絡電話<span className="text-gray-400">(Emergency contact)</span>
                </label>
                <div className="mt-2">
                  <input
                    value={subData.emergency_contact || ""}
                    onChange={(e) => {
                      setSubData({
                        ...subData,
                        emergency_contact: e.target.value
                      });
                    }}
                    type="text"
                    placeholder="EX:09xxxxxxxx"
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <span className="isolate inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setPage(2)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  下一步<span className="text-gray-300">(Next)</span>
                </button>
              </span>
            </div>
          </div>
        )}
        {page == 2 && (
          <div className="animate-fadeIn">
            <div className="text-center my-4 px-12">
              <div className="text-xl text-gray-500">感謝您的填寫，再請您花點時間，讓我們更了解孩子狀況。</div>
              <div className="text-gray-500">Thank you for filling out the form. Please take a moment to help us better understand your child’s situation.</div>
            </div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-span-3">
                  <label className="text-gray-700 text-md flex">
                    備註<div className="hidden lg:block text-gray-500">(Remark)</div>
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={4}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={subData.remark || ""}
                      onChange={(e) => {
                        setSubData({
                          ...subData,
                          remark: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={() => setPage(1)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  上一步<span className="text-gray-300">(Prev)</span>
                </button>
              </span>
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={() => setPage(3)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  下一步<span className="text-gray-300">(Next)</span>
                </button>
              </span>
            </div>
          </div>
        )}
        {page == 3 && (
          <div className="animate-fadeIn">
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
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
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={() => setPage(2)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  上一步<span className="text-gray-300">(Prev)</span>
                </button>
              </span>
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={() => setPage(4)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  下一步<span className="text-gray-300">(Next)</span>
                </button>
              </span>
            </div>
          </div>
        )}
        {page == 4 && (
          <div className="animate-fadeIn">
            <div className="text-center my-4 px-12">
              <div className="text-xl text-gray-500">感謝您抽空填寫基本資料，以下是退費辦法，請詳細閱讀保障您的權益。</div>
              <div className="text-gray-500">Thank you for taking the time to fill out the basic information. Below are the refund policies. Please read them carefully to protect your rights.</div>
            </div>
            <fieldset className="flex justify-center">
              <legend className="sr-only">請點選閱讀</legend>
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
                    <label className="font-medium text-blue-500 cursor-pointer">一、資料保護</label>
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
                    <label className="font-medium text-blue-500 cursor-pointer">二、【學期期間】學生個人因素請假退費與補課規範</label>
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
                    <label className="font-medium text-blue-500 cursor-pointer">三、退費手續</label>
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
                    <label className="font-medium text-blue-500 cursor-pointer">四、【離班退費辦法】補習班學生繳納費用後離班者，補習班應依下列規定辦理退費</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <p className="text-center text-red-400 py-2">詳細閱讀完畢後請請簽名並送出。</p>
            <div className="flex justify-center">
              <div>
                <button
                  className="block border-4 border-blue-200 rounded-md m-1 px-2.5 py-1.5  text-md font-semibold shadow-sm text-pink-400"
                  onClick={oldSignature}
                >
                  原始簽名
                </button>
                <button
                  className="block border-4 border-red-200 rounded-md m-1 px-2.5 py-1.5  text-md font-semibold shadow-sm text-pink-400"
                  onClick={clearSignature}
                >
                  清除簽名
                </button>
              </div>

              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 500, height: 200, className: "sigCanvas border-2 bg-white" }}
              />
            </div>
            <div className="flex justify-center mt-12">
              <span className="isolate inline-flex rounded-md shadow-sm mx-4">
                <button
                  onClick={() => setPage(3)}
                  type="button"
                  className="rounded-md bg-green-600 px-2.5 py-1.5 text-md font-semibold text-white shadow-sm"
                >
                  上一步<span className="text-gray-300">(Prev)</span>
                </button>
              </span>
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
        )}
      </div>
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
    </>
  );
}
