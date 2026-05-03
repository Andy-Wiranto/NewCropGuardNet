import Image from "next/image";
import { UploadCloud, FileImage, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageDropzone({
    preview,
    isDragging,
    modelReady,
    isScanning,
    imgRef,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    handleScan,
    triggerFileInput,
    hasResult
}) {
    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!preview ? (
                    <motion.div 
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ 
                            opacity: 1, 
                            scale: isDragging ? 1.02 : 1,
                            borderColor: isDragging ? "#22c55e" : "#d1d5db",
                            backgroundColor: isDragging ? "#f0fdf4" : "#ffffff"
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="border-4 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-400 focus-visible:ring-4 focus-visible:ring-green-500 focus-visible:outline-none"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={triggerFileInput}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload an image by dragging and dropping or clicking"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                triggerFileInput();
                            }
                        }}
                    >
                        <motion.div
                            animate={isDragging ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <UploadCloud className={`mb-4 ${isDragging ? "text-green-500" : "text-gray-400"}`} size={64} />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Upload or Paste Image</h3>
                        <p className="text-gray-500 mb-6 max-w-sm">
                            Drag and drop a clear photo of the plant leaf, click to browse, or paste an image from your clipboard.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:outline-none"
                        >
                            Select Image
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="preview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative group w-full flex justify-center">
                            <div className="relative w-full max-w-[400px] h-64 md:h-96">
                                <Image
                                    ref={imgRef}
                                    src={preview}
                                    alt="Uploaded plant leaf for analysis"
                                    fill
                                    className="rounded-xl shadow-lg object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl backdrop-blur-sm max-w-[400px] mx-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={triggerFileInput}
                                    className="bg-white text-gray-800 px-5 py-2.5 rounded-lg font-medium shadow-lg hover:bg-gray-50 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                                    aria-label="Change uploaded image"
                                >
                                    <FileImage size={18} />
                                    Change Image
                                </motion.button>
                            </div>
                        </div>
                        
                        {!hasResult && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={!isScanning && modelReady ? { scale: 1.02, y: -2 } : {}}
                                whileTap={!isScanning && modelReady ? { scale: 0.98 } : {}}
                                onClick={handleScan}
                                disabled={isScanning || !modelReady}
                                className={`mt-8 font-semibold px-10 py-4 rounded-xl shadow-md flex items-center gap-3 text-lg focus-visible:ring-4 focus-visible:ring-green-500 focus-visible:outline-none
                                    ${isScanning || !modelReady
                                        ? "bg-gray-300 cursor-not-allowed text-gray-500"
                                        : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                aria-live="polite"
                                aria-busy={isScanning || !modelReady}
                            >
                                {isScanning ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} aria-hidden="true" />
                                        <span>Analyzing Image...</span>
                                    </>
                                ) : !modelReady ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} aria-hidden="true" />
                                        <span>Model Loading...</span>
                                    </>
                                ) : (
                                    "Scan Plant Now"
                                )}
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                aria-hidden="true"
            />
        </div>
    );
}
