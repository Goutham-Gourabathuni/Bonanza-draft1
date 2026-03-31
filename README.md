# 🍌 Bonanza – Banana Leaf Nutrient Deficiency Detector

A **Computer Vision powered web application** that detects **nutrient deficiencies in banana leaves** from uploaded images.

This project uses **deep learning and image classification** to analyze banana leaf images and identify nutrient deficiencies such as **Boron, Calcium, Iron, Potassium**, or determine if the leaf is **Healthy**.

The goal of this project is to assist **farmers, agricultural researchers, and agritech developers** in quickly identifying plant nutrient issues using **AI-based visual analysis**, enabling faster and more accurate agricultural decision-making.

---

# 🌱 Project Overview

Banana plants often show **visible symptoms on leaves when nutrients are deficient**. Traditionally, identifying these deficiencies requires **expert knowledge or laboratory testing**.

This project provides a **simple AI-powered interface** where users can:

1. Upload an image of a banana leaf
2. The AI model analyzes the image
3. The system predicts the **nutrient deficiency type**
4. The result is displayed with a **confidence score**

The project acts as a **prototype for the larger BONANZA agritech platform**, which aims to become a **complete intelligent crop monitoring system** in the future.

---

# 🚀 Features

- Upload banana leaf images through a **drag-and-drop interface**
- Detect nutrient deficiencies using **deep learning**
- Display prediction results with **confidence score**
- Simple and interactive **web interface**
- Fast prediction using **TensorFlow Lite model**
- Prototype system for future **AI-driven agriculture platforms**

---

# 🧠 Deficiency Classes Detected

The model currently detects the following classes:

- Healthy Leaf
- Boron Deficiency
- Calcium Deficiency
- Iron Deficiency
- Potassium Deficiency

---

# 🏗️ Project Architecture

```

User Upload Image
│
▼
Frontend (React Web App)
│
▼
Backend API (Python)
│
▼
TensorFlow Lite Model
│
▼
Prediction Result

```

---

# 🛠️ Technologies Used

## Frontend
- React.js
- JavaScript
- HTML5
- CSS3

## Backend / API
- Python
- Flask / FastAPI style API structure

## Machine Learning
- TensorFlow
- TensorFlow Lite
- Computer Vision (Image Classification)

## Deployment / Tools
- Node.js
- npm
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```

BananaWebsite
│
├── api
│ ├── model
│ ├── model_export
│ ├── index.py
│ ├── model.tflite
│ └── requirements.txt
│
├── frontend
│ ├── build
│ ├── public
│ ├── src
│ │ ├── App.js
│ │ ├── home.js
│ │ ├── index.js
│ │ └── styles & images
│ └── package.json
│
├── images
│ └── prototype screenshots
│
├── saved_models
│
├── README.md
├── vercel.json
└── package.json

```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Goutham-Gourabathuni/Bonanza-draft1.git
cd BananaWebsite
```

2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```
3️⃣ Install Backend Dependencies

```bash
cd ../api
pip install -r requirements.txt
```

4️⃣ Run the Project
```bash
Start the frontend server:

npm run dev

or

npm start
```

The web application will open in your browser.

---

## Images of the prototype

Here are the images of the prototype Bonanza draft 1:-

Prototype:

![Image of the prototype](images/Screenshot%202025-09-15%20164818.png)

Healthy image selection:

![Healthy image selection](images/Screenshot%202025-09-15%20165102.png)

Healthy image prediction:

![Healthy image prediction](images/Screenshot%202025-09-15%20165444.png)

Boron deficiency leaf selection

![Boron deficiency leaf selection](images/Screenshot%202025-09-15%20165527.png)

Boron deficiency leaf prediction

![Boron deficiency leaf prediction](images/Screenshot%202025-09-15%20165538.png)

Calcium deficiency leaf selection

![Calcium deficiency leaf selection](images/Screenshot%202025-09-15%20171658.png)

Calcium deficiency leaf prediction

![Calcium deficiency leaf prediction](images/Screenshot%202025-09-15%20171715.png)

Iron deficiency leaf selection

![Iron deficiency leaf selection](images/Screenshot%202025-09-15%20171833.png)

Iron deficiency leaf prediction

![Iron deficiency leaf prediction](images/Screenshot%202025-09-15%20171848.png)

Potassium deficiency leaf selection

![Potassium deficiency leaf selection](images/Screenshot%202025-09-15%20171916.png)

Potassium deficiency leaf prediction

![Potassium deficiency leaf prediction](images/Screenshot%202025-09-15%20171931.png)

---

🔮 Future Scope

Planned improvements for the BONANZA platform:

Improve model accuracy with larger dataset
Deploy the system as a cloud-based AI service
Mobile application using React Native
Provide fertilizer recommendations
Real-time camera based detection
Multi-crop deficiency detection
Farmer friendly UI with multilingual support