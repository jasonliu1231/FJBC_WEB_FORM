"use client";

import { useState, useEffect, useRef } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { formatDate, formatDateTime } from "../date";

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
  const [subData, setSubData] = useState({ p_type: true });
  const [select, setSelect] = useState([]);
  const [course, setCourse] = useState([]);
  const [infoSource, setInfoSource] = useState([]);
  const [selected, setSelected] = useState(1);
  const [userId, setUserId] = useState();
  const [page, setPage] = useState(1);
  const [grade, setGrade] = useState();
  const [city, setCity] = useState(2);
  const [dist, setDist] = useState(120);
  const [schoolType, setSchoolType] = useState(2);
  const [cityList, setCityList] = useState();
  const [distList, setDistList] = useState();
  const [school, setSchool] = useState();
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [loading, setLoading] = useState(true);

  // 補習班
  const t = tutoring.filter((i) => i.id == selected)[0];

  const filteredDist = city ? distList?.filter((i) => i.city_id == city) : [];

  const schoolList = school?.filter((item) => {
    return item.city_id == city && item.dist_id == dist && schoolType == item.school_type_id;
  });

  const filteredSchool =
    query === ""
      ? schoolList
      : schoolList.filter((item) => {
          return item.school_name.toLowerCase().includes(query.toLowerCase()) && item.city_id == city && item.dist_id == dist;
        });

  async function submit() {
    if (!subData.chinese_name) {
      alert("請填寫學生中文姓名！");
      return;
    }

    subData.tutoring_id = t.id;
    subData.tutoring_name = t.name;
    const config = {
      method: userId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        preparation: subData,
        preparationdetail: select
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

  function handelSelect(id) {
    if (select.some((i) => i == id)) {
      setSelect(select.filter((i) => i != id));
    } else {
      setSelect([...select, id]);
    }
  }

  async function getCourse(tutoring) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/course?id=${tutoring}`);
    const res = await response.json();
    if (response.ok) {
      setCourse(res);
    } else {
      alert(res.msg);
    }
  }

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const tutoring = params.get("tutoring");

    if (tutoring) {
      setSelected(tutoring);
      getCourse(tutoring);
    }

    const grade = fetch(`${process.env.NEXT_PUBLIC_API}/api/grade`);
    const school = fetch(`${process.env.NEXT_PUBLIC_API}/api/school`);
    const source = fetch(`${process.env.NEXT_PUBLIC_API}/api/infosource`);
    const api = [grade, school, source];
    if (id) {
      const preparation = fetch(`${process.env.NEXT_PUBLIC_API}/api/preparation?id=${id}`);
      api.push(preparation);
      setUserId(id);
    }
    Promise.all(api)
      .then(async ([response1, response2, response3, response4]) => {
        const result1 = await response1.json();
        const result2 = await response2.json();
        const result3 = await response3.json();
        setGrade(result1);
        setSchool(result2.school);
        setCityList(result2.city);
        setDistList(result2.dist);
        setInfoSource(result3);
        if (id) {
          const result4 = await response4.json();
          setSubData(result4.entity);
          setSelect(result4.detail.map((i) => i.selectid));
          setSelected(result4.entity.tutoring_id);
          getCourse(result4.entity.tutoring_id);
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
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center gap-x-4 sm:p-6">
        <img
          src={t.imageUrl}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />
        <div className="text-sm sm:text-xl font-medium leading-6 text-gray-900">{t.name}</div>
      </div>
      {page == 1 && (
        <div className="animate-fadeIn">
          <div className="text-center my-4 sm:px-12">
            <div className="text-sm sm:text-xl text-gray-500">請幫我們填寫基本資料，讓我們聯絡您。</div>
            <div className="text-sm sm:text-md text-gray-500">Please provide your basic information so we can contact you.</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 mt-2 sm:mt-8">
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
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
                  placeholder="中文(Chinese name)"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                />
              </div>
            </div>
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
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
                  placeholder="英文(English name)"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                />
              </div>
            </div>
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
                學校<span className="text-gray-400">(School)</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                <div className="col-span-1">
                  <select
                    value={city}
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
                <div className="col-span-1">
                  <select
                    value={dist}
                    onChange={(e) => {
                      setDist(e.target.value);
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
                    value={schoolType}
                    onChange={(e) => {
                      setSchoolType(e.target.value);
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
                    setSubData({
                      ...subData,
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
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
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
            <div className="col-span-1 sm:col-span-2">
              <label className="mt-2 block text-sm sm:text-lg font-medium leading-6 text-sky-500">
                學習狀況<span className="text-gray-400">(Learning)</span>
              </label>
              <div className="grid grid-cols-3 border-2 rounded-md p-1 sm:mb-4">
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
                      <div className="text-gray-700 text-sm sm:text-md">
                        {i.name}
                        <div className="hidden lg:block text-gray-500">{i.en_name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 sm:mt-12">
            <span className="isolate inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setPage(2)}
                type="button"
                className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm sm:text-md font-semibold text-white shadow-sm"
              >
                下一步<span className="text-gray-300">(Next)</span>
              </button>
            </span>
          </div>
        </div>
      )}
      {page == 2 && (
        <div className="animate-fadeIn">
          <div className="text-center my-4 sm:px-12">
            <div className="text-sm sm:text-xl text-gray-500">期望進一步瞭解您的需求，請幫我們填寫下方資訊。</div>
            <div className="text-sm sm:text-md text-gray-500">In order to better understand your needs, please provide the following interview information.</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 mt-2 sm:mt-4">
            <div className="col-span-1 sm:col-span-2">
              <label className="mt-2 block text-sm sm:text-lg font-medium leading-6 text-sky-500">
                詢問課程<span className="text-gray-400">(Course)</span>
              </label>
              <div className="grid grid-cols-3 border-2 rounded-md p-1 sm:mb-4">
                {course.map((i) => (
                  <div
                    key={i.course_no}
                    className="flex items-center col-span-1"
                  >
                    <div>
                      <input
                        checked={select.some((ii) => ii == i.course_no)}
                        onChange={() => {
                          handelSelect(i.course_no);
                        }}
                        type="checkbox"
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="ml-4 p-1">
                      <div className="text-gray-700 text-sm sm:text-md">{i.course_name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <label className="mt-2 block text-sm sm:text-lg font-medium leading-6 text-sky-500">
                如何得知本班資訊<span className="text-gray-400">(Course)</span>
              </label>
              <div className="grid grid-cols-3 border-2 rounded-md p-1 sm:mb-4">
                {infoSource.map((i) => (
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
                      <div className="text-gray-700 text-sm sm:text-md">{i.info_name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
                希望試聽時間<span className="text-gray-400">(Trial lesson time)</span>
              </label>
              <div className="mt-2">
                <input
                  value={formatDateTime(subData.trialclass) || ""}
                  onChange={(e) => {
                    setSubData({
                      ...subData,
                      trialclass: e.target.value
                    });
                  }}
                  type="datetime-local"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                />
              </div>
            </div>
            <div className="col-span-1 text-sm sm:text-lg">
              <label className="block font-medium leading-6 text-gray-900">
                希望檢測時間<span className="text-gray-400">(Test time)</span>
              </label>
              <div className="mt-2">
                <input
                  value={formatDateTime(subData.exam) || ""}
                  onChange={(e) => {
                    setSubData({
                      ...subData,
                      exam: e.target.value
                    });
                  }}
                  type="datetime-local"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200"
                />
              </div>
            </div>
            {/* <div className="col-span-1 text-sm sm:text-lg">
              <div className="grid grid-cols-2 p-1">
                <div className="flex items-center col-span-1">
                  <div>
                    <input
                      checked={select.some((ii) => ii == "audition")}
                      onChange={() => {
                        handelSelect("audition");
                      }}
                      type="checkbox"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="ml-4 p-1">
                    <div className="text-gray-700">參加課程試聽</div>
                    <div className="hidden lg:block text-gray-500">Trial lesson</div>
                  </div>
                </div>{" "}
                <div className="flex items-center col-span-1">
                  <div>
                    <input
                      checked={select.some((ii) => ii == "tryExam")}
                      onChange={() => {
                        handelSelect("tryExam");
                      }}
                      type="checkbox"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="ml-4 p-1">
                    <div className="text-gray-700">參加能力檢測</div>
                    <div className="hidden lg:block text-gray-500">Skills test</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="text-center sm:my-4 sm:px-12">
            <div className="text-sm sm:text-xl text-red-500">{`感謝您抽空填寫基本資料，已同意本表單收集之個人資料使用權，僅於「${t.name}」使用，非經當事人同意，不轉作其他用途。`}</div>
            <div className="text-sm text-red-500">{`Thank you for taking the time to fill out the basic information. Consent is granted for the use of the personal data collected in this form solely for the purpose of 「${t.name}」, and it will not be used for other purposes without the consent of the individual.`}</div>
          </div>
          <div className="flex justify-center mt-4 sm:mt-12">
            <span className="isolate inline-flex rounded-md shadow-sm mx-4">
              <button
                onClick={() => setPage(1)}
                type="button"
                className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm sm:text-md font-semibold text-white shadow-sm"
              >
                上一步<span className="text-gray-300">(Prev)</span>
              </button>
            </span>
            <span className="isolate inline-flex rounded-md shadow-sm mx-4">
              <button
                onClick={submit}
                type="button"
                className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm sm:text-md font-semibold text-white shadow-sm"
              >
                送出<span className="text-gray-300">(Submit)</span>
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
