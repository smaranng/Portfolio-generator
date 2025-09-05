import React, { useEffect, useState } from "react";
import { getProfessionals, addProfessional, getTemplates } from "./api";
import "./styles/App.css";
import TemplateSelection from "./components/TemplateSelection";
import PortfolioForm from "./components/PortfolioForm";
import ProfileCard from "./components/ProfileCard";
import PortfolioPage from "./components/PortfolioPage";
import Header from "./components/Header";
export default function App() {
  const [professionals, setProfessionals] = useState([]);
  const [form, setForm] = useState({ name: "", profession: "", location: "", company: "", email: "", phone: "", about: "", skills: "", experience: "" });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const skillCategories = {
    "Front End Development": ["HTML", "CSS", "JavaScript", "React"],
    "Backend Development": ["SQL", "Nodejs", "NoSQL"],
    "AI & ML": ["Python", "TensorFlow", "PyTorch"]
  };
  function handleCategoryChange(category) {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }
  function handleSkillValueChange(skill, value) {
    setSelectedSkills(prev => ({
      ...prev,
      [skill]: value
    }));
  }
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({}); // { skill: value }
  const [certifications, setCertifications] = useState([]);
  const [showCertInput, setShowCertInput] = useState(false);
  const [certInput, setCertInput] = useState({ title: "", organization: "" });

  function handleAddCert() {
    if (certInput.title && certInput.organization) {
      setCertifications([...certifications, certInput]);
      setCertInput({ title: "", organization: "" });
      setShowCertInput(false);
    }
  }
  const [services, setServices] = useState([]);
  const [showServiceInput, setShowServiceInput] = useState(false);
  const [serviceInput, setServiceInput] = useState({ title: "", description: "" });

  function handleAddService() {
    if (serviceInput.title && serviceInput.description) {
      setServices([...services, serviceInput]);
      setServiceInput({ title: "", description: "" });
      setShowServiceInput(false);
    }
  }
  // ✅ Hardcoded templates with images
  const templates = [
    {
      id: 1,
      title: "Template 1",
      description: "Modern and clean design with yellow hero section and professional layout",
      features: ["Yellow Hero Section", "Testimonials Carousel", "Grid Portfolio", "Contact Form"],
      image: "https://img.freepik.com/premium-photo/close-up-hand-woman-engineer-writing-note-her-notebook-contruction-site_48658-34.jpg",
    },
    {
      id: 2,
      title: "Template 2",
      description: "Split-screen layout with timeline skills and masonry portfolio grid",
      features: ["Split Hero Layout", "Masonry Portfolio", "Timeline Skills", "Blog Section"],
      image: "https://images.stockcake.com/public/f/2/e/f2ed6e9d-38ef-4866-962f-5ea9af7d10fc_large/typing-on-laptop-stockcake.jpg",
    },
  ];

  // Load data
  useEffect(() => {
    getProfessionals().then((res) => setProfessionals(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({
      ...form,
      skills: selectedCategories.reduce((acc, category) => {
        acc[category] = {};
        skillCategories[category].forEach(skill => {
          if (selectedSkills[skill] !== undefined) {
            acc[category][skill] = selectedSkills[skill];
          }
        });
        return acc;
      }, {})
    });
    await addProfessional(form);
    const updated = await getProfessionals();
    setProfessionals(updated.data);
    setForm({ name: "", profession: "", location: "" });
  };
  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1> Portfolio Generator</h1>
        <p>Create and manage your professional portfolio</p>
      </header>

      <main>
        {/* Template Selection */}
        {/* ✅ Template Selection with hardcoded templates */}
        <TemplateSelection templates={templates} onSelect={setSelectedTemplate} />

        {selectedTemplate && (
          <PortfolioPage template={selectedTemplate} formData={form} />
        )}
        {/* Add New Professional */}
        <form onSubmit={handleSubmit} className="add-professional-form">
          <div className="section-nav">
            <button type="button" className="section-btn active">Basic Details</button>
            <button type="button" className="section-btn">Header&amp;Hero</button>
            <button type="button" className="section-btn">About Section</button>
            <button type="button" className="section-btn">Services</button>
            <button type="button" className="section-btn">Products</button>
            <button type="button" className="section-btn">Clients&amp;Testimonials</button>
            <button type="button" className="section-btn">Contact</button>
            <button type="button" className="section-btn">Footer</button>
          </div>
          <h2>Basic Details</h2>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="profession"
            placeholder="Profession"
            value={form.profession}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <textarea cols="30" rows="4"
            name="about"
            placeholder="About"
            value={form.about}
            onChange={handleChange}
          />
          <div>
            <h4>Choose Skills:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
              {Object.keys(skillCategories).map(category => (
                <div key={category}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span style={{ fontWeight: 500 }}>{category}</span>
                  </label>
                  {selectedCategories.includes(category) && (
                    <div style={{ marginTop: 8, marginLeft: 24 }}>
                      {skillCategories[category].map(skill => (
                        <div key={skill} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: 6 }}>
                          <span>{skill}</span>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={selectedSkills[skill] || 0}
                            onChange={e => handleSkillValueChange(skill, Number(e.target.value))}
                            style={{ width: 100 }}
                          />
                          <span>{selectedSkills[skill] || 0}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <input
            name="experience"
            placeholder="Experience (e.g., 5 years)"
            value={form.experience}
            onChange={handleChange}
          />
          <div>
            <h4>Certifications & Achievements</h4>
            <button
              type="button"
              style={{
                background: "#222",
                color: "#fff",
                borderRadius: "8px",
                padding: "6px 18px",
                marginBottom: "12px",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setShowCertInput(true)}
            >
              Add Certification
              <br /></button>
            {showCertInput && (
              <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Title"
                  value={certInput.title}
                  onChange={e => setCertInput({ ...certInput, title: e.target.value })}
                  style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="Organization"
                  value={certInput.organization}
                  onChange={e => setCertInput({ ...certInput, organization: e.target.value })}
                  style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button
                  type="button"
                  style={{
                    background: "#ffd000",
                    color: "#222",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={handleAddCert}
                >
                  Save
                </button>
              </div>
            )}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-card-preview">
                  <span style={{ color: "#fff", fontWeight: 600 }}>{cert.title}</span>
                  <br />
                  <span style={{ color: "#ffd000", fontWeight: 500 }}>{cert.organization}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4>My Services</h4>
            <button
              type="button"
              style={{
                background: "#222",
                color: "#fff",
                borderRadius: "8px",
                padding: "6px 18px",
                marginBottom: "12px",
                border: "none",
                cursor: "pointer"
              }}
              onClick={() => setShowServiceInput(true)}
            >
              Add Service
            </button>
            {showServiceInput && (
              <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Service Title"
                  value={serviceInput.title}
                  onChange={e => setServiceInput({ ...serviceInput, title: e.target.value })}
                  style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="Description (comma separated)"
                  value={serviceInput.description}
                  onChange={e => setServiceInput({ ...serviceInput, description: e.target.value })}
                  style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button
                  type="button"
                  style={{
                    background: "#ffd000",
                    color: "#222",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={handleAddService}
                >
                  Save
                </button>
              </div>
            )}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {services.map((service, idx) => (
                <div key={idx} className="service-card-preview">
                  <span style={{ color: "#222", fontWeight: 600 }}>{service.title}</span>
                  <ul style={{ margin: "8px 0 0 0", paddingLeft: "18px" }}>
                    {service.description.split(",").map((desc, i) => (
                      <li key={i} style={{ color: "#e60000", fontWeight: 500 }}>{desc.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* Add more fields as needed */}
          <button type="submit" className="list-btn">
            Save
          </button>
          <button
            type="button"
            className="list-btn"
            style={{ marginLeft: 12, background: "#ffcc00", color: "#222" }}
            onClick={() => setPreviewData({
              ...form,
              skills: selectedCategories.reduce((acc, category) => {
                acc[category] = {};
                skillCategories[category].forEach(skill => {
                  if (selectedSkills[skill] !== undefined) {
                    acc[category][skill] = selectedSkills[skill];
                  }
                });
                return acc;
              }, {}),
              certifications,
              services
            })}
          >
            Preview Portfolio
          </button>
        </form>
        {previewData && (
          <PortfolioPage formData={previewData} />
        )}

        {/* Professionals as Cards */}
        <header className="header">
          <h1>Meet Our Professionals</h1>
          <p>Meet the experts shaping the future of drone tech</p>
          <button className="list-btn">List your Profile</button>
        </header>
        <div className="yellow-bar">
          <div className="yellow-bar-content">
            <div className="yellow-bar-left">
              <input
                type="text"
                className="search-box"
                placeholder="Search professionals..."
              // onChange={handleSearch} // Implement search logic as needed
              />
            </div>
            <div className="yellow-bar-right">
              <select className="filter-dropdown">
                <option>All Professionals</option>
                <option>Designer</option>
                <option>Developer</option>
                <option>Manager</option>
                {/* Add more as needed */}
              </select>
              <select className="filter-dropdown">
                <option>All Locations</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                {/* Add more as needed */}
              </select>
              <select className="filter-dropdown">
                <option>Sort by Name</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <div className="profile-grid">
          {professionals.map((p) => (

            <div key={p.id} className="profile-card">
              <img src={p.image} alt={p.name} className="profile-img" />
              <h3>{p.name}</h3>
              <p className="profession">{p.profession}</p>
              <p><i class="fa-solid fa-location-dot"></i> {p.location}</p>
              <p>
                {Array.from({ length: 5 }).map((_, i) =>
                  i < (p.rating || 0) ? "★" : "☆"
                )}{" "}
                {p.rating}
              </p>
              <p>Experience: {p.experience}</p>
              <p>Projects: {p.projects}</p>
              <h4>Skills:</h4><br />
              <div className="skills-boxes">
                {p.skills?.map((skill, idx) => (
                  <span className="skill-badge" key={idx}>{skill}</span>
                ))}
              </div>
              <button
                className="list-btn"
                onClick={() => setPreviewData(p)}
              >
                View Portfolio
              </button>
              <button className="contact-btn"><i class="fa-regular fa-envelope"></i>&nbsp;&nbsp;Contact</button>
            </div>

          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="header">
        <p>© 2025 Portfolio Generator</p>
      </footer>
    </div>
  );
}
