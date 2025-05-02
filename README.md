# SurveyCraft

SurveyCraft is a dynamic survey and feedback form builder that enables users to create, customize, and share surveys with ease. It features a real-time preview builder, form templates, public shareable links, analytics, role-based permissions, and exportable results in multiple formats.

## 🚀 Features

- 🛠️ Easy form builder with real-time preview
- 🧩 Multiple question types (text, checkbox, radio, dropdown, etc.)
- 🎨 Customizable themes and styling
- 🌐 Publicly shareable form URLs
- 📊 Real-time analytics and response tracking
- 🧾 Export responses to Excel, CSV, and PDF
- 📁 Form templates system for easy reusability
- 🔒 Authentication with user roles and permissions
- 🧠 Built-in validation and error handling
- 🔄 Global loading states and toast notifications
- 📦 RESTful APIs for managing forms and responses

## 📷 Screenshots
![SurveyCraft](https://media-hosting.imagekit.io/5b5ace14b50c4cfc/surveycraft.png?Expires=1840766445&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=myxTT4iG82htT4egNQK~GtC567JPlgLYg8EJhkD9w0ysZr2Fu9EYDdWW6rCWhgrm6Y30PHZBHj0iM1jjMjfMJIeSVehwwLUdPocmICtVvaB190U5MFnYkZkm~1TNfsPNwjjpwRMXuRVDkvCl~Jtp4hrfVs5GCEK6GhGhBDBbBAhibjOPLydWvZK2SQd-ic0VDUE24Jmb9cO7imYlGRuKcc14bXs6OicMHx7xw6cs3nJjYP~~H0HAO83DRcipoYDjwPeirFjnv9leA20OC~K56~ImlZHPcaV6VXu~dlSRzUD1ixL3StlvrZCGP9lkg3ves~YWQuJxmAhLIaloMJcv1w__)

## 🧰 Tech Stack

- **Frontend:** React.js + TypeScript, Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** MySQL
- **Authentication:** JWT-based Auth
- **Export Tools:** json2csv, pdfkit or similar libraries
- **Others:** Axios, Toast notifications

## 📂 Project Structure (Brief)

```
/frontend
  └── src
      └── components, pages, hooks, utils, types

/backend
  └── src
      └── controllers, routes, models, middlewares, services

/config
  └── db.js, authService.ts, etc.
```

## 🛠️ Setup Instructions

### Backend (Node.js)

1. Navigate to the backend folder and install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with your MySQL and JWT credentials.
3. Run migrations and seed sample data if applicable.
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend (React + TypeScript)

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` with your Backend BaseUrl.

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📤 Deployment

- Deploy backend using **Render**, **VPS**, or **Docker**
- Deploy frontend using **Vercel**, **Netlify**, or **Firebase Hosting**

## 🙌 Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📜 License

This project is licensed under the MIT License.

---

### ✨ Crafted with care by [Your Name]