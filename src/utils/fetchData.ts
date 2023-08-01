const fetchData = async (URL: string) => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export default fetchData;
