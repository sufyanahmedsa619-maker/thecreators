<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The Creatorz Portfolio

A vibrant, animated, and interactive portfolio website for **The Creatorz**, a collective of digital talent including artists, developers, editors, and more.

---

## ✨ Tech Stack

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)

### Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Add your images:**
    -   **Gallery Images:** Place them in `public/images` (e.g., `public/images/artists/1.jpg`).
    -   **Profile Pictures:** Place them in `public/images/profiles`.
    -   **Website Icon:** Place your `icon.jpg` directly in the `public` folder (path: `public/icon.jpg`).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Your site should now be running on `http://localhost:3000`.

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel should automatically detect the **Vite** framework.
4.  Ensure the settings are:
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `dist`
    -   **Install Command:** `npm install`
5.  Click **Deploy**.

---

## 🎨 Managing Content

-   **To add or remove a member:** Modify the `membersData` array in `src/constants.ts`.
-   **To add or remove images:** Simply add or remove image files from the appropriate subfolder inside `public/images` and update the list in `src/constants.ts`.
