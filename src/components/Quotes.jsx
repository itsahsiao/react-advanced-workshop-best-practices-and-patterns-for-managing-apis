import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const abortRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const initFetchQuotes = async (page) => {
    try {
      setIsError(false);
      setIsLoading(true);
      // abortRef.current?.(); // abort previous if there is one defined
      // if (typeof abortRef.current === 'function') abortRef.current();

      abortRef.current?.abort();

      const controller = new AbortController();
      // could just assign the abort and call per Line 12-13
      // abortRef.current = controller.abort.bind(controller);

      // could assign the whole controller then call per Line 15
      abortRef.current = controller;
      // controller.signal
      // controller.abort
      const quotesData = await axios.get(
        `http://localhost:4000/quotes?_page=${page}}`,
        {
          signal: controller.signal,
        }
        // `http://localhost:4000/quotes`,
        // {
        //   params: {
        //     _page: page,
        //   },
        // }
      );
      setQuotes(quotesData.data);
    } catch (error) {
      console.error(error);
      if (error.name === "CanceledError") {
        console.warn(`Previous request for ${page} was cancelled`);
      } else {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onPrev = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  const onNext = () => {
    // TODO: Check what is the last page, as can't keep going further
    setPage((page) => page + 1);
  };

  useEffect(() => {
    initFetchQuotes(page);
  }, [page]);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4">Quotes</h2>

      <div>
        <Pagination page={page} onPrev={onPrev} onNext={onNext} />

        {isLoading ? <p>Loading quotes...</p> : null}
        {isError ? (
          <div>
            <p>Something went wrong...</p>
            <button onClick={() => initFetchQuotes(page)}>Retry</button>
          </div>
        ) : null}

        {quotes.map((quote) => {
          return (
            <blockquote
              key={quote.id}
              className="relative p-4 text-xl italic border-l-4"
            >
              <p className="mb-4">"{quote.quote}"</p>
              <cite className="flex items-center justify-center">
                <div className="flex flex-col items-start">
                  <span className="mb-1 text-sm italic font-bold">
                    {quote.author}
                  </span>
                </div>
              </cite>
            </blockquote>
          );
        })}
      </div>
    </div>
  );
};

export default Quotes;
