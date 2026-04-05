import React, { useState, useEffect } from "react";
import API from "../services/api";
import Event from "./Event";
const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //  Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  //  Filtering logic
  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.eventName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation =
      !location ||
      e.venue?.toLowerCase().includes(location.toLowerCase());

    const matchesPrice =
      !price ||
      (price === "Free" && e.price === 0) ||
      (price === "Paid" && e.price > 0);

    const eventDate = new Date(e.date);
    const matchesStartDate =
      !startDate || eventDate >= new Date(startDate);
    const matchesEndDate =
      !endDate || eventDate <= new Date(endDate);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesPrice &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  //  Loading state
  if (loading) {
    return (
      <div className="text-center mt-20 text-yellow-400">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-50 px-6 py-10 pt-20">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10
        bg-linear-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
        Upcoming Events
      </h1>

      {/* Filters */}
      <div className="max-w-3xl mx-auto bg-gray-900 border border-yellow-600
        rounded-xl p-5 mb-10 space-y-4">

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-yellow-400 font-semibold w-sm">
            Filter by
          </label>

          <select
            className="bg-black border border-yellow-500 rounded-lg px-4 py-2 w-full"
            onChange={(e) => {
              setSearchBy(e.target.value);
              setLocation("");
              setPrice("");
              setStartDate("");
              setEndDate("");
            }}
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="date">Date Range</option>
            <option value="location">Location</option>
          </select>
        </div>

        {/* Price Filter */}
        {searchBy === "price" && (
          <select
            className="w-full bg-black border border-yellow-500 rounded-lg px-4 py-2"
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        )}

        {/* Location Filter */}
        {searchBy === "location" && (
          <input
            type="text"
            placeholder="Enter location"
            className="w-full bg-black border border-yellow-500 rounded-lg px-4 py-2"
            onChange={(e) => setLocation(e.target.value)}
          />
        )}

        {/* Date Filter */}
        {searchBy === "date" && (
          <div className="flex items-center gap-3 flex-wrap">
            <label>From</label>
            <input
              type="date"
              className="bg-white border border-yellow-500 rounded-lg px-2 py-2 text-black"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>To</label>
            <input
              type="date"
              className="bg-white border border-yellow-500 rounded-lg px-4 py-2 text-black"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full max-w-md px-4 py-3 rounded-xl
          bg-gray-900 border border-yellow-500
          text-yellow-100 placeholder-yellow-300
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((e) => (
          <Event
            key={e._id}
            id={e._id}
            eventName={e.eventName}
            description={e.description}
            venue={e.venue}
            image={`https://circle-up-final-server.vercel.app/${e.image}`} // ✅ FIXED
            date={e.date}
            timeFrom={e.timeFrom}
            timeTo={e.timeTo}
            eventCoordinator={e.eventCoordinator}
            category={e.category}
            price={e.price}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-yellow-400 mt-16">
          No events found 🗓️
        </p>
      )}
    </div>
  );
};

export default Events;