# Component Documentation

## RoutineBuilder Component Architecture

### Overview
The RoutineBuilder implements a modular workout routine builder with:
- Real-time timer preview with dynamic color feedback
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
│       │   ├── TimeRemaining (with color states)
│       │   │   ├── Default state
│       │   │   ├── Warning state (≤20s)
│       │   │   └── Final countdown state (≤3s)
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
    ├── timerStatus
    └── timeColorState
```

### Timer Color States
The timer implements dynamic color feedback based on remaining time:
- Default: Normal state (>20s remaining)
- Warning: Red text (≤20s remaining)
- Final: White text (≤3s remaining)

### Data Flow
1. User Actions → Component Events
2. Component Events → Parent Handlers
3. Parent Updates State
4. State Changes → UI Updates
5. Side Effects (save/timer) Execute

### Key Features
- Multi-select operations (Spotify-style)
- Drag-and-drop reordering
- Real-time timer preview with visual feedback
- Exercise library integration
- Manual exercise entry
- Resistance training toggles
- Exercise orientation tracking
- Dynamic timer color states

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
- Color contrast considerations for timer states

### Future Extensions
- Exercise templates
- Custom timers
- Analytics
- Offline mode
- Multi-device sync
