/* eslint-disable no-console */
import * as tf from "@tensorflow/tfjs";

/* ------------------------------------------------------------------ */
/*  Class labels — MUST match the training order exactly               */
/* ------------------------------------------------------------------ */
const CLASS_LABELS = [
  "Potato___Early_blight",
  "Potato___Late_blight",
  "Potato___healthy",
  "Tomato___Bacterial_spot",
  "Tomato___Early_blight",
  "Tomato___Late_blight",
  "Tomato___Leaf_Mold",
  "Tomato___Septoria_leaf_spot",
  "Tomato___Spider_mites Two-spotted_spider_mite",
  "Tomato___Target_Spot",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
  "Tomato___Tomato_mosaic_virus",
  "Tomato___healthy",
];

/**
 * Formats a raw label from the model output into a clean, readable disease name.
 * Example: "Potato___Early_blight" -> "Early Blight"
 * Example: "Tomato___healthy" -> "Healthy"
 *
 * @param {string} rawLabel - The raw classification label from the model.
 * @returns {string} The formatted, human-readable label.
 */
export function formatLabel(rawLabel) {
  // Strip the "Potato___" or "Tomato___" prefix
  const withoutPrefix = rawLabel.replace(/^(Potato|Tomato)___/, "");

  // Replace underscores with spaces and title-case each word
  return withoutPrefix
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Loads the TensorFlow.js layers model from the public directory.
 * Implements the Singleton pattern to ensure the model is only loaded once and cached.
 *
 * @returns {Promise<tf.LayersModel>} The loaded TensorFlow.js model.
 * @throws {Error} If the model fails to load.
 */
let cachedModel = null;

export async function loadModel() {
  if (cachedModel) return cachedModel;

  try {
    cachedModel = await tf.loadLayersModel("/models/tfjs_model_archive/model.json");
    console.log("TF.js model loaded successfully");
    return cachedModel;
  } catch (err) {
    console.error("Model load failed:", err);
    throw new Error(
      "Failed to load AI model. Check that /public/models/tfjs_model_archive/ contains model.json and weight shards."
    );
  }
}

/**
 * Preprocesses an HTMLImageElement to match the input shape expected by the model.
 * Uses tf.tidy() to automatically clean up intermediate tensors and prevent memory leaks.
 * 
 * Steps performed:
 * 1. Reads pixel data from the image element.
 * 2. Resizes the image to 224x224 pixels using bilinear interpolation.
 * 3. Normalizes pixel values to the range [0, 1] by dividing by 255.
 * 4. Adds a batch dimension to create a tensor of shape [1, 224, 224, 3].
 *
 * @param {HTMLImageElement} imgElement - The image element containing the plant photo.
 * @returns {tf.Tensor} A 4D tensor ready for model inference.
 */
export function preprocessImage(imgElement) {
  return tf.tidy(() => {
    // Read pixel data from the <img> element
    const tensor = tf.browser.fromPixels(imgElement);

    // Resize to 224 × 224 (bilinear interpolation)
    const resized = tf.image.resizeBilinear(tensor, [224, 224]);

    // Normalise to [0, 1] — matches training (1./255)
    const normalised = resized.div(255.0);

    // Add batch dimension → [1, 224, 224, 3]
    return normalised.expandDims(0);
  });
}

/**
 * Runs inference on the provided image element to predict plant disease.
 * Loads the model (if not already cached), preprocesses the image, and computes probabilities.
 *
 * @param {HTMLImageElement} imgElement - The image to be analyzed.
 * @returns {Promise<Object>} An object containing the formatted label, confidence score, and raw label.
 * @property {string} label - The human-readable disease name (e.g., "Early Blight").
 * @property {number} confidence - The model's confidence score between 0 and 1.
 * @property {string} rawLabel - The original class string outputted by the model.
 */
export async function predict(imgElement) {
  const model = await loadModel();

  // Preprocess
  const inputTensor = preprocessImage(imgElement);

  // Run inference
  const predictions = model.predict(inputTensor);

  // Extract results
  const probabilities = await predictions.data();
  const maxIndex = probabilities.indexOf(Math.max(...probabilities));

  const rawLabel = CLASS_LABELS[maxIndex];
  const confidence = probabilities[maxIndex];

  // Clean up tensors
  inputTensor.dispose();
  predictions.dispose();

  return {
    label: formatLabel(rawLabel),
    confidence,
    rawLabel,
  };
}
