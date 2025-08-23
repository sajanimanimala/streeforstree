import React, { useState } from 'react';
import { Phone, MapPin, Shield, MessageSquare, ArrowLeft } from 'lucide-react';

interface FakeCallData {
  id: string;
  title: string;
  description: string;
  audio?: string;
  audioInstance?: HTMLAudioElement; // added for tracking playback
}

const fakeCallOptions: FakeCallData[] = [
  {
    id: 'cab',
    title: 'Be Safe in a Cab',
    description: 'Fake call to make cab driver aware someone is tracking your journey',
    audio: '/cab.mp3'
  },
  {
    id: 'lane',
    title: 'Be Safe in a Dark Lane',
    description: 'Fake call to deter potential threats in isolated areas',
    audio: '/street_Ai.mp3'
  },
  {
    id: 'public',
    title: 'Escape a Public Place',
    description: 'Fake emergency call to help you leave uncomfortable situations',
    audio: '/party.mp3'
  }
];

const selfDefenseMoves = [
  {
    id: 'knee',
    name: 'Knee to Groin',
    description: 'Drive your knee upward forcefully into the attacker\'s groin area',
    image: '/WhatsApp Image 2025-08-22 at 9.10.48 AM.jpeg'
  },
  {
    id: 'palm',
    name: 'Palm Strike to Nose',
    description: 'Use the heel of your palm to strike upward at the attacker\'s nose',
    image: '/WhatsApp Image 2025-08-22 at 9.10.25 AM.jpeg'
  },
  {
    id: 'stomp',
    name: 'Foot Stomp',
    description: 'Stomp down hard on the attacker\'s foot, especially effective with heels',
    image: '/143019dd-6691-4bd2-a41c-06e0e4fdf0ad (1).png'
  }
];

