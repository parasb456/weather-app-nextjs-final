"use client";
import React, { useEffect, useState } from "react";
import { ApiProvider } from "@/app/api_provider/api_provider";
import {
  CountrySorting,
  NameSorting,
  Result,
} from "@/app/interfaces/interfaces";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import dynamic from "next/dynamic";

type Props = {};

function Table({}: Props) {
  const [limit, setLimit] = useState(20);
  const [results, setResults] = useState<Result[]>([]);
  const [countrySorting, setCountrySorting] = useState<CountrySorting>(
    CountrySorting.NONE
  );
  const [nameSorting, setNameSorting] = useState<NameSorting>(NameSorting.NONE);
  const [queryString, setQueryString] = useState<string>("");

  const switchNameSorting = () => {
    let queryString = ``;
    switch (nameSorting) {
      case NameSorting.NONE:
        {
          queryString = "&order_by=name asc";
          setNameSorting(NameSorting.ASC);
        }
        break;
      case NameSorting.ASC:
        {
          queryString = "&order_by=name desc";
          setNameSorting(NameSorting.DSC);
        }
        break;
      case NameSorting.DSC:
        {
          setNameSorting(NameSorting.NONE);
        }
        break;
    }
    setLimit(20);
    setQueryString(queryString);
  };

  const switchCountrySorting = () => {
    let queryString = ``;
    switch (countrySorting) {
      case CountrySorting.NONE:
        {
          queryString = "&order_by=cou_name_en asc";
          setCountrySorting(CountrySorting.ASC);
        }
        break;
      case CountrySorting.ASC:
        {
          queryString = "&order_by=cou_name_en desc";
          setCountrySorting(CountrySorting.DSC);
        }
        break;
      case CountrySorting.DSC:
        {
          setCountrySorting(CountrySorting.NONE);
        }
        break;
    }
    setLimit(20);
    setQueryString(queryString);
  };

  useEffect(() => {
    ApiProvider.getAllCities(limit, limit - 20, queryString).then(
      (response) => {
        setResults(response);
      }
    );
  }, [queryString]);

  const fetchMoreData = () => {
    setLimit(limit + 20);
    ApiProvider.getAllCities(limit, limit - 20, queryString).then(
      (response) => {
        setResults([...results, ...response]);
      }
    );
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      <thead className="text-x h-4 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 text-white text-center">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
              City Name
              <svg
                onClick={switchNameSorting}
                className="w-3 h-3 ms-1.5 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </div>
          </th>
          <th scope="col" className="px-6 py-3   ">
            <div className="flex items-center">
              Country Name
              <svg
                onClick={switchCountrySorting}
                className="w-3 h-3 ms-1.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
              </svg>
            </div>
          </th>
          <th scope="col" className="px-6 py-3 text-left">
            TimeZone
          </th>
        </tr>
      </thead>
      <tbody>
        {results.map((v, i) => {
          return (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-900 dark:text-white">
                <Link href={`/weatherDetails/${v.name}`}>{v.name}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left  ">
                {v.cou_name_en}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left">
                {v.timezone}
              </td>
            </tr>
          );
        })}
        <InfiniteScroll
          dataLength={results.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {results.map((v, i) => {
            return <div key={`I${i}`}></div>;
          })}
        </InfiniteScroll>
        <style jsx>
          {`
            .back {
              padding: 10px;
              background-color: dodgerblue;
              color: white;
              margin: 10px;
            }
          `}
        </style>
      </tbody>
    </table>
  );
}

export default dynamic(() => Promise.resolve(Table), { ssr: false });
