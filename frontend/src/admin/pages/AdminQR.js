import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useAuth } from "../../context/AuthContext";

function AdminQR() {
  const [customUrl, setCustomUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const { admin } = useAuth();
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleGenerateQR = () => {
    if (!customUrl) {
      alert("Lütfen bir URL girin");
      return;
    }

    // QR kod için URL oluştur
    const qrUrl = customUrl.startsWith("http")
      ? customUrl
      : `${window.location.origin}${
          customUrl.startsWith("/") ? "" : "/"
        }${customUrl}`;

    setQrValue(qrUrl);
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `menu-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">QR Kod Oluştur</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yönlendirilecek URL
          </label>
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Örn: /category, https://example.com/menu"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-gray-600 mb-4">
          Tam URL veya site içi yol girebilirsiniz. Site içi yol için başına /
          koyun.
        </p>
        <button
          onClick={handleGenerateQR}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          QR Kod Oluştur
        </button>
      </div>

      {qrValue && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <QRCodeCanvas
                id="qr-code"
                value={qrValue}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4 break-all text-center">
              {qrValue}
            </p>
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              QR Kodu İndir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQR;
