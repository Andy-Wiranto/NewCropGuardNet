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

/* ------------------------------------------------------------------ */
/*  Format a raw label into a clean, readable disease name             */
/*  "Potato___Early_blight"  →  "Early Blight"                        */
/*  "Tomato___healthy"       →  "Healthy"                              */
/* ------------------------------------------------------------------ */
export function formatLabel(rawLabel) {
  // Strip the "Potato___" or "Tomato___" prefix
  const withoutPrefix = rawLabel.replace(/^(Potato|Tomato)___/, "");

  // Replace underscores with spaces and title-case each word
  return withoutPrefix
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* ------------------------------------------------------------------ */
/*  Model singleton — loaded once, reused for every prediction         */
/* ------------------------------------------------------------------ */
let cachedModel = null;

export async function loadModel() {
  if (cachedModel) return cachedModel;

  cachedModel = await tf.loadLayersModel("/models/tfjs_model/model.json");
  console.log("TF.js model loaded successfully");
  return cachedModel;
}

/* ------------------------------------------------------------------ */
/*  Preprocess an <img> element to match training pipeline             */
/*  1. Resize to 224 × 224                                            */
/*  2. Normalise pixels to [0, 1]  (÷ 255)                            */
/*  3. Return tensor shaped [1, 224, 224, 3]                           */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Run prediction on an <img> element                                 */
/*  Returns { label, confidence } where:                               */
/*    label      = formatted disease name  (e.g. "Early Blight")       */
/*    confidence = float 0–1               (e.g. 0.9247)               */
/* ------------------------------------------------------------------ */
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
