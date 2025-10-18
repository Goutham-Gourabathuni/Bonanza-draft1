from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("model/keras_model.h5", compile=False)

with open("model/labels.txt", "r") as f:
    CLASS_NAMES = [line.strip() for line in f.readlines()]


#CLASS_NAMES = ['boron', 'calcium', 'healthy', 'iron', 'potassium']

@app.get("/ping")
async def ping():
    return "Hello I'm alive"

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0 # Teachable Machine default size
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess image
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)  # shape: (1, 224, 224, 3)       # normalize to [0,1]

    # Predict
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return {
        "class": predicted_class,
        "confidence": float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)







#def read_file_as_image(data) -> np.ndarray:
#    image = np.array(Image.open(BytesIO(data)))
#    return image

#@app.post("/predict")
#async def predict(
#    file: UploadFile = File(...)
#):
#    image = read_file_as_image ( await file.read())
#    img_batch = np.expand_dims(image, 0)
#    prediction = MODEL.predict(img_batch)
    
#   pass


#if __name__ == "__main__":
#    uvicorn.run(app, host="localhost", port=8000)