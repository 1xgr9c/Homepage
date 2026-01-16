
import React, { useState, useEffect, useRef } from 'react';
import { LinkItem } from './types';
import { INITIAL_NEWS, INITIAL_TOOLS, INITIAL_RADIO } from './constants';
import { GridItem } from './components/GridItem';
import { StationModal } from './components/StationModal';

const App: React.FC = () => {
  const [radioStations, setRadioStations] = useState<LinkItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkItem | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Audio state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load persisted radio stations or use defaults
    const saved = localStorage.getItem('homepage_radio_v3');
    if (saved) {
      setRadioStations(JSON.parse(saved));
    } else {
      setRadioStations(INITIAL_RADIO);
    }

    // Initialize audio element
    const audio = new Audio();
    audio.volume = 0.8;
    audioRef.current = audio;

    const handleAudioError = () => {
      console.error("Audio playback failed or was interrupted.");
      setPlayingId(null);
    };

    audio.addEventListener('error', handleAudioError);

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => {
      clearInterval(timer);
      audio.removeEventListener('error', handleAudioError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const saveRadio = (newStations: LinkItem[]) => {
    setRadioStations(newStations);
    localStorage.setItem('homepage_radio_v3', JSON.stringify(newStations));
  };

  const togglePlay = (item: LinkItem) => {
    if (!audioRef.current || !item.streamUrl) return;

    if (playingId === item.id) {
      audioRef.current.pause();
      audioRef.current.src = ''; // Clear source to stop buffering
      setPlayingId(null);
    } else {
      // Set playing ID immediately for UI feedback
      setPlayingId(item.id);
      
      // Update source and play
      audioRef.current.src = item.streamUrl;
      audioRef.current.load();
      audioRef.current.play().catch(e => {
        console.error("Playback error:", e);
        setPlayingId(null);
      });
    }
  };

  const handleConfirm = (item: LinkItem) => {
    if (editingItem) {
      const updated = radioStations.map(s => s.id === item.id ? item : s);
      saveRadio(updated);
      
      // If the currently playing station was edited, restart audio if source changed
      if (playingId === item.id && item.streamUrl !== editingItem.streamUrl) {
        audioRef.current?.pause();
        audioRef.current!.src = item.streamUrl || '';
        audioRef.current!.load();
        audioRef.current!.play().catch(() => setPlayingId(null));
      }
    } else {
      saveRadio([...radioStations, item]);
    }
    setEditingItem(null);
  };

  const removeStation = (id: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    }
    saveRadio(radioStations.filter(s => s.id !== id));
  };

  const startEditing = (item: LinkItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between md:justify-center px-4 py-8 md:py-4 overflow-hidden bg-[#fafafa] selection:bg-black selection:text-white">
      {/* Header / Clock */}
      <header className="mb-4 md:mb-8 flex flex-col items-center animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-5xl md:text-5xl font-light tracking-tighter text-black">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-900 font-bold mt-1">
          {currentTime.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-10 md:space-y-10 flex-grow flex flex-col justify-center">
        {/* News Section */}
        <section className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black mb-4 text-center">News</h2>
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            {INITIAL_NEWS.map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black mb-4 text-center">Tools</h2>
          <div className="flex justify-center gap-6 md:gap-12">
            {INITIAL_TOOLS.map(item => (
              <div key={item.id} className="w-20 md:w-24">
                <GridItem item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* Radio Section */}
        <section className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <h2 className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-black mb-4 text-center">Radio stations</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {radioStations.map(item => (
              <div key={item.id} className="w-16 md:w-24">
                <GridItem 
                  item={item} 
                  onRemove={removeStation} 
                  onEdit={startEditing}
                  isEditable={true} 
                  isPlaying={playingId === item.id}
                  onTogglePlay={togglePlay}
                />
              </div>
            ))}
            
            {/* Add Button */}
            <button
              onClick={openAddModal}
              className="flex flex-col items-center gap-2 transition-all group w-16 md:w-24"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 border border-dashed border-gray-300 rounded-xl flex items-center justify-center group-hover:border-black group-hover:bg-white transition-all hover:shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-300 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                Add
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 md:mt-auto py-4 text-gray-400 text-[8px] uppercase tracking-[0.6em] font-medium opacity-40">
        System Operational
      </footer>

      <StationModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default App;
