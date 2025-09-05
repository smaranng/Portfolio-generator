# 🏦 Portfolio Generator

A modern and interactive React-based web application that allows users to create, customize, and showcase professional portfolios with ease.
Users can enter details such as skills, certifications, achievements, and services, then preview and share a beautifully designed portfolio page.

---

## 🚀 Features

- **Template Selection:** Choose from multiple professional portfolio templates.
- **Dynamic Form:** Add company details, contact info, skills (with proficiency sliders), certifications, achievements, and services.
- **Skill Categories:** Select skill categories (Front End, Backend, AI & ML) and set proficiency for each skill.
- **Certifications & Achievements:** Add multiple certifications with organization info, displayed in stylish cards.
- **Services:** Add and preview your services, each with a title and bullet-point descriptions.
- **Live Preview:** Instantly preview your portfolio as you build it.
- **Professionals Directory:** Browse and filter listed professionals.
- **Responsive Design:** Works great on desktop and mobile.

---

## 🛠️ Methodology

1. **Component-Based Architecture:**  
   The app is split into reusable React components (`App`, `PortfolioPage`, `ProfileCard`, `TemplateSelection`, etc.) for maintainability and scalability.

2. **State Management:**  
   Uses React hooks (`useState`, `useEffect`) to manage form data, selected skills, certifications, services, and preview state.

3. **Dynamic Data Structure:**  
   - **Skills:** Stored as an object grouped by category, with each skill's proficiency set by the user.
   - **Certifications/Services:** Stored as arrays, allowing multiple entries.

4. **Live Preview:**  
   The form data is passed to the `PortfolioPage` component for instant preview, reflecting all changes in real time.

5. **Styling:**  
   - Uses modern CSS for layout, colors, and effects.
   - Section titles have yellow underlines.
   - Skills, certifications, and services are displayed in visually distinct containers.

6. **API Integration:**  
   - Uses Axios for fetching and saving professionals and templates.
   - Data is stored in a local `db.json` via `json-server` for development.

---

## 📁 Project Structure

```
portfolio-generator/
│
├── public/
│   └── index.html
├── src/
│   ├── api.js                # Axios API calls
│   ├── App.jsx               # Main app logic and state
│   ├── styles/
│   │   └── App.css           # Global and component styles
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── TemplateSelection.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── PortfolioForm.jsx
│   │   └── PortfolioPage.css # Portfolio page styles
│   └── screenshots
├── db.json                   # Local database for professionals/templates
├── package.json
└── README.md
```

---

## 🖼️ Screenshots


```
![Template Selection](screenshots/template-selection.png)
![Portfolio Preview](screenshots/portfolio-preview.png)
![Professionals Directory](screenshots/professionals-directory.png)
```

---

## 📝 How to Run Locally

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start the dev server:**
   ```
   npm run dev
   ```

3. **Start the mock API server:**
   ```
   npm run server
   ```

4. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

---

## 💡 Customization

- **Add more skill categories or templates** in `App.jsx`.
- **Style further** in `App.css` and `PortfolioPage.css`.
- **Connect to a real backend** by updating `api.js`.

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
Feel free to fork, improve, and share.

---

**Enjoy building your professional
