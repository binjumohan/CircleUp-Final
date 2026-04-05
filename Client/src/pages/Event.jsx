import React from "react";
import { Link } from "react-router-dom";

const Event = ({
  id,
  eventName,
  description,
  venue,
  image,
  date,
  timeFrom,
  timeTo,
  eventCoordinator,
  category,
  price,
}) => {
  return (
   <div className="
  bg-slate-800 
  rounded-2xl 
  overflow-hidden 
  flex flex-col 
  h-full
  border border-yellow-500 
  hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]
  transition duration-300
">
  <img src={image} className="h-48 w-full object-cover" />

  <div className="p-4 flex flex-col flex-grow">

    <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full w-fit">
      {category}
    </span>

    <h3 className="text-lg font-bold mt-2">{eventName}</h3>

    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
      {description}
    </p>

    <p className="text-sm mt-2">{date}</p>
    <p className="text-sm text-yellow-400">{venue}</p>

    {/* PUSHED TO BOTTOM */}
    <div className="mt-auto flex justify-between items-center pt-4">
      <p className="text-sm text-gray-400">{eventCoordinator}</p>

      <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300">
        View Details
      </button>
    </div>

  </div>
</div>
  );
};

export default Event;
