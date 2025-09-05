import React from "react";

export default function ProfileCard({ p }) {
    return (
        <div className="profile-card">
            <img src={p.image} alt={p.name} className="profile-img" />
            <h3>{p.name}</h3>
            <p className="age">Age: {p.age}</p>
            <span className="profession">{p.profession}</span>
            <p className="location">{p.location}</p>

            {/* Dynamic stars */}
            <div className="rating">
                {Array.from({ length: p.rating }, (_, i) => (
                    <span key={i}>⭐</span>
                ))}
            </div>

            <p>{p.experience} Experience</p>
            <p>{p.projects} Projects</p>

            {/* Skills as boxes */}
            <div className="skills">
                {p.skills.map((s, i) => (
                    <span key={i} className="skill">
                        {s}
                    </span>
                ))}
            </div>

            <button className="contact-btn">Contact</button>
        </div>
    );
}
