import React from "react";
import "./PortfolioPage.css";

function getSkillIntensity(skill, experience) {
    let years = parseInt(experience) || 1;
    let percent = Math.min(100, 40 + years * 12);
    return percent;
}

const randomImg = "https://randomuser.me/api/portraits/men/32.jpg";

export default function PortfolioPage({ formData }) {
    const skillsObj = formData.skills || {};

    return (
        <div className="portfolio-container">
            {/* Banner: Only Name */}
            <div className="custom-banner-rect-flex">
                <div className="banner-center-rect">
                    <h1>{formData.name}</h1>
                </div>
            </div>

            <div className="below-banner-flex">
                <div className="banner-left-rect-wide" style={{ position: "relative" }}>
                    <img
                        src={randomImg}
                        alt="Profile"
                        className="banner-img-rect-wide"
                    />
                    {formData.experience && (
                        <div className="experience-ellipse">
                            {formData.experience} Experience
                        </div>
                    )}
                </div>
                <div className="banner-contact-col">
                    <div className="banner-icon">
                        <span className="icon-circle">
                            <i className="fa-solid fa-envelope"></i>
                        </span>
                        <span className="icon-label">
                            <span>Email</span><br />
                            <strong>{formData.email}</strong>
                        </span>
                    </div>
                    {formData.phone && (
                        <div className="banner-icon">
                            <span className="icon-circle">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                            <span className="icon-label">
                                <span>Phone</span><br />
                                <strong>{formData.phone}</strong>
                            </span>
                        </div>
                    )}
                    {formData.location && (
                        <div className="banner-icon">
                            <span className="icon-circle">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                            <span className="icon-label">
                                <span>Location</span><br />
                                <strong>{formData.location}</strong>
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <section className="portfolio-section">
                <h2><span style={{ borderBottom: "4px solid #ffd000" }}>About </span>                        <span style={{ color: "#222", borderBottom: "4px solid #ffd000" }} >Me</span></h2>
                <p>{formData.about || "No about info provided."}</p>
            </section>
            <section className="portfolio-section">
                <h2>                        <span style={{ color: "#222", borderBottom: "4px solid #ffd000" }} >My</span> <span style={{ borderBottom: "4px solid #ffd000" }}>Skills</span></h2>
                {Object.keys(skillsObj).length === 0 && <p>No skills listed.</p>}
                {Object.entries(skillsObj).map(([category, skills]) => (
                    <div key={category} className="skills-category-block">
                        <span className="icon-circle">
                            <i class="fa-solid fa-book-open-reader"></i>
                        </span>
                        <h3 className="skills-category-title">{category}</h3>
                        <div className="skills-grid">
                            {Object.entries(skills).map(([skill, value]) => (
                                <div className="skill-card" key={skill}>
                                    <div className="skill-title">{skill}</div>
                                    <div className="skill-bar-bg">
                                        <div
                                            className="skill-bar-fill"
                                            style={{
                                                width: `${value}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="skill-intensity">
                                        {value}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
            {formData.certifications && formData.certifications.length > 0 && (
                <section className="portfolio-section cert-section">
                    <h2>
                        <span style={{ color: "#fff", background: "#222", padding: "4px 16px", borderRadius: "8px", borderBottom: "4px solid #ffd000" }}>Certifications </span>
                        &nbsp;<span style={{ color: "#fff", background: "#222", padding: "4px 16px", borderRadius: "8px", borderBottom: "4px solid #ffd000" }}>& </span>
                        <span style={{ color: "#ffd000", background: "#222", padding: "4px 16px", borderRadius: "8px", borderBottom: "4px solid #ffd000" }}>Achievements</span>
                    </h2>
                    <div className="cert-grid">
                        {formData.certifications.map((cert, idx) => (
                            <div key={idx} className="cert-card">
                                <span className="icon-circle" style={{ background: "#fff", color: "#f40606ff", alignItems: "center", justifyContent: "center", marginLeft: "37px" }}>
                                    <i class="fa-solid fa-graduation-cap"></i>
                                </span>
                                <span style={{ color: "#fff", fontWeight: 600 }}>{cert.title}</span>
                                <br />
                                <span style={{ color: "#ffd000", fontWeight: 500 }}>{cert.organization}</span>
                            </div>
                        ))}
                    </div>
                </section>

            )}
            {formData.services && formData.services.length > 0 && (
                <section className="portfolio-section services-section">
                    <h2 >
                        <span style={{ color: "#222", borderBottom: "4px solid #ffd000" }} >My</span>
                        &nbsp;
                        <span style={{ color: "#e60000", borderBottom: "4px solid #ffd000" }}>Services</span>
                    </h2>
                    <div className="services-grid">
                        {formData.services.map((service, idx) => (
                            <div key={idx} className="service-card">
                                {/* Title in blank */}
                                <span className="icon-circle" style={{ background: "#0e0e0eff", color: "#e7d516ff", alignItems: "center", justifyContent: "center", marginLeft: "87px" }}>
                                    <i class="fa-solid fa-graduation-cap"></i>
                                </span>
                                <span style={{ color: "#222", fontWeight: 600 }}>{service.title}</span>
                                <ul style={{ margin: "12px 0 0 0", paddingLeft: "18px", textAlign: "left" }}>
                                    {service.description.split(",").map((desc, i) => (
                                        <li key={i} style={{ color: "#e60000", fontWeight: 500 }}>{desc.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>

    );
}