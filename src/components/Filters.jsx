import React from "react";

export default function Filters({ search, setSearch, profession, setProfession, location, setLocation, sort, setSort }) {
    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Search professionals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select value={profession} onChange={(e) => setProfession(e.target.value)}>
                <option value="">All Professions</option>
                <option value="Flight Instructor">Flight Instructor</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="AI Specialist">AI Specialist</option>
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                <option value="Miami, FL">Miami, FL</option>
                <option value="Denver, CO">Denver, CO</option>
                <option value="Seattle, WA">Seattle, WA</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
            </select>
        </div>
    );
}
