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
    -   Place your image files into the `public/images` directory.
    -   Organize them into subfolders for each category (e.g., `artists`, `developers`, `profiles`).
    -   See `public/images/README.md` for more details on the automatic image loading.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Your site should now be running on `http://localhost:3000`.

---

## 🎨 Managing Content

-   **To add or remove a member:** Modify the `membersData` array in `src/constants.ts`.
-   **To add or remove images:** Simply add or remove image files from the appropriate subfolder inside `public/images`. The galleries will update automatically. No code changes needed!
