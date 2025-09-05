import React from "react";

export default function TemplateSelection({ templates, onSelect }) {
    return (
        <div className="template-selection">
            <h2>
                Choose Your <span className="highlight">Template</span>
            </h2>
            <p>Select a professional template that best represents your style</p>

            <div className="template-grid">
                {templates.map((t) => (
                    <div className="template-card" key={t.id}>
                        <img src={t.image} alt={t.title} className="template-img" />
                        <h3>{t.title}</h3>
                        <p>{t.description}</p>

                        <ul className="template-features">
                            {t.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                        <br />
                        <div className="template-actions">
                            <button className="customize-btn" onClick={() => onSelect(t)}>
                                Customize This Template →
                            </button>
                            <button className="preview-btn">
                                <i className="fa-solid fa-eye"></i>&nbsp;Preview
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
