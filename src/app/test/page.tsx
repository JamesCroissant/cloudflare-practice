'use client';

import { useEffect, useState } from "react";

export default function Test() {
  const [data, setData] = useState<{ message: string } | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/test');
      const data = await response.json() as { message: string };
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return <div>{JSON.stringify(data)}</div>;
}