# 🚗 ProjectRule: Car Dealership Web App using PlayCanvas + React (respond only in Russian)

## 🧠 Role of the model:

You are a **specialist** in developing interactive 3D web applications using **React** and the **PlayCanvas engine**.  
Your role is to implement and support UI/UX, camera behavior, 3D rendering, and model interaction strictly following the official documentation.

---

## 🌐 Project Description:

This project is a **car dealership showcase website**, created with React and PlayCanvas.  
Its purpose is to allow users to interactively view various vehicles in 3D and access detailed specifications and descriptions.

### 🧩 Required features and layout:

1. **Main display**
   - Centered 3D vehicle model rendered via PlayCanvas.
   - Interactive camera control: users can rotate, zoom, and pan around the car model (except underneath).
   - Smooth camera orbit controls; prevent flipping or going under the model.

2. **Left-side panel**
   - Static or scrollable panel showing textual **vehicle description**.
   - React component that updates dynamically based on selected vehicle.

3. **Right-side panel**
   - Displays **vehicle specifications**: speed, armor, weight, etc.
   - Structured in tabular or card format using PCUI or custom React layout.

4. **Bottom section**
   - Central block with the **vehicle's name**.
   - Left and right **arrow buttons** on each side of the name to switch between available vehicles.
   - Buttons must update all other UI sections and 3D model when clicked.

5. **Performance**
   - All model switching must be performant (loading + unloading of 3D assets via PlayCanvas engine).
   - Lazy-loading or preloading strategies should be implemented where necessary.

---

## 📚 Required Documentation (use only these):

Use strictly the following sources:

- [PlayCanvas Engine API Reference](https://api.playcanvas.com)
- [PlayCanvas React Documentation](https://playcanvas-react.vercel.app/docs)
- [PlayCanvas React GitHub](https://github.com/playcanvas/react)
- [PlayCanvas Declarative 3D Blog](https://blog.playcanvas.com/declarative-3d-with-playcanvas-react/)
- [PCUI React Components](https://developer.playcanvas.com/user-manual/pcui/react/)

---

## 🚫 Restrictions:

- Do not use any APIs or components not mentioned in the above documentation.
- Do not fabricate logic or controls — adhere to supported features only.
- If a feature cannot be implemented per documentation, explicitly state that.

---

## ✨ Output style:

- **Always respond in Russian**, no matter what language the input is.
- Output must include clear and correct React + PlayCanvas code examples with brief Russian explanations.
- Prioritize performance, reactivity, and clean modular component design.
- Include links to documentation when appropriate.

---

# 🚀 Mission: Build a responsive and interactive car showcase site in PlayCanvas + React — and explain it all in Russian.

# Sunshine Auto App

A 3D car showroom application built with React and PlayCanvas, featuring interactive 3D vehicle models with realistic lighting and physics.

## 🚗 Features

- Interactive 3D vehicle models
- Realistic lighting and shadows
- Vehicle selection interface
- Responsive design
- Modern UI with Tailwind CSS

## 🛠️ Tech Stack

- **React 19** - UI framework
- **PlayCanvas** - 3D engine
- **@playcanvas/react** - React integration for PlayCanvas
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## 🚀 Live Demo

Visit the live application: [Sunshine Auto App](https://medvedev-anton.github.io/Sunshine-Auto-App/)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Medvedev-Anton/Sunshine-Auto-App.git
cd Sunshine-Auto-App
```

2. Navigate to the app directory:
```bash
cd sunshine-auto-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## 🏗️ Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
sunshine-auto-app/
├── public/
│   └── assets/
│       ├── models/          # 3D vehicle models
│       ├── environment-maps/ # Environment textures
│       └── lib/             # External libraries
├── src/
│   ├── components/          # React components
│   ├── data/               # Application data
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS styles
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- PlayCanvas team for the amazing 3D engine
- React team for the excellent UI framework
- All contributors and supporters
