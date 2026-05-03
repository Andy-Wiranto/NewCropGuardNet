/**
 * Patch model.json from Keras 3 format to TF.js-compatible format.
 *
 * Keras 3 exports several incompatible structures:
 *   1. `batch_shape` instead of `batchInputShape` in InputLayer config
 *   2. `dtype` as DTypePolicy object instead of plain string
 *   3. `inbound_nodes` as {args, kwargs} instead of [[name, idx, tidx, {}]]
 *   4. `input_layers` / `output_layers` as flat [name,idx,tidx] instead of nested
 *   5. DepthwiseConv2D weights named "kernel" instead of "depthwise_kernel"
 *   6. `depthwise_initializer` / `depthwise_regularizer` / `depthwise_constraint`
 *      instead of `depthwiseInitializer` / `depthwiseRegularizer` / `depthwiseConstraint`
 *
 * This script converts the model.json in-place.
 */
/* eslint-disable no-console, no-unused-vars */
const fs = require('fs');
const path = require("path");

const MODEL_PATH = path.join(
  __dirname,
  "..",
  "public",
  "models",
  "tfjs_model_archive",
  "model.json"
);

const raw = fs.readFileSync(MODEL_PATH, "utf8");
const model = JSON.parse(raw);

let patchCount = 0;

// ---------- helpers ----------

function walk(obj, visitor) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => walk(item, visitor));
  } else if (obj !== null && typeof obj === "object") {
    visitor(obj);
    Object.values(obj).forEach((v) => walk(v, visitor));
  }
}

function convertKT(kt) {
  if (kt && kt.class_name === "__keras_tensor__" && kt.config && kt.config.keras_history) {
    return kt.config.keras_history;
  }
  return null;
}

// ---------- patch 1: InputLayer batch_shape → batchInputShape ----------
walk(model, (obj) => {
  if (obj.class_name === "InputLayer" && obj.config) {
    if (obj.config.batch_shape && !obj.config.batchInputShape) {
      obj.config.batchInputShape = obj.config.batch_shape;
      delete obj.config.batch_shape;
      patchCount++;
      console.log(`  ✓ P1: InputLayer "${obj.config.name}" batch_shape → batchInputShape`);
    }
  }
});

// ---------- patch 2: dtype DTypePolicy object → string ----------
walk(model, (obj) => {
  if (obj.dtype && typeof obj.dtype === "object" && obj.dtype.class_name === "DTypePolicy") {
    obj.dtype = obj.dtype.config.name;
    patchCount++;
  }
});

// ---------- patch 3: inbound_nodes {args, kwargs} → [[name, idx, tidx, {}]] ----------
walk(model, (obj) => {
  if (!Array.isArray(obj.inbound_nodes)) return;

  const newNodes = [];
  let changed = false;

  for (const node of obj.inbound_nodes) {
    if (Array.isArray(node)) {
      newNodes.push(node);
      continue;
    }

    if (node && node.args) {
      changed = true;
      const converted = [];

      for (const arg of node.args) {
        if (Array.isArray(arg)) {
          const innerConverted = [];
          for (const inner of arg) {
            const triple = convertKT(inner);
            if (triple) innerConverted.push([...triple, {}]);
          }
          converted.push(innerConverted);
        } else {
          const triple = convertKT(arg);
          if (triple) converted.push([...triple, {}]);
        }
      }

      if (converted.length === 1 && Array.isArray(converted[0]) && Array.isArray(converted[0][0])) {
        newNodes.push(converted[0]);
      } else {
        newNodes.push(converted);
      }
    }
  }

  if (changed) {
    obj.inbound_nodes = newNodes;
    patchCount++;
  }
});

// ---------- patch 4: Functional input_layers / output_layers → nested ----------
walk(model, (obj) => {
  if (obj.class_name === "Functional" && obj.config) {
    for (const key of ["input_layers", "output_layers"]) {
      const val = obj.config[key];
      if (Array.isArray(val) && val.length > 0 && !Array.isArray(val[0])) {
        obj.config[key] = [val];
        patchCount++;
        console.log(`  ✓ P4: ${key} in "${obj.config.name}" wrapped`);
      }
    }
  }
});

// ---------- patch 5: DepthwiseConv2D weight names: kernel → depthwise_kernel ----------
if (model.weightsManifest) {
  for (const group of model.weightsManifest) {
    for (const w of group.weights) {
      // Match "xxx_depthwise/kernel" but NOT "xxx_depthwise_BN/xxx"
      if (w.name.match(/depthwise\/kernel$/) && !w.name.includes("_BN")) {
        const oldName = w.name;
        w.name = w.name.replace(/\/kernel$/, "/depthwise_kernel");
        patchCount++;
        console.log(`  ✓ P5: weight "${oldName}" → "${w.name}"`);
      }
    }
  }
}

// ---------- patch 6: Remove Rescaling layer (replace with passthrough) ----------
// TF.js doesn't have a Rescaling layer — since our preprocessImage already
// normalises to [0,1], the Rescaling (scale=1/255) would double-normalise.
// We remove it from the Sequential config.
const seqConfig = model.modelTopology.model_config.config;
if (seqConfig && Array.isArray(seqConfig.layers)) {
  const beforeLen = seqConfig.layers.length;
  seqConfig.layers = seqConfig.layers.filter((l) => {
    if (l.class_name === "Rescaling") {
      patchCount++;
      console.log(`  ✓ P6: Removed Rescaling layer "${l.config.name}"`);
      return false;
    }
    return true;
  });
}

// ---------- write ----------
fs.writeFileSync(MODEL_PATH, JSON.stringify(model));
console.log(`\nDone — applied ${patchCount} patches to ${MODEL_PATH}`);
