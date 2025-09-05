import React from "react";

export default function PortfolioForm() {
    return (
        <div className="form-container">
            <h2>Basic Company Details</h2>
            <form>
                <input type="text" placeholder="Your company name (used in URL)" />
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone Number" />
            </form>
        </div>
    );
}
