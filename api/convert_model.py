import tensorflow as tf

# Load the Teachable Machine .h5 model
model = tf.keras.models.load_model("model/keras_model.h5", compile=False)

# Save in TensorFlow Serving format
tf.saved_model.save(model, "model_export/1")
