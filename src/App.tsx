import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Shield, 
  PhoneCall, 
  Map, 
  ArrowLeft,
  AlertTriangle,
  Heart,
  Users,
  Building2
} from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('main');

  const sendSOSMessage = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;
          const message = `EMERGENCY! I need help. My current location is: ${locationUrl}`;
          
          // In a real app, this would integrate with SMS API
          // For demo purposes, we'll show an alert
          alert(`SOS Alert sent!\nMessage: ${message}\nTo: 9177831249`);
          
          // Alternative: Open SMS app (works on mobile)
          const smsUrl = `sms:9177831249?body=${encodeURIComponent(message)}`;
          window.open(smsUrl);
        },
        (error) => {
          alert('Unable to get location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const makeCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const findHelp = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = `hospitals+${latitude},${longitude}`;
         
          const mapsUrl = `https://maps.google.com/maps?q=${query}&radius=1000`;
          window.open(mapsUrl, '_blank');
        },
        (error) => {
          // Fallback to general search
          const mapsUrl = 'https://maps.google.com/maps?q=hospitals+police+stations+near+me';
          window.open(mapsUrl, '_blank');
        }
      );
    } else {
      const mapsUrl = 'https://maps.google.com/maps?q=hospitals+police+stations+near+me';
      window.open(mapsUrl, '_blank');
    }
  };

  const MainScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 mr-2" />
            <h1 className="text-3xl font-bold text-pink-800">Stree for Stree</h1>
          </div>
          <p className="text-pink-600">Your safety companion</p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* SOS Button */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <button
              onClick={sendSOSMessage}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                SOS EMERGENCY
              </div>
              <div className="text-sm mt-2 opacity-90">Send location to emergency contact</div>
            </button>
          </div>

          {/* Emergency Calls */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-pink-800 mb-4">Emergency Calls</h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => makeCall('100')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Police - 100
              </button>
              <button
                onClick={() => makeCall('1098')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Women's Helpline - 1098
              </button>
            </div>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setCurrentScreen('fake-call')}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Fake Call
            </button>

            <button
              onClick={findHelp}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md"
            >
              <Map className="w-5 h-5 mr-2" />
              Find Help
            </button>

            <button
              onClick={() => setCurrentScreen('self-defense')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-md"
            >
              <Shield className="w-5 h-5 mr-2" />
              Self Defense
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FakeCallScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-pink-600" />
          </button>
          <h2 className="text-2xl font-bold text-pink-800">Fake Call Options</h2>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
           onClick={() => {
    const audio = new Audio("/https://drive.google.com/file/d/13huYz0hWI573xM7YU2G0szNy2F1VOgi5/view?usp=sharing"); 
    audio.play();
  }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 mr-2" />
                <span className="text-lg">Be Safe in a Cab</span>
              </div>
              <p className="text-sm opacity-90">Simulates a call to make you appear occupied</p>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
                onClick={() => {
    const audio = new Audio("/https://drive.google.com/file/d/1HsmODCTyMQd61-uiQndlmXaF6fqTfV2m/view?usp=sharing"); 
    audio.play();
  }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 mr-2" />
                <span className="text-lg">Be Safe in a Dark Lane</span>
              </div>
              <p className="text-sm opacity-90">Loud conversation to deter potential threats</p>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4">
            <button
                onClick={() => {
    const audio = new Audio("/https://drive.google.com/file/d/12mW9CLjm_ul8jsfA4Pr9aMgkrS4gzvyB/view?usp=sharing"); 
    audio.play();
  }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-6 rounded-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-2">
                <Building2 className="w-6 h-6 mr-2" />
                <span className="text-lg">Escape a Public Place</span>
              </div>
              <p className="text-sm opacity-90">Creates urgent call scenario for quick exit</p>
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-600 text-center">
              💡 These fake calls will play pre-recorded conversations to help you feel safer in various situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SelfDefenseScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('main')}
            className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-pink-600" />
          </button>
          <h2 className="text-2xl font-bold text-pink-800">Self Defense Techniques</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Knee to Groin */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-red-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Knee to Groin</h3>
            </div>
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4">
              <img 
                src="/knee to groin.png" 
                alt="Knee to Groin self-defense technique" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-gray-700">
              Drive your knee upward with force into the attacker's groin area. This is one of the most effective self-defense moves for close-range situations.
            </p>
          </div>

          {/* Palm Strike to Nose */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-orange-600 font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Palm Strike to Nose</h3>
            </div>
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4">
              <img 
                src="/palm striking to nose.png" 
                alt="Palm Strike to Nose self-defense technique" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-gray-700">
              Use the heel of your palm to strike upward at the attacker's nose. Aim for the base of the nose with a sharp, forceful movement.
            </p>
          </div>

          {/* Foot Stomp */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Foot Stomp</h3>
            </div>
            <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4">
              <img 
                src="/143019dd-6691-4bd2-a41c-06e0e4fdf0ad.png" 
                alt="Foot Stomp self-defense technique" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <p className="text-gray-700">
              If the attacker is behind you or close, lift your foot and drive your heel down hard onto their foot, particularly targeting the instep.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Important:</strong> These techniques should only be used in genuine self-defense situations. Consider taking a self-defense class for proper training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'fake-call' && <FakeCallScreen />}
      {currentScreen === 'self-defense' && <SelfDefenseScreen />}
    </div>
  );
}

export default App;
