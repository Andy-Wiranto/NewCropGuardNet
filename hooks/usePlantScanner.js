/* eslint-disable no-console */
import { useState, useEffect, useRef, useCallback } from "react";
import { loadModel, predict } from "@/services/mlService";
import { useAuth } from "@/contexts/AuthContext";
import { historyService } from "@/services/historyService";

/**
 * Custom hook to manage the state and logic for the plant scanning feature.
 * Encapsulates model loading, drag-and-drop, pasting, camera capture, and prediction inference.
 *
 * @returns {Object} State and handler functions for the scanner UI.
 */
export default function usePlantScanner() {
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Camera states
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState("environment");
    const [stream, setStream] = useState(null);
    const [cameraError, setCameraError] = useState(null);

    // Auth context to check if user is logged in
    const { user } = useAuth();

    // Model & scanning states
    const [modelReady, setModelReady] = useState(false);
    const [modelError, setModelError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Load model on page open (eager loading)
    useEffect(() => {
        loadModel()
            .then(() => {
                setModelReady(true);
                console.log("Model is ready for inference");
            })
            .catch((err) => {
                console.error("Failed to load model:", err);
                setModelError("Failed to load AI model. Please refresh the page.");
            });
    }, []);

    // File Validation
    const validateFile = (file) => {
        if (!file) return false;
        if (!file.type.startsWith("image/")) {
            setScanError("Invalid file type. Please upload a valid image file.");
            return false;
        }
        const MAX_SIZE_MB = 10;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            setScanError(`File is too large. Please upload an image smaller than ${MAX_SIZE_MB}MB.`);
            return false;
        }
        return true;
    };

    // Handle paste events for images
    useEffect(() => {
        const handlePaste = (e) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const file = items[i].getAsFile();
                    if (validateFile(file)) {
                        setPreview(URL.createObjectURL(file));
                        setSelectedFile(file);
                        setResult(null);
                        setScanError(null);
                        setSaveSuccess(false);
                    }
                    break;
                }
            }
        };

        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    // Drag and Drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
            setResult(null);
            setScanError(null);
            setSaveSuccess(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (validateFile(file)) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
            setResult(null);
            setScanError(null);
            setSaveSuccess(false);
        }
    };

    const handleScan = async () => {
        if (!imgRef.current) return;

        setIsScanning(true);
        setScanError(null);
        setResult(null);
        setSaveSuccess(false);

        try {
            const prediction = await predict(imgRef.current);
            setResult(prediction);

            // Automatically save to history if user is logged in
            if (user && selectedFile) {
                setIsSaving(true);
                try {
                    await historyService.saveScan(user.uid, selectedFile, prediction);
                    setSaveSuccess(true);
                } catch (saveErr) {
                    console.error("Failed to save scan to history:", saveErr);
                    if (saveErr.message === "PERMISSION_DENIED") {
                        setScanError("Save failed: Firebase Security Rules block access. Please update rules in Firebase Console.");
                    }
                } finally {
                    setIsSaving(false);
                }
            }
        } catch (err) {
            console.error("Scan failed:", err);
            setScanError("Analysis failed. Please try again with a different image.");
        } finally {
            setIsScanning(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const resetScanner = () => {
        setPreview(null);
        setSelectedFile(null);
        setResult(null);
        setScanError(null);
        setSaveSuccess(false);
        stopCamera();
    };

    // Camera functions
    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
    }, [stream]);

    const startCamera = async (mode = facingMode) => {
        setCameraError(null);
        try {
            if (stream) {
                stopCamera();
            }
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode }
            });
            setStream(newStream);
            setIsCameraActive(true);
            setFacingMode(mode);
            setPreview(null);
            setResult(null);
            setScanError(null);
        } catch (err) {
            console.error("Camera access denied or error:", err);
            setCameraError("Unable to access camera. Please check permissions.");
            setIsCameraActive(false);
        }
    };

    const switchCamera = () => {
        const newMode = facingMode === "environment" ? "user" : "environment";
        startCamera(newMode);
    };

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        const video = videoRef.current;
        
        // Prevent taking a photo if the video metadata hasn't loaded (video width is 0)
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.warn("Video not ready for capture yet.");
            return;
        }

        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
                if (validateFile(file)) {
                    setPreview(URL.createObjectURL(file));
                    setSelectedFile(file);
                    setResult(null);
                    setScanError(null);
                    setSaveSuccess(false);
                    stopCamera(); // Stop camera after taking photo
                }
            }
        }, "image/jpeg", 0.9);
    };

    // Cleanup camera on unmount
    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [stream]);

    return {
        fileInputRef,
        imgRef,
        videoRef,
        canvasRef,
        preview,
        isDragging,
        modelReady,
        modelError,
        isScanning,
        result,
        scanError,
        isSaving,
        saveSuccess,
        isCameraActive,
        facingMode,
        cameraError,
        stream,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileChange,
        handleScan,
        triggerFileInput,
        resetScanner,
        startCamera,
        stopCamera,
        switchCamera,
        takePhoto
    };
}
