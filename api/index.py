from fastapi import FastAPI, File, UploadFile
import numpy as np
from io import BytesIO
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
try:
    import tflite_runtime.interpreter as tflite
except ImportError:
    import tensorflow.lite as tflite
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.tflite")
LABELS_PATH = os.path.join(BASE_DIR, "model", "labels.txt")

interpreter = tflite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

with open(LABELS_PATH, "r") as f:
    CLASS_NAMES = [line.strip() for line in f.readlines()]

@app.get("/api/ping")
async def ping():
    return "Hello I'm alive"

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image, dtype=np.float32) / 255.0 # normalize
    return img_array

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    interpreter.set_tensor(input_details[0]['index'], img_batch)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return {
        "class": predicted_class,
        "confidence": float(confidence)
    }
