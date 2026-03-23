// src/FreshVision.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  UploadCloud,
  Camera,
  CheckCircle,
  Loader2,
  X,
  Sparkles,
  Zap,
  Brain,
  ArrowLeft,
  Trash2,
  ImageIcon,
  Download,
  Lightbulb,
  Target,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function FreshVision() {
  const [model, setModel] = useState(null);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // ----- GEMINI FUNCTION -----
  const fetchFruitUseCases = async (className, score) => {
    try {
      const ai = new GoogleGenAI({
        apiKey: "AIzaSyDgjUN6ZEUuMvnBReDzusbwseBcDE0I9m0",
      });

      const ripenessLabel =
        score <= 100 ? "unripe" : score <= 200 ? "ripe" : "overripe";

      const prompt = `
      I have a fruit detected as: ${className}.
      Ripeness score: ${score} (${ripenessLabel}).

      Return the response STRICTLY in the following JSON format:

      [
        { "title": "short heading", "description": "short helpful explanation" },
        { "title": "short heading", "description": "short helpful explanation" },
        { "title": "short heading", "description": "short helpful explanation" },
        { "title": "short heading", "description": "short helpful explanation" },
        { "title": "short heading", "description": "short helpful explanation" }
      ]

      Rules:
      - EXACTLY 5 items
      - ONLY return JSON (no notes, no markdown)
      - Each title must be short
      - Each description must be 1–2 lines, practical, and based on ripeness
    `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (e) {
      console.error("Gemini Error:", e);
      return [];
    }
  };

  // ----- Load TF & TeachableMachine -----
  useEffect(() => {
    let tfScript = null;
    let tmScript = null;

    const ensureScripts = async () => {
      try {
        if (!window.tf) {
          tfScript = document.createElement("script");
          tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest";
          tfScript.async = true;
          document.body.appendChild(tfScript);
          await new Promise((res, rej) => {
            tfScript.onload = res;
            tfScript.onerror = () => rej(new Error("Failed to load tfjs"));
          });
        }

        if (!window.tmImage) {
          tmScript = document.createElement("script");
          tmScript.src =
            "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest";
          tmScript.async = true;
          document.body.appendChild(tmScript);
          await new Promise((res, rej) => {
            tmScript.onload = res;
            tmScript.onerror = () =>
              rej(new Error("Failed to load teachablemachine lib"));
          });
        }

        await loadModel();
      } catch (err) {
        console.error(err);
        setError(
          "Failed to load ML libraries. Please check network and refresh the page.",
        );
        setIsLoadingModel(false);
      }
    };

    const loadModel = async () => {
      setIsLoadingModel(true);
      setError(null);
      const modelURL = "./my_model/model.json";
      const metadataURL = "./my_model/metadata.json";

      try {
        if (!window.tmImage) throw new Error("tmImage not available");
        const loaded = await window.tmImage.load(modelURL, metadataURL);
        setModel(loaded);
      } catch (err) {
        console.error("Model load error:", err);
        setError(
          "Failed to load model. Ensure 'my_model' folder is present and accessible.",
        );
      } finally {
        setIsLoadingModel(false);
      }
    };

    ensureScripts();

    return () => {
      if (tfScript && document.body.contains(tfScript)) {
        document.body.removeChild(tfScript);
      }
      if (tmScript && document.body.contains(tmScript)) {
        document.body.removeChild(tmScript);
      }
    };
  }, []);

  // ----- Drag and drop -----
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files?.[0]) handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    processImageFile(file);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files?.[0]) return;
    handleFiles(files);
  };

  // ----- Prediction & scoring -----
  const processImageFile = async (file) => {
    setIsPredicting(true);
    setPrediction(null);
    setError(null);

    const newImageURL = URL.createObjectURL(file);
    setImageURL(newImageURL);

    const img = new Image();
    img.src = newImageURL;
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      try {
        if (!model) throw new Error("Model not loaded");
        const preds = await model.predict(img);

        if (!preds || preds.length === 0)
          throw new Error("No predictions returned");

        const top = preds.reduce((a, b) =>
          a.probability > b.probability ? a : b,
        );
        const score = computeRipenessScore(top.className, top.probability);
        const geminiText = await fetchFruitUseCases(top.className, score);

        setPrediction({
          ...top,
          score,
          all: preds,
          uses: geminiText,
        });
      } catch (err) {
        console.error("Prediction error:", err);
        setError("Prediction failed. Try another image or refresh the page.");
      } finally {
        setIsPredicting(false);
      }
    };

    img.onerror = () => {
      setIsPredicting(false);
      setError("Unable to load the image. Try a different file.");
    };
  };

  const computeRipenessScore = (className, probability) => {
    const cls = className.toLowerCase().replace(/\s+/g, "");
    const p = Math.max(0, Math.min(1, probability || 0));

    if (
      cls.includes("unripe") ||
      cls.includes("unrip") ||
      cls.includes("green")
    ) {
      return Math.round(p * 100);
    }
    if (cls.includes("ripe")) {
      return Math.round(100 + p * 100);
    }
    return Math.round(200 + p * 100);
  };

  // ----- Camera functions -----
  const openCamera = async () => {
    setError(null);
    setIsCameraOpen(true);

    await new Promise((r) => setTimeout(r, 80));

    try {
      if (!videoRef.current) throw new Error("Camera element not ready");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 } },
        audio: false,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    } catch (err) {
      console.error("Camera error:", err);
      setError("Cannot access camera. Check permissions.");
      setIsCameraOpen(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError("Failed to capture image");
        return;
      }
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
      closeCamera();
      await processImageFile(file);
    }, "image/jpeg");
  };

  // ----- Cleanup -----
  useEffect(() => {
    const current = imageURL;
    return () => {
      if (current) URL.revokeObjectURL(current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [imageURL]);

  // ----- UI Helpers -----
  const formatClassName = (className) =>
    className
      .split(/[_\- ]+/)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

  const getZone = (score) => {
    if (score <= 100) return "Unripe";
    if (score <= 200) return "Ripe";
    return "Over Ripe";
  };

  const getZoneColor = (score) => {
    if (score <= 100) return "bg-emerald-500";
    if (score <= 200) return "bg-amber-500";
    return "bg-orange-500";
  };

  const getZoneGradient = (score) => {
    if (score <= 100) return "from-emerald-400 to-emerald-600";
    if (score <= 200) return "from-amber-400 to-amber-600";
    return "from-orange-400 to-orange-600";
  };

  const resetAll = () => {
    setImageURL(null);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-800">
                  FreshVision
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center text-sm text-slate-600 px-3 py-2 rounded-lg bg-white shadow">
                <Zap className="w-4 h-4 mr-2 text-amber-500" />
                <span>TensorFlow.js</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Fruit Ripeness Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Upload or capture a photo of your fruit to get instant AI-powered
            ripeness analysis
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white p-2 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Upload & Preview */}
            <div className="space-y-6">
              {/* Upload Zone */}
              {!imageURL && !isPredicting && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    dragActive
                      ? "border-emerald-400 bg-emerald-50 scale-105"
                      : "border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isLoadingModel}
                  />

                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-lime-500 rounded-2xl shadow-lg">
                      <UploadCloud className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        Drop your fruit image here
                      </h3>
                      <p className="text-slate-600">or click to browse files</p>
                    </div>
                    <div className="flex justify-center space-x-3 pt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        disabled={isLoadingModel}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-lg"
                      >
                        Choose File
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCamera();
                        }}
                        disabled={isLoadingModel}
                        className="px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 disabled:border-slate-300 disabled:text-slate-500 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center shadow-lg"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Camera
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {imageURL && (
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-lg bg-white">
                  <img
                    src={imageURL}
                    alt="Upload Preview"
                    className="w-full h-64 object-contain"
                  />
                </div>
              )}

              {/* Controls */}
              {imageURL && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors flex items-center"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Replace
                    </button>
                    <button
                      onClick={resetAll}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl font-medium transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </button>
                  </div>

                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                      isLoadingModel
                        ? "bg-amber-500/20 text-amber-700"
                        : "bg-emerald-500/20 text-emerald-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isLoadingModel
                          ? "bg-amber-500 animate-pulse"
                          : "bg-emerald-500"
                      }`}
                    ></div>
                    <span className="text-sm font-medium">
                      {isLoadingModel ? "Loading Model..." : "Model Ready"}
                    </span>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-700 backdrop-blur-sm">
                  <div className="flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    {error}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Results Card */}
              <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                {isPredicting ? (
                  <div className="text-center py-12">
                    <div className="relative inline-block mb-4">
                      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                      <Sparkles className="w-6 h-6 text-amber-500 absolute -top-1 -right-1 animate-ping" />
                    </div>
                    <p className="text-xl font-semibold text-slate-800 mb-2">
                      Analyzing Fruit
                    </p>
                    <p className="text-slate-600">
                      Detecting ripeness level...
                    </p>
                    <div className="mt-4 w-24 h-1 bg-emerald-500/30 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : prediction ? (
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${getZoneGradient(
                          prediction.score,
                        )} rounded-3xl mb-4 shadow-lg`}
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>

                      <p className="text-sm font-medium text-slate-600 uppercase tracking-wider mb-2">
                        Analysis Result
                      </p>

                      <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        {formatClassName(prediction.className)}
                      </h2>

                      <p className="text-slate-600 mb-4">
                        Confidence: {(prediction.probability * 100).toFixed(1)}%
                      </p>
                    </div>

                    {/* Ripeness Score */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">
                          Ripeness Score
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getZoneColor(
                            prediction.score,
                          )} text-white`}
                        >
                          {getZone(prediction.score)}
                        </span>
                      </div>

                      <div className="text-center mb-4">
                        <p className="text-4xl font-bold text-slate-800">
                          {prediction.score}
                          <span className="text-lg text-slate-500 ml-2">
                            / 300
                          </span>
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>Unripe</span>
                          <span>Perfect</span>
                          <span>Overripe</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${getZoneGradient(
                              prediction.score,
                            )} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: `${(prediction.score / 300) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>0</span>
                          <span>100</span>
                          <span>200</span>
                          <span>300</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={resetAll}
                        className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 rounded-xl font-medium transition-all duration-300"
                      >
                        Analyze Another
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob(
                            [JSON.stringify(prediction, null, 2)],
                            { type: "application/json" },
                          );
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "freshvision-analysis.json";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-slate-400 mb-6">
                      <Sparkles className="w-16 h-16 mx-auto opacity-50" />
                    </div>
                    <p className="text-slate-600 text-lg font-medium">
                      {isLoadingModel
                        ? "Initializing AI Engine..."
                        : "Ready for Analysis"}
                    </p>
                    {!isLoadingModel && (
                      <p className="text-slate-500 mt-2">
                        Upload an image or use camera to begin
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Gemini Recommendations */}
          {prediction?.uses?.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">
                  Smart Recommendations
                </h3>
              </div>

              <div className="space-y-3">
                {prediction.uses.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-emerald-100 shadow-sm"
                  >
                    <h4 className="font-semibold text-emerald-700 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md border border-slate-200 shadow-2xl">
            <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-200">
              <h3 className="font-semibold text-slate-800 text-lg flex items-center">
                <Camera className="w-5 h-5 mr-2 text-emerald-600" />
                Capture Fruit Image
              </h3>
              <button
                onClick={closeCamera}
                className="text-slate-600 hover:text-slate-800 transition-colors p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-2xl overflow-hidden border-2 border-emerald-200 bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-80 object-cover"
                />
              </div>

              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={closeCamera}
                  className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={captureImage}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 flex items-center shadow-lg"
                >
                  <Camera className="mr-2" size={20} />
                  Capture Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
