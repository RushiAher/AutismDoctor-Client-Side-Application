import React from "react";

const SchemeCard = (props) => {
  return (
    <>
      <div
        href="#"
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:grid md:grid-col-1  min-h-max w-full"
        id={props.data.id} 
      >
        <img
          class="cover-fill w-full rounded-t-lg h-96 "
          src={props.data.img}
          alt="img"
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-semibold tracking-tight  ">
            {props.data.title}
          </h5>
          <p class="mb-3 font-normal text-gray-700 ">
            <ul>
              {props.data.summary.map((curr) => {
                return <li className="list-disc">{curr}</li>;
              })}
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default SchemeCard;
