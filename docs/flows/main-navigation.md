# Mosaic Navigation Flows

## Main App Navigation
```mermaid
flowchart TD
    Home[Home Screen] --> CreateRoutine[Create Routine]
    Home --> SavedRoutines[Saved Routines]
    Home --> Templates[Templates Library]
    Home --> ExerciseLib[Exercise Library]
    
    CreateRoutine --> ChooseType{Choose Type}
    ChooseType -->|Template| SelectTemplate[Select Template]
    ChooseType -->|Custom| RoutineSetup[Routine Setup]
```
