import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/variables";
import styles from "./Table.module.css";

interface IFetchedData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  id: {
    name: string;
    value: string;
  };
  phone: string;
  email: string;
  gender: string;
  location: {
    city: string;
    country: string;
  };
}

export const Table = () => {
  const [data, setData] = useState<IFetchedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const maxPageCount = 10;
  const maxItemsCount = 10;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${baseUrl}/?page=${page}&results=10&seed=abc`)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setData(res.results);
      });
  }, [page]);

  const goToPage = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>name</th>
            <th>gender</th>
            <th>email</th>
            <th>city</th>
            <th>country</th>
          </tr>
        </thead>
        <tbody>
          {data.length && !isLoading ? (
            data.map((item) => {
              return (
                <tr key={item.phone}>
                  <td>{`${item.name.first} ${item.name.last}`}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.location.city}</td>
                  <td>{item.location.country}</td>
                </tr>
              );
            })
          ) : (
            <>
              {Array.from(Array(maxItemsCount).keys()).map((key) => {
                return (
                  <tr key={key}>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from(Array(maxPageCount).keys()).map((pageNum) => {
          return (
            <button
              key={pageNum}
              className={`${styles.paginationNumber} ${
                pageNum + 1 === page ? styles.paginationNumberActive : ""
              }`}
              onClick={() => goToPage(pageNum + 1)}
            >
              {pageNum + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
