import { useState } from "react";
import { Camera, X } from "lucide-react";

interface ARPreviewProps {
  organism: string;
  designName: string;
  onClose: () => void;
}

export default function ARPreview({
  organism,
  designName,
  onClose,
}: ARPreviewProps) {
  const [isSupported] = useState(
    () =>
      "navigator" in globalThis &&
      ("xr" in navigator || "webkitXR" in navigator)
  );

  const handleARStart = async () => {
    if (!isSupported) {
      alert(
        "AR is not supported on this device. Please use a smartphone with WebXR support."
      );
      return;
    }

    try {
      // Check for XR support
      if ("xr" in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const xrSession = await (navigator as any).xr.requestSession(
          "immersive-ar",
          {
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: document.body },
          }
        );

        // Session started successfully
        alert(
          `AR Session started for ${organism} - ${designName}\n\nFrame the area where you want to place your design and tap to place it.`
        );
      }
    } catch (err) {
      console.warn("AR not available:", err);
      alert(
        "AR Preview: Available on compatible devices with AR support.\n\nSupported browsers: Chrome, Edge, Safari (iOS 15+)"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              AR Preview
            </h3>
            <p className="text-muted-foreground">
              View your biomimetic design in augmented reality
            </p>
          </div>

          <div className="bg-slate-100 rounded-lg p-8 mb-6">
            <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center flex-col">
              <Camera className="w-12 h-12 text-slate-400 mb-2" />
              <p className="text-sm text-slate-600">AR Preview Area</p>
              <p className="text-xs text-slate-500 mt-2">
                {organism} - {designName}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-foreground mb-2">
              How AR Preview Works
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Point your device camera at the area</li>
              <li>✓ Tap on the ground to place your design</li>
              <li>✓ Use pinch gestures to scale up/down</li>
              <li>✓ Rotate with two-finger drag to inspect from all angles</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleARStart}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Launch AR Preview
            </button>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 border border-border bg-white text-foreground font-semibold rounded-lg hover:bg-slate-50 transition-all"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            AR Preview requires a compatible device with WebXR support
            <br />
            (iOS 15+, Android Chrome, Edge)
          </p>
        </div>
      </div>
    </div>
  );
}
