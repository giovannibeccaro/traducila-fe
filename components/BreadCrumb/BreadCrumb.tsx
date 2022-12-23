import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const BreadCrumb = () => {
  const router = useRouter();
  const route = router.asPath;
  const [breadCrumbArr, setBreadCrumbArr] = useState<string[]>([]);
  useEffect(() => {
    setBreadCrumbArr(route.split("/"));
  }, [route]);

  return (
    <div className="breadcrumb">
      {breadCrumbArr.map((el, i) => {
        if (el === "")
          return (
            <Link key={i} href={"/traduzioni"}>
              traduzioni
            </Link>
          );
        if (breadCrumbArr.length > 2) {
          if (i === 1) {
            return (
              <>
                <span className="breadcrumb-divider">/</span>
                <Link
                  className={i === breadCrumbArr.length - 1 ? "active" : ""}
                  key={i}
                  href={`/${el}`}
                >
                  {el}
                </Link>
              </>
            );
          } else if (i === 2) {
            return (
              <>
                <span className="breadcrumb-divider">/</span>
                <p
                  className={i === breadCrumbArr.length - 1 ? "active" : ""}
                  style={{ display: "inline" }}
                >
                  {el}
                </p>
              </>
            );
          }
        }
      })}
    </div>
  );
};

export default BreadCrumb;
