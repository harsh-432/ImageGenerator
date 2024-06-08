import React, { useCallback, useRef } from "react";
import useFetchImage from "../CustomHooks/useFetchImage";
import GalleryItem from "./GalleryItem";
import { MoonLoader } from "react-spinners";

function Gallery() {
  const { list, setPageNumber, loading, error, hasMore, query } =
    useFetchImage();
  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (node) {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore) {
              setPageNumber((prev) => prev + 1);
            }
          },
          { threshold: 1 }
        );

        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className=" mx-auto dark:h-screen  w-full px-6 pb-8 md:w-[768px] lg:w-[1024px]  xl:w-[1280px] py-12 columns-1  sm:columns-2 lg:columns-3 gap-6 space-y-6 ">
        {list.map((e, index) => {
          if (list.length === index + 1) {
            return (
              <GalleryItem
                key={index}
                isLast={list.length === index + 1}
                refInfo={lastItemRef}
                Data={e}
              />
            );
          }
          return <GalleryItem key={index} Data={e} />;
        })}
      </div>
      
      {list.length == 0 && query && (
        <div className="w-full text-center text-red-400 text-xl sm:text-4xl lg:text-6xl font-bold">
          Result Not Found !
        </div>
      )}

      {loading && !error && <MoonLoader className="mx-auto text-white mb-6" />}
      {error && (
        <div className="px-3 py-2 text-xl text-white bg-red-400 text-center">
          Oops! Something Went Wrong{" "}
        </div>
      )}
    </>
  );
}

export default Gallery;