const stories = [
  {
    id: 1,
    name: 'Renu Chaudhary',
    location: 'Delhi, 2017',
    story: 'A 19-year-old Delhi college student was being harassed by two men on a deserted road at night. Instead of panicking, she used her karate training to fight them off, injuring one before rushing to the police station. She later said: "I knew if I gave up, they would win."'
  },
  {
    id: 2,
    name: 'Eliza Dushku',
    location: 'Hollywood Actress',
    story: 'Eliza was molested at age 12 by a stunt coordinator. Years later, she publicly shared her story despite industry pressure. Her courage encouraged other Hollywood women to speak out, adding momentum to the global #MeToo movement.'
  },
  {
    id: 3,
    name: 'Neha Tandon',
    location: 'India, 2016',
    story: 'In Odisha, a young woman, Neha, was harassed by a stalker on the road. She confronted him publicly, slapped him multiple times, and dragged him to the police station instead of ignoring it. Her courage inspired many women to report stalking and harassment.'
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'streeSpeaks' | 'fakeCall' | 'selfDefense'>('home');
  const [activeFakeCall, setActiveFakeCall] = useState<FakeCallData | null>(null);

  const handleSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `https://maps.google.com/?q=${latitude},${longitude}`;
          const message = `EMERGENCY! I need help. My current location is: ${location}`;
          const smsLink = `sms:9177831249?body=${encodeURIComponent(message)}`;
          window.open(smsLink);
        },
        () => {
          const message = "EMERGENCY! I need help. Unable to get location.";
          const smsLink = `sms:9177831249?body=${encodeURIComponent(message)}`;
          window.open(smsLink);
        }
      );
    } else {
      const message = "EMERGENCY! I need help. Location not available.";
      const smsLink = `sms:9177831249?body=${encodeURIComponent(message)}`;
      window.open(smsLink);
    }
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  const handleFindHelp = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = `hospitals+police+stations+shopping+malls`;
          const mapsUrl = `https://www.google.com/maps/search/${query}/@${latitude},${longitude},15z`;
          window.open(mapsUrl, '_blank');
        },
        () => {
          const mapsUrl = `https://www.google.com/maps/search/hospitals+police+stations+shopping+malls`;
          window.open(mapsUrl, '_blank');
        }
      );
    } else {
      const mapsUrl = `https://www.google.com/maps/search/hospitals+police+stations+shopping+malls`;
      window.open(mapsUrl, '_blank');
    }
  };

  const startFakeCall = (callData: FakeCallData) => {
    // create audio instance if audio available
    if (callData.audio) {
      const audio = new Audio(callData.audio);
      audio.loop = true; // loop ringing
      audio.play();
      callData.audioInstance = audio;
    }
    setActiveFakeCall(callData);
  };

  const renderNavBar = () => (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <button
        onClick={() => setCurrentScreen('home')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentScreen === 'home' 
            ? 'bg-pink-500 text-white' 
            : 'bg-white text-pink-600 hover:bg-pink-100'
        }`}
      >
        Home
      </button>
      <button
        onClick={() => setCurrentScreen('streeSpeaks')}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          currentScreen === 'streeSpeaks' 
            ? 'bg-pink-500 text-white' 
            : 'bg-white text-pink-600 hover:bg-pink-100'
        }`}
      >
        StreeSpeaks
      </button>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pt-20">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8 pt-16">
          <h1 className="text-4xl font-bold text-pink-800 mb-2">Stree for Stree</h1>
          <p className="text-pink-600 text-lg">Your Safety, Our Priority</p>
        </header>

        <div className="space-y-6">
          {/* SOS Button */}
          <button
            onClick={handleSOS}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
          >
            <MapPin size={32} />
            <span>SOS - SEND LOCATION</span>
          </button>

          {/* Emergency Calls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleCall('100')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-md flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105"
            >
              <Phone size={24} />
              <span>Police</span>
              <span className="text-sm">100</span>
            </button>
            <button
              onClick={() => handleCall('1098')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl shadow-md flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105"
            >
              <Phone size={24} />
              <span>Women's Helpline</span>
              <span className="text-sm">1098</span>
            </button>
          </div>

          {/* Main Features */}
          <div className="space-y-4">
            <button
              onClick={() => setCurrentScreen('fakeCall')}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <Phone size={24} />
              <span>Fake Call</span>
            </button>

            <button
              onClick={handleFindHelp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <MapPin size={24} />
              <span>Find Help Nearby</span>
            </button>

            <button
              onClick={() => setCurrentScreen('selfDefense')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl shadow-md flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <Shield size={24} />
              <span>Self Defense</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFakeCallScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pt-20">
      <div className="max-w-md mx-auto">
        <header className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-lg bg-pink-200 hover:bg-pink-300 transition-colors mr-4"
          >
            <ArrowLeft size={24} className="text-pink-700" />
          </button>
          <h1 className="text-2xl font-bold text-pink-800">Fake Call Options</h1>
        </header>

        <div className="space-y-4">
          {fakeCallOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-200"
            >
              <h3 className="text-xl font-semibold text-pink-800 mb-2">{option.title}</h3>
              <p className="text-pink-600 mb-4">{option.description}</p>
              <button
                onClick={() => startFakeCall(option)}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Start Fake Call
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSelfDefenseScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pt-20">
      <div className="max-w-md mx-auto">
        <header className="flex items-center mb-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 rounded-lg bg-pink-200 hover:bg-pink-300 transition-colors mr-4"
          >
            <ArrowLeft size={24} className="text-pink-700" />
          </button>
          <h1 className="text-2xl font-bold text-pink-800">Self Defense</h1>
        </header>

        <div className="space-y-6">
          {selfDefenseMoves.map((move) => (
            <div
              key={move.id}
              className="bg-white rounded-xl shadow-md border border-pink-200 overflow-hidden"
            >
              <img
                src={move.image}
                alt={move.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pink-800 mb-2">{move.name}</h3>
                <p className="text-pink-600">{move.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStreeSpeaksScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4 pt-20">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-pink-800 mb-2">StreeSpeaks</h1>
          <p className="text-pink-600">Stories of Courage & Strength</p>
        </header>

        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl p-6 shadow-md border border-pink-200"
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{story.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-800">{story.name}</h3>
                  <p className="text-pink-500 text-sm">{story.location}</p>
                </div>
              </div>
              <p className="text-pink-700 leading-relaxed">{story.story}</p>
            </div>
          ))}
          
          <div className="bg-pink-100 rounded-xl p-6 border-2 border-dashed border-pink-300">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-pink-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-pink-800 mb-2">Share Your Story</h3>
              <p className="text-pink-600 mb-4">Your courage can inspire others. Share your story of strength and resilience.</p>
              <a
                href="mailto:ozhakhushi@gmail.com"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Email Your Story
              </a>
              <p className="text-xs text-pink-500 mt-2">ozhakhushi@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFakeCallActive = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="w-32 h-32 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Phone size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Incoming Call...</h2>
        <p className="text-lg">{activeFakeCall?.title}</p>
        <button
          onClick={() => {
            if (activeFakeCall?.audioInstance) {
              activeFakeCall.audioInstance.pause();
              activeFakeCall.audioInstance.currentTime = 0;
            }
            setActiveFakeCall(null);
            setCurrentScreen('home');
          }}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full"
        >
          End Call
        </button>
      </div>
    </div>
  );

  if (activeFakeCall) {
    return renderFakeCallActive();
  }

  return (
    <div className="relative">
      {renderNavBar()}
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'streeSpeaks' && renderStreeSpeaksScreen()}
      {currentScreen === 'fakeCall' && renderFakeCallScreen()}
      {currentScreen === 'selfDefense' && renderSelfDefenseScreen()}
    </div>
  );
}

export default App;
