import { useState } from "react";
import { ArrowLeft, Users, MapPin, Building2, PhoneOff } from "lucide-react";

const FakeCallScreen = ({ setCurrentScreen }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const playAudio = (url) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.play();

    // when audio ends, remove Stop button automatically
    audio.addEventListener("ended", () => {
      setCurrentAudio(null);
    });

    setCurrentAudio(audio);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => {
              stopAudio();
              setCurrentScreen("main");
            }}
            className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-pink-600" />
          </button>
          <h2 className="text-2xl font-bold text-pink-800">Fake Call Options</h2>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          {/* Button 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
              onClick={() =>
                playAudio(
                  "https://docs.google.com/uc?export=download&id=13huYz0hWI573xM7YU2G0szNy2F1VOgi5"
                )
              }
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-lg">Be Safe in a Cab</span>
              </div>
              <p className="text-sm opacity-90">
                Simulates a call to make you appear occupied
              </p>
            </button>
          </div>

          {/* Button 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
              onClick={() =>
                playAudio(
                  "https://docs.google.com/uc?export=download&id=1HsmODCTyMQd61-uiQndlmXaF6fqTfV2m"
                )
              }
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 mr-2" />
                <span className="text-lg">Be Safe in a Dark Lane</span>
              </div>
              <p className="text-sm opacity-90">
                Loud conversation to deter potential threats
              </p>
            </button>
          </div>

          {/* Button 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
              onClick={() =>
                playAudio(
                  "https://docs.google.com/uc?export=download&id=12mW9CLjm_ul8jsfA4Pr9aMgkrS4gzvyB"
                )
              }
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center mb-2">
                <Building2 className="w-6 h-6 mr-2" />
                <span className="text-lg">Escape a Public Place</span>
              </div>
              <p className="text-sm opacity-90">
                Creates urgent call scenario for quick exit
              </p>
            </button>
          </div>

          {/* Stop Button */}
          {currentAudio && (
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <button
                onClick={stopAudio}
                className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
              >
                <PhoneOff className="w-6 h-6 mr-2" />
                <span className="text-lg">Stop Call</span>
              </button>
            </div>
          )}

          {/* Info Note */}
          <div className="bg-white rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-600 text-center">
              💡 These fake calls will play pre-recorded conversations to help
              you feel safer in various situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeCallScreen;

