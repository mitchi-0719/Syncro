import { useEffect, useState } from "react";

export const Top = () => {
  const [cookieData, setCookieData] = useState<string[]>([]);

  // dummy処理 最終的には消す
  useEffect(() => {
    (async () => {
      fetch("dummy/dummyCookieData.json")
        .then((res) => res.json())
        .then((data) => {
          setCookieData(data["dummyCookies"]);
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  }, []);

  return (
    <div>
      <h3>cookieData</h3>
      {cookieData.map((cookie) => {
        return <div key={cookie}>{cookie}</div>;
      })}
    </div>
  );
};
