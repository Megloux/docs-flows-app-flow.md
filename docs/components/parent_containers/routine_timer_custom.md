 Component Documentation

## RoutineBuilder Component Architecture

### Overview
The RoutineBuilder implements a modular workout routine builder with:
- Real-time timer preview
- Multi-select operations (Spotify-style)
- Drag-and-drop exercise reordering
- Resistance training toggles
- Exercise orientation tracking

```
RoutineBuilder (Container)
├── Header
│   ├── BackButton (navigation)
│   ├── CustomRoutineNameInput
│   └── SaveButton
│
├── Metadata
│   ├── Stats (saves, duration)
│   └── ActionBar
│       ├── FavoriteButton
│       └── ShareButton
│
├── Timer Section
│   └── CustomRoutineTimer
│       ├── TimerDisplay
│       │   ├── CurrentExercise
│       │   ├── ResistanceIndicator
│       │   ├── TimeRemaining
│       │   └── NextExercise
│       └── TimerControls
│           ├── Start/Pause
│           ├── Reset
│           └── Skip
│
├── Exercise Management
│   ├── CustomRoutineExerciseInput
│   │   ├── ExerciseLibrary
│   │   └── ManualEntry
│   │
│   └── CustomRoutineExerciseList
│       └── CustomRoutineExerciseItem
│           ├── SelectionBubble
│           ├── Title
│           ├── ResistanceIndicator
│           └── TimeInput
│
└── BottomActions (Multi-select Operations)
    ├── Cut
    ├── Copy
    └── Paste
```

### State Management
```
Core States:
├── Exercise State
│   ├── selectedExercises[]
│   ├── exerciseOrder[]
│   └── exerciseMetadata{}
│
├── UI State
│   ├── isEditing
│   ├── selectedIndices[]
│   └── clipboard[]
│
└── Timer State
    ├── currentExercise
    ├── timeRemaining
    └── timerStatus
```

### Data Flow
1. User Actions → Component Events
2. Component Events → Parent Handlers
3. Parent Updates State
4. State Changes → UI Updates
5. Side Effects (save/timer) Execute

### Key Features
- Multi-select operations (Spotify-style)
- Drag-and-drop reordering
- Real-time timer preview
- Exercise library integration
- Manual exercise entry
- Resistance training toggles
- Exercise orientation tracking

### Component Communication
Parent → Child:
- Props passing
- Callback functions
- Context providers

Child → Parent:
- Event handlers
- State updates
- Ref forwarding

### Error Handling
- Input validation
- Timer edge cases
- Drag-drop errors
- Network failures
- State conflicts

### Performance
- Exercise list virtualization
- Memoized components
- Optimized re-renders
- Debounced inputs

### Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

### Future Extensions
- Exercise templates
- Custom timers
- Analytics
- Offline mode
- Multi-device sync

not sure where to put this but i love it!!

// Inside CustomRoutineTimer.tsx

const getTimeColor = (seconds: number): string => {
  if (seconds <= 3) return 'text-white';
  if (seconds <= 20) return 'text-red-500';
  return '';
};

// This function is used in the TimerDisplay component like:
<p className={`font-display tracking-[0.3em] text-4xl ${getTimeColor(timeRemaining)}`}>
  {formatTime(timeRemaining)}
</p>
