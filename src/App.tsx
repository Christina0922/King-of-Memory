import { useState } from 'react';
import { GameMode } from './types/game';
import { ModeSelection } from './components/ModeSelection';
import { GameScreen } from './components/GameScreen';
import { RankingScreen } from './components/RankingScreen';
import { RecordsScreen } from './components/RecordsScreen';
import './App.css';

type Screen = 'mode-selection' | 'game' | 'ranking' | 'records';

function App() {
  const [screen, setScreen] = useState<Screen>('mode-selection');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setScreen('game');
  };

  const handleBackToMenu = () => {
    setScreen('mode-selection');
    setSelectedMode(null);
  };

  const handleShowRanking = () => {
    setScreen('ranking');
  };

  const handleShowRecords = () => {
    setScreen('records');
  };

  return (
    <div className="app">
      {screen === 'mode-selection' && (
        <ModeSelection
          onSelectMode={handleSelectMode}
          onShowRanking={handleShowRanking}
          onShowRecords={handleShowRecords}
        />
      )}
      {screen === 'game' && selectedMode && (
        <GameScreen mode={selectedMode} onBack={handleBackToMenu} />
      )}
      {screen === 'ranking' && <RankingScreen onBack={handleBackToMenu} />}
      {screen === 'records' && <RecordsScreen onBack={handleBackToMenu} />}
    </div>
  );
}

export default App;

