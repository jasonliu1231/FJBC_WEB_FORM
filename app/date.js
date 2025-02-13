export const formatDate = (dateTimeString) => {
  if (!dateTimeString) return "";
  // 使用 Date 物件來處理時區
  const date = new Date(dateTimeString);
  // 將其格式化為 'YYYY-MM-DD'，處理本地時間
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  // 拼接成 'YYYY-MM-DD'
  return `${year}-${month}-${day}`;
};

export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "";
  // 使用 Date 物件來處理時區
  const date = new Date(dateTimeString);
  // 將其格式化為 'YYYY-MM-DDTHH:MM'，處理本地時間
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // 拼接成 'YYYY-MM-DDTHH:MM'
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
